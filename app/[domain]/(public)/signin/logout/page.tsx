import { SignOut } from '@/utils/auth-helpers/server';
import { redirect } from 'next/navigation';
import { headers } from "next/headers";

export default async function Logout() {
    const heads = headers()
    const pathname = heads.get('next-url')

    await SignOut(pathname);
    return redirect('/signin');
}
