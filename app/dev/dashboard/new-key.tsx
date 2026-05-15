'use client';

import { useState } from 'react';

type Props = {
  onClose: () => void;
  onCreated: () => void;
};

type CreatedKey = {
  id: string;
  name: string;
  key_type: 'live' | 'test';
  key_prefix: string;
  raw_key: string;
  created_at: string;
};

export default function NewKeyModal({ onClose, onCreated }: Props) {
  const [name, setName] = useState('');
  const [keyType, setKeyType] = useState<'live' | 'test'>('test');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<CreatedKey | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/dev/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), type: keyType }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `Failed to create key (${res.status})`);
      }
      const json = await res.json();
      setCreated(json.key as CreatedKey);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create key');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopy = async () => {
    if (!created) return;
    try {
      await navigator.clipboard.writeText(created.raw_key);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  const handleDone = () => {
    onCreated();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        // Only close on backdrop click when there's no created key to lose.
        if (e.target === e.currentTarget && !created) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        padding: '1rem',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 8,
          padding: '1.5rem',
          width: '100%',
          maxWidth: 520,
          boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
        }}
      >
        {!created ? (
          <form onSubmit={handleCreate}>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>Create API key</h2>
            <p style={{ color: '#666', marginTop: '0.25rem', fontSize: '0.9rem' }}>
              Name this key so you can recognize it later.
            </p>

            <label style={{ display: 'block', marginTop: '1rem', fontSize: '0.85rem', fontWeight: 500 }}>
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Production backend"
              autoFocus
              style={{
                width: '100%',
                padding: '0.55rem 0.7rem',
                borderRadius: 6,
                border: '1px solid #ddd',
                marginTop: '0.25rem',
                fontSize: '0.95rem',
                boxSizing: 'border-box',
              }}
            />

            <label style={{ display: 'block', marginTop: '1rem', fontSize: '0.85rem', fontWeight: 500 }}>
              Type
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
              {(['test', 'live'] as const).map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setKeyType(t)}
                  style={{
                    flex: 1,
                    padding: '0.6rem',
                    borderRadius: 6,
                    border: keyType === t ? '2px solid #111' : '1px solid #ddd',
                    background: keyType === t ? '#f5f5f5' : '#fff',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ fontWeight: 600, textTransform: 'uppercase', fontSize: '0.8rem' }}>{t}</div>
                  <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.15rem' }}>
                    {t === 'test'
                      ? 'For development. Sandboxed data.'
                      : 'For production. Real data, real bills.'}
                  </div>
                </button>
              ))}
            </div>

            {error && (
              <div
                style={{
                  background: '#fee',
                  border: '1px solid #fbb',
                  padding: '0.6rem',
                  borderRadius: 6,
                  marginTop: '1rem',
                  fontSize: '0.85rem',
                  color: '#991b1b',
                }}
              >
                {error}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.5rem' }}>
              <button
                type="button"
                onClick={onClose}
                disabled={submitting}
                style={{
                  background: 'transparent',
                  border: '1px solid #ddd',
                  padding: '0.55rem 1rem',
                  borderRadius: 6,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                style={{
                  background: '#111',
                  color: '#fff',
                  border: 'none',
                  padding: '0.55rem 1rem',
                  borderRadius: 6,
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  opacity: submitting ? 0.6 : 1,
                  fontWeight: 500,
                }}
              >
                {submitting ? 'Creating.' : 'Create key'}
              </button>
            </div>
          </form>
        ) : (
          <div>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>API key created</h2>

            <div
              style={{
                background: '#fffbeb',
                border: '1px solid #fde68a',
                color: '#92400e',
                padding: '0.75rem',
                borderRadius: 6,
                marginTop: '1rem',
                fontSize: '0.9rem',
              }}
            >
              <strong>Save this now — you won&apos;t see it again.</strong> This is the only time
              the full key will be shown. Store it somewhere safe (a password manager or your
              deployment secrets) before closing this dialog.
            </div>

            <div
              style={{
                marginTop: '1rem',
                background: '#f5f5f5',
                border: '1px solid #e5e5e5',
                borderRadius: 6,
                padding: '0.75rem',
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                wordBreak: 'break-all',
              }}
            >
              {created.raw_key}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.25rem' }}>
              <button
                type="button"
                onClick={handleCopy}
                style={{
                  background: 'transparent',
                  border: '1px solid #ddd',
                  padding: '0.55rem 1rem',
                  borderRadius: 6,
                  cursor: 'pointer',
                }}
              >
                {copied ? 'Copied' : 'Copy key'}
              </button>
              <button
                type="button"
                onClick={handleDone}
                style={{
                  background: '#111',
                  color: '#fff',
                  border: 'none',
                  padding: '0.55rem 1rem',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
