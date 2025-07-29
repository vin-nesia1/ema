import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

// Inisialisasi Resend client hanya jika API key tersedia
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Hanya terima method POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validasi API key dan Resend client
  if (!process.env.RESEND_API_KEY || !resend) {
    return res.status(500).json({ error: 'RESEND_API_KEY tidak ditemukan di environment variables' });
  }

  const { email } = req.body;

  // Validasi input email
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Email tidak valid' });
  }

  try {
    // Kirim email menggunakan Resend
    const { data, error } = await resend.emails.send({
      from: 'noreply@vinnesia.my.id', // Domain sandbox Resend (bisa langsung pakai)
      to: [email],
      subject: 'Test Email dari Next.js',
      html: `
        <h1>Halo!</h1>
        <p>Ini adalah email test yang dikirim dari aplikasi Next.js menggunakan Resend.</p>
        <p>Email dikirim ke: <strong>${email}</strong></p>
        <p>Terima kasih!</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Email berhasil dikirim',
      emailId: data?.id 
    });

  } catch (error) {
    console.error('Error mengirim email:', error);
    return res.status(500).json({ 
      error: 'Gagal mengirim email. Silakan coba lagi.' 
    });
  }
}
