import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase';
import { createApiKey, listApiKeys, type ApiKeyType } from '@/lib/api-keys';

async function requireUser() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) return null;
  return data.user;
}

export async function GET() {
  const user = await requireUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const keys = await listApiKeys(user.id);
    return NextResponse.json({ keys });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Failed to list keys' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const user = await requireUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body: { name?: string; type?: ApiKeyType };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const name = body.name?.trim();
  const type = body.type;

  if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  if (type !== 'live' && type !== 'test') {
    return NextResponse.json({ error: 'Type must be "live" or "test"' }, { status: 400 });
  }

  try {
    const key = await createApiKey({ userId: user.id, name, type });
    return NextResponse.json({ key }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Failed to create key' },
      { status: 500 },
    );
  }
}
