
import { NextResponse } from 'next/server';
import { createClient } from '@/app/lib/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const requestedNext = searchParams.get('next') ?? '/dashboard';

  const redirectUrl = new URL(requestedNext, origin);
  const next =
    redirectUrl.origin === origin
      ? redirectUrl
      : new URL('/dashboard', origin);

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(next);
    }
  }

  return NextResponse.redirect(new URL('/login?error=auth', origin));
}
