import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, message } = req.body;

  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Halo dari Next.js',
      text: message,
    });

    if (error) {
      return res.status(500).json({ message: 'Gagal mengirim email' });
    }

    res.status(200).json({ message: 'Email berhasil dikirim!' });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
}
