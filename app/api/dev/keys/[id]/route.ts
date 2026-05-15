import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase';
import { revokeApiKey } from '@/lib/api-keys';

async function requireUser() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) return null;
  return data.user;
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await requireUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  try {
    // RLS scopes the update to keys owned by the authenticated user.
    await revokeApiKey(id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Failed to revoke key' },
      { status: 500 },
    );
  }
}
