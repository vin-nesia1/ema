import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { to } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'noreply@vinnesia.my.id',
      to,
      subject: 'Halo dari Next.js + Resend!',
      text: 'Ini email test dari website kamu.',
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
