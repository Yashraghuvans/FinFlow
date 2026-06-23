import { NextResponse } from 'next/server';
import { adminAuth } from '@/app/lib/firebase-admin';
import { prisma } from '@/app/lib/prisma';

export async function POST(req) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing or invalid token' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await adminAuth.verifyIdToken(token);
    
    const { uid, email, name } = decodedToken;

    if (!email) {
      return NextResponse.json({ error: 'Email missing from token' }, { status: 400 });
    }

    const user = await prisma.user.upsert({
      where: { email },
      update: { name: name || '' },
      create: {
        id: uid, // Use Firebase UID as the Prisma User ID
        email,
        name: name || '',
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Auth sync error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
