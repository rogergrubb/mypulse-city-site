import { createHash, randomBytes } from 'crypto';
import { createSupabaseServerClient } from './supabase';

const BASE62 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const SUFFIX_LEN = 32;

export type ApiKeyType = 'live' | 'test';

export interface ApiKeyRow {
  id: string;
  user_id: string;
  name: string;
  key_type: ApiKeyType;
  key_prefix: string;
  key_hash: string;
  created_at: string;
  last_used_at: string | null;
  revoked_at: string | null;
}

export interface CreatedApiKey {
  id: string;
  name: string;
  key_type: ApiKeyType;
  key_prefix: string;
  raw_key: string; // shown ONCE on creation
  created_at: string;
}

/**
 * Generate a cryptographically-random base62 string of given length.
 * Uses rejection-free mapping via modulo with a slight bias correction by
 * generating more entropy than needed and discarding overflow bytes.
 */
function randomBase62(length: number): string {
  // Use 2x bytes and reject those that would introduce modulo bias.
  const out: string[] = [];
  while (out.length < length) {
    const buf = randomBytes(length * 2);
    for (let i = 0; i < buf.length && out.length < length; i++) {
      // 256 mod 62 = 8; reject bytes in [248,255] to avoid bias.
      const b = buf[i];
      if (b < 248) {
        out.push(BASE62[b % 62]);
      }
    }
  }
  return out.join('');
}

/**
 * Build a raw key like: pk_live_<32 base62 chars>
 */
export function generateRawKey(type: ApiKeyType): string {
  const prefix = type === 'live' ? 'pk_live_' : 'pk_test_';
  return prefix + randomBase62(SUFFIX_LEN);
}

/**
 * SHA-256 hash of the raw key, hex encoded. Storage format.
 */
export function hashKey(rawKey: string): string {
  return createHash('sha256').update(rawKey).digest('hex');
}

/**
 * The first 12 characters of the raw key — what's displayed to the user
 * after creation (e.g. "pk_live_A1B2"). Long enough to disambiguate, short
 * enough to be useless on its own.
 */
export function keyPrefixFromRaw(rawKey: string): string {
  return rawKey.slice(0, 12);
}

/**
 * Create a new API key for the given user. Returns the raw key ONCE.
 * The caller is responsible for showing it to the user and then forgetting it.
 */
export async function createApiKey(args: {
  userId: string;
  name: string;
  type: ApiKeyType;
}): Promise<CreatedApiKey> {
  const { userId, name, type } = args;
  if (!userId) throw new Error('userId required');
  if (!name || !name.trim()) throw new Error('name required');
  if (type !== 'live' && type !== 'test') throw new Error('invalid key_type');

  const rawKey = generateRawKey(type);
  const key_hash = hashKey(rawKey);
  const key_prefix = keyPrefixFromRaw(rawKey);

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('api_keys')
    .insert({
      user_id: userId,
      name: name.trim(),
      key_type: type,
      key_prefix,
      key_hash,
    })
    .select('id, name, key_type, key_prefix, created_at')
    .single();

  if (error || !data) {
    throw new Error(`Failed to create API key: ${error?.message ?? 'unknown'}`);
  }

  return {
    id: data.id,
    name: data.name,
    key_type: data.key_type,
    key_prefix: data.key_prefix,
    raw_key: rawKey,
    created_at: data.created_at,
  };
}

/**
 * Revoke a key by id. RLS ensures the caller can only revoke their own keys.
 */
export async function revokeApiKey(id: string): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from('api_keys')
    .update({ revoked_at: new Date().toISOString() })
    .eq('id', id)
    .is('revoked_at', null);
  if (error) throw new Error(`Failed to revoke API key: ${error.message}`);
}

/**
 * List all keys belonging to a user (active + revoked).
 * Returns only safe-to-display fields — never the hash.
 */
export async function listApiKeys(userId: string): Promise<
  Array<Omit<ApiKeyRow, 'key_hash'>>
> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('api_keys')
    .select('id, user_id, name, key_type, key_prefix, created_at, last_used_at, revoked_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to list API keys: ${error.message}`);
  return (data ?? []) as Array<Omit<ApiKeyRow, 'key_hash'>>;
}

/**
 * Verify a raw key against the database. Returns the matching row (minus the hash)
 * if the key is valid and not revoked. Touches last_used_at on success.
 *
 * Intended to be called from edge/server code that's authenticating an API request.
 */
export async function verifyApiKey(
  raw_key: string,
): Promise<Omit<ApiKeyRow, 'key_hash'> | null> {
  if (!raw_key || typeof raw_key !== 'string') return null;
  if (!raw_key.startsWith('pk_live_') && !raw_key.startsWith('pk_test_')) return null;

  const key_hash = hashKey(raw_key);
  const supabase = await createSupabaseServerClient({ useServiceRole: true });

  const { data, error } = await supabase
    .from('api_keys')
    .select('id, user_id, name, key_type, key_prefix, created_at, last_used_at, revoked_at')
    .eq('key_hash', key_hash)
    .is('revoked_at', null)
    .maybeSingle();

  if (error || !data) return null;

  // Best-effort last_used_at touch; don't block auth on failure.
  void supabase
    .from('api_keys')
    .update({ last_used_at: new Date().toISOString() })
    .eq('id', data.id);

  return data as Omit<ApiKeyRow, 'key_hash'>;
}
