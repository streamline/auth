import Link from 'next/link';
import Logo from '@/components/icons/Logo';
import { createClient } from '@/utils/supabase/server';
import UserSettingsNav from './UserSettingsNav';
import s from './Navbar.module.css';

export async function Navlinks() {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
      <div className="flex items-center flex-1">
        <Link href="/" className={s.logo} aria-label="Logo">
          <Logo />
        </Link>
        <nav className="ml-6 space-x-2 lg:block">
          <Link href="/plans" className={s.link}>
            Plans
          </Link>
          {user && (
            <Link href="/account" className={s.link}>
              Account
            </Link>
          )}
        </nav>
      </div>
      <div className="flex justify-end space-x-8">
        {user ? (
          <UserSettingsNav user={user} />
        ) : (
          <Link href="/signin" className={s.link}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navlinks;