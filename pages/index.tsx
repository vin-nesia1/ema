import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: email }),
    });

    if (res.ok) {
      setSent(true);
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Kirim Email via Resend</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Masukkan email kamu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Kirim</button>
      </form>
      {sent && <p>Email berhasil dikirim!</p>}
    </div>
  );
}
