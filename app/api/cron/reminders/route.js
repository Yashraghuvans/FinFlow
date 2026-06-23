import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { prisma } from '@/app/lib/prisma';

export async function GET(req) {
  // Check authorization header for Vercel Cron
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set');
    return NextResponse.json({ error: 'Resend API key missing' }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    // In a real scenario, you'd fetch users who haven't updated in 7 days
    // const inactiveUsers = await prisma.user.findMany({...})
    
    // For demonstration, we'll assume we got a list
    const inactiveUsers = [{ email: 'test@example.com', name: 'Test User' }];

    for (const user of inactiveUsers) {
      await resend.emails.send({
        from: 'FinFlow <updates@finflow.demo>',
        to: user.email,
        subject: 'Weekly FinFlow Update Reminder',
        html: `<p>Hi ${user.name}, don't forget to update your financial records this week!</p>`
      });
    }

    return NextResponse.json({ success: true, emailsSent: inactiveUsers.length });
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
