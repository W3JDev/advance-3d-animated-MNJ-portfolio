// Vercel Serverless Function for Contact Form
import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, message, projectType, budget } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Send email
    const { data, error } = await resend.emails.send({
      from: 'portfolio@yourdomain.com',
      to: ['your-email@gmail.com'],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error('Email error:', error);
      return res.status(500).json({ message: 'Failed to send email' });
    }

    // Store in database (optional)
    // await supabase.from('contacts').insert([
    //   { name, email, message, project_type: projectType, budget }
    // ]);

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
