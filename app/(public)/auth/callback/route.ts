import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getErrorRedirect, getStatusRedirect } from '@/utils/helpers';
import { EmailOtpType } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the `@supabase/ssr` package. It exchanges an auth code for the user's session.
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const token = requestUrl.searchParams.get('token') || requestUrl.searchParams.get('token_hash') || ''; // Token for PKCE
  const type: EmailOtpType = requestUrl.searchParams.get('type') as EmailOtpType; // Check the flow type
  const redirectTo =requestUrl.searchParams.get('redirect') || requestUrl.searchParams.get('redirect_to'); // URL to redirect to after sign-in

  if (token && type) {
    const supabase = createClient();

    // Use `exchangeCodeForSession` to handle the magic link token
    const { error } = await supabase.auth.verifyOtp({ token_hash: token, type })
    // const { error } = await supabase.auth.exchangeCodeForSession(token);
    if (error) {
      console.error('Error exchanging magic link token:', error);
      return NextResponse.redirect(
        getErrorRedirect(
          `${requestUrl.origin}/signin/email_signin`,
          error.name,
          "Sorry, we weren't able to log you in. Please try again."
        )
      );
    }

  } else if (code) {
    const supabase = createClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(
        getErrorRedirect(
          `${requestUrl.origin}/signin`,
          error.name,
          "Sorry, we weren't able to log you in. Please try again."
        )
      );
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(
    getStatusRedirect(
      redirectTo || `${requestUrl.origin}/account`,
      'Success!',
      'You are now signed in.'
    )
  );
}
