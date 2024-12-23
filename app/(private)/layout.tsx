import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import { Toaster } from '@/components/ui/Toasts/toaster';
import { PropsWithChildren, Suspense } from 'react';

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main
        id="skip"
        className="height-screen-helper"
      >
        {children}
      </main>
      {/* <Footer /> */}
      <Suspense>
        <Toaster />
      </Suspense>
    </>
  );
}
