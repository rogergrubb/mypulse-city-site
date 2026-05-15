import { createBrowserClient, createServerClient, type CookieOptions } from '@supabase/ssr';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

/**
 * Env vars expected:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 *   SUPABASE_SERVICE_ROLE_KEY  (server-only; never expose to browser)
 */

function getUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set');
  return url;
}

function getAnonKey(): string {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!key) throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not set');
  return key;
}

function getServiceRoleKey(): string {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set');
  return key;
}

/**
 * Browser-side client. Use in Client Components.
 * Auth state is persisted in cookies and synced with the server.
 */
export function createSupabaseBrowserClient(): SupabaseClient {
  return createBrowserClient(getUrl(), getAnonKey());
}

/**
 * Server-side client for Server Components, Route Handlers, and Server Actions.
 * Reads/writes auth cookies via next/headers.
 *
 * Pass { useServiceRole: true } to bypass RLS — only do this in trusted server code
 * (e.g. inside verifyApiKey, where we look up keys across all users by hash).
 */
export async function createSupabaseServerClient(opts?: {
  useServiceRole?: boolean;
}): Promise<SupabaseClient> {
  if (opts?.useServiceRole) {
    return createClient(getUrl(), getServiceRoleKey(), {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  const cookieStore = await cookies();
  return createServerClient(getUrl(), getAnonKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: Array<{ name: string; value: string; options: CookieOptions }>) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Called from a Server Component — cookies are read-only there.
          // Middleware refreshes the session, so this is safe to swallow.
        }
      },
    },
  });
}
