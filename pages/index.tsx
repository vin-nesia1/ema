import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message }),
      });

      const data = await res.json();
      setStatus(data.message);
    } catch (error) {
      setStatus('Terjadi kesalahan saat mengirim email.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Kirim Email</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan email"
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tulis pesan"
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px', minHeight: '100px' }}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          style={{ padding: '10px 20px', backgroundColor: isLoading ? '#ccc' : '#0070f3', color: '#fff', border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer' }}
        >
          {isLoading ? 'Mengirim...' : 'Kirim'}
        </button>
      </form>
      {status && <p style={{ marginTop: '10px', color: status.includes('berhasil') ? 'green' : 'red' }}>{status}</p>}
    </div>
  );
}
