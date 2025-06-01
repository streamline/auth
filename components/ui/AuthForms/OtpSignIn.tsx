'use client';

import Button from '@/components/ui/Button';
import { verifyOtp } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function OtpSignIn({ redirectMethod }: { redirectMethod: string }) {
    const router = redirectMethod === 'client' ? useRouter() : null;
    const query = redirectMethod === 'client' ? useSearchParams() : null;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsSubmitting(true);
        await handleRequest(e, verifyOtp, router, query);
        setIsSubmitting(false);
    };

    return (
        <div className="my-8">
            <form noValidate className="mb-4" onSubmit={handleSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <label htmlFor="otp">OTP Code</label>
                        <input
                            id="otp"
                            name="otp"
                            type="text"
                            placeholder="123456"
                            className="w-full p-3 rounded-md bg-zinc-800"
                        />
                    </div>

                    <Button
                        variant="slim"
                        type="submit"
                        className="mt-1"
                        loading={isSubmitting}
                    >
                        Verify OTP
                    </Button>
                </div>
            </form>
        </div>
    );
}
