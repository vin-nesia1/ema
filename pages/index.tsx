import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setMessage('Email tidak boleh kosong');
      setIsSuccess(false);
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Email berhasil dikirim! Silakan cek inbox Anda.');
        setIsSuccess(true);
        setEmail(''); // Reset form
      } else {
        setMessage(data.error || 'Gagal mengirim email');
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage('Terjadi kesalahan. Silakan coba lagi.');
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Send Email - Next.js + Resend</title>
        <meta name="description" content="Aplikasi pengiriman email dengan Next.js dan Resend" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main style={{ 
        maxWidth: '500px', 
        margin: '50px auto', 
        padding: '20px',
        fontFamily: 'system-ui, sans-serif'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
          📧 Send Email Test
        </h1>

        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="email" style={{ 
              display: 'block', 
              marginBottom: '5px',
              fontWeight: 'bold'
            }}>
              Email Address:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              placeholder="contoh@email.com"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: isLoading ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            {isLoading ? 'Mengirim...' : 'Kirim Email'}
          </button>
        </form>

        {message && (
          <div style={{
            padding: '10px',
            borderRadius: '4px',
            backgroundColor: isSuccess ? '#d4edda' : '#f8d7da',
            color: isSuccess ? '#155724' : '#721c24',
            border: `1px solid ${isSuccess ? '#c3e6cb' : '#f5c6cb'}`,
            marginTop: '15px'
          }}>
            {message}
          </div>
        )}

        <div style={{ 
          marginTop: '40px', 
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          <h3>📝 Petunjuk Setup:</h3>
          <ol>
            <li>Daftar di <a href="https://resend.com" target="_blank" rel="noopener noreferrer">resend.com</a></li>
            <li>Dapatkan API key dari dashboard Resend</li>
            <li>Tambahkan <code>RESEND_API_KEY</code> ke environment variables</li>
            <li>Verifikasi domain pengirim di Resend (atau gunakan domain sandbox)</li>
            <li>Update alamat <code>from</code> di <code>/api/send-email.ts</code></li>
          </ol>
        </div>
      </main>
    </>
  );
}
