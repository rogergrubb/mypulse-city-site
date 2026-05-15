'use client';

import { useCallback, useEffect, useState } from 'react';
import NewKeyModal from './new-key';

type ApiKeyListItem = {
  id: string;
  name: string;
  key_type: 'live' | 'test';
  key_prefix: string;
  created_at: string;
  last_used_at: string | null;
  revoked_at: string | null;
};

export default function DevDashboardPage() {
  const [keys, setKeys] = useState<ApiKeyListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [copiedPrefix, setCopiedPrefix] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/dev/keys', { cache: 'no-store' });
      if (!res.ok) throw new Error(`Failed to load keys (${res.status})`);
      const json = await res.json();
      setKeys(json.keys ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load keys');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleRevoke = async (id: string) => {
    if (!confirm('Revoke this API key? Calls using it will start failing immediately.')) return;
    try {
      const res = await fetch(`/api/dev/keys/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`Failed to revoke (${res.status})`);
      await refresh();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Failed to revoke key');
    }
  };

  const handleCopyPrefix = async (prefix: string) => {
    try {
      await navigator.clipboard.writeText(prefix);
      setCopiedPrefix(prefix);
      setTimeout(() => setCopiedPrefix(null), 1500);
    } catch {
      // ignore
    }
  };

  const activeKeys = keys.filter((k) => !k.revoked_at);
  const revokedKeys = keys.filter((k) => k.revoked_at);

  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '2rem 1rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 600, margin: 0 }}>API Keys</h1>
          <p style={{ color: '#666', margin: '0.25rem 0 0' }}>
            Manage credentials for the mypulse.city API.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          style={{
            background: '#111',
            color: '#fff',
            border: 'none',
            padding: '0.6rem 1rem',
            borderRadius: 6,
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          + New API Key
        </button>
      </header>

      {loading && <p>Loading keys.</p>}
      {error && (
        <div style={{ background: '#fee', border: '1px solid #fbb', padding: '0.75rem', borderRadius: 6, marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {!loading && !error && activeKeys.length === 0 && revokedKeys.length === 0 && (
        <div style={{ border: '1px dashed #ccc', borderRadius: 8, padding: '2rem', textAlign: 'center', color: '#666' }}>
          No API keys yet. Create one to get started.
        </div>
      )}

      {activeKeys.length > 0 && (
        <section>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: '1.5rem' }}>Active</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '0.5rem' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
                <th style={{ padding: '0.5rem' }}>Name</th>
                <th style={{ padding: '0.5rem' }}>Type</th>
                <th style={{ padding: '0.5rem' }}>Prefix</th>
                <th style={{ padding: '0.5rem' }}>Created</th>
                <th style={{ padding: '0.5rem' }}>Last used</th>
                <th style={{ padding: '0.5rem' }}></th>
              </tr>
            </thead>
            <tbody>
              {activeKeys.map((k) => (
                <tr key={k.id} style={{ borderBottom: '1px solid #f3f3f3' }}>
                  <td style={{ padding: '0.5rem' }}>{k.name}</td>
                  <td style={{ padding: '0.5rem' }}>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        padding: '0.15rem 0.5rem',
                        borderRadius: 4,
                        background: k.key_type === 'live' ? '#fee2e2' : '#dbeafe',
                        color: k.key_type === 'live' ? '#991b1b' : '#1e40af',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                      }}
                    >
                      {k.key_type}
                    </span>
                  </td>
                  <td style={{ padding: '0.5rem', fontFamily: 'monospace' }}>
                    {k.key_prefix}
                    <span style={{ color: '#aaa' }}>...</span>
                  </td>
                  <td style={{ padding: '0.5rem', color: '#666' }}>
                    {new Date(k.created_at).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '0.5rem', color: '#666' }}>
                    {k.last_used_at ? new Date(k.last_used_at).toLocaleDateString() : 'Never'}
                  </td>
                  <td style={{ padding: '0.5rem', textAlign: 'right' }}>
                    <button
                      onClick={() => handleCopyPrefix(k.key_prefix)}
                      style={{
                        background: 'transparent',
                        border: '1px solid #ddd',
                        padding: '0.3rem 0.6rem',
                        borderRadius: 4,
                        cursor: 'pointer',
                        marginRight: '0.5rem',
                        fontSize: '0.85rem',
                      }}
                    >
                      {copiedPrefix === k.key_prefix ? 'Copied' : 'Copy'}
                    </button>
                    <button
                      onClick={() => handleRevoke(k.id)}
                      style={{
                        background: 'transparent',
                        border: '1px solid #fbb',
                        color: '#b91c1c',
                        padding: '0.3rem 0.6rem',
                        borderRadius: 4,
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                      }}
                    >
                      Revoke
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {revokedKeys.length > 0 && (
        <section>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: '2rem', color: '#888' }}>
            Revoked
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '0.5rem', color: '#888' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
                <th style={{ padding: '0.5rem' }}>Name</th>
                <th style={{ padding: '0.5rem' }}>Type</th>
                <th style={{ padding: '0.5rem' }}>Prefix</th>
                <th style={{ padding: '0.5rem' }}>Revoked</th>
              </tr>
            </thead>
            <tbody>
              {revokedKeys.map((k) => (
                <tr key={k.id} style={{ borderBottom: '1px solid #f3f3f3' }}>
                  <td style={{ padding: '0.5rem' }}>{k.name}</td>
                  <td style={{ padding: '0.5rem', textTransform: 'uppercase', fontSize: '0.75rem' }}>{k.key_type}</td>
                  <td style={{ padding: '0.5rem', fontFamily: 'monospace' }}>
                    {k.key_prefix}<span>...</span>
                  </td>
                  <td style={{ padding: '0.5rem' }}>
                    {k.revoked_at ? new Date(k.revoked_at).toLocaleDateString() : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {modalOpen && (
        <NewKeyModal
          onClose={() => setModalOpen(false)}
          onCreated={() => {
            setModalOpen(false);
            refresh();
          }}
        />
      )}
    </main>
  );
}
