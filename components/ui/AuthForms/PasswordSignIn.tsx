'use client';

import Button from '@/components/ui/Button';
import Link from 'next/link';
import { signInWithPassword } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

// Define prop type with allowEmail boolean
interface PasswordSignInProps {
  allowEmail: boolean;
  redirectMethod: string;
}

export default function PasswordSignIn({
  allowEmail,
  redirectMethod
}: PasswordSignInProps) {
  const searchParams = useSearchParams();
  const redirect = encodeURIComponent(searchParams.get('redirect') || '/');
  const router = redirectMethod === 'client' ? useRouter() : null;
  const query = redirectMethod === 'client' ? useSearchParams() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, signInWithPassword, router, query);
    setIsSubmitting(false);
  };

  return (
    <div className="my-8">
      <form
        noValidate={true}
        className="mb-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="grid gap-2">
          <div className="grid gap-1">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              placeholder="name@example.com"
              type="email"
              name="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              className="w-full p-3 rounded-md bg-zinc-800"
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              placeholder="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              className="w-full p-3 rounded-md bg-zinc-800"
            />
          </div>
          <Button
            variant="slim"
            type="submit"
            className="mt-1"
            loading={isSubmitting}
          >
            Sign in
          </Button>
        </div>
      </form>
      <p>
        <Link href={`/signin/forgot_password?redirect=${redirect}`} className="font-light text-sm">
          Forgot your password?
        </Link>
      </p>
      {allowEmail && (
        <p>
          <Link href={`/signin/email_signin?redirect=${redirect}`} className="font-light text-sm">
            Sign in via magic link
          </Link>
        </p>
      )}
      {process.env.NEXT_PUBLIC_DISABLE_SIGNUP !== 'true' ? (
        <p>
          <Link href={`/signin/signup?redirect=${redirect}`} className="font-light text-sm">
            Don't have an account? Sign up
          </Link>
        </p>) : null}
    </div>
  );
}
