import { SignOut } from '@/utils/auth-helpers/server';
import { redirect } from 'next/navigation';
import { headers } from "next/headers";

export default async function Logout() {
    await SignOut();
    return redirect('/signin');
}
