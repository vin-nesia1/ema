import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, message }),
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Kirim Email</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Masukkan email"
          required
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tulis pesan"
          required
        />
        <button type="submit">Kirim</button>
      </form>
    </div>
  );
}
