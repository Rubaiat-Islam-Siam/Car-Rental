import { cookies } from 'next/headers';
import { prisma } from './prisma';

export interface SessionUser {
  id: number;
  username: string;
  role: 'CUSTOMER' | 'ADMIN';
}

const COOKIE_NAME = 'vrs_session';

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(COOKIE_NAME);
  if (!sessionCookie?.value) {
    return null;
  }

  try {
    const raw = Buffer.from(sessionCookie.value, 'base64').toString('utf-8');
    const parsed = JSON.parse(raw);
    if (parsed && parsed.id && parsed.username && parsed.role) {
      return parsed as SessionUser;
    }
  } catch (err) {
    console.error('Failed to parse session cookie:', err);
  }
  return null;
}

export async function setSession(user: SessionUser) {
  const cookieStore = await cookies();
  const value = Buffer.from(JSON.stringify(user)).toString('base64');
  cookieStore.set(COOKIE_NAME, value, {
    httpOnly: false, // allow client-side reading for easy instant UI badge updates
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: 'lax',
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function authenticate(username: string, password: string): Promise<{ success: boolean; user?: SessionUser; error?: string }> {
  try {
    const user = await prisma.user.findUnique({
      where: { username: username.trim().toLowerCase() },
    });

    if (!user || user.password !== password) {
      return { success: false, error: 'Invalid username or password' };
    }

    const sessionUser: SessionUser = {
      id: user.id,
      username: user.username,
      role: user.role as 'CUSTOMER' | 'ADMIN',
    };

    await setSession(sessionUser);
    return { success: true, user: sessionUser };
  } catch (error) {
    console.error('Authentication error:', error);
    return { success: false, error: 'Authentication service error' };
  }
}
