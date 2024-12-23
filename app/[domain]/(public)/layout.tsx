import { PropsWithChildren } from 'react';

export default async function AuthLayout({ children }: PropsWithChildren) {
  return (
    <>
      <main
        id="skip"
        className="height-screen-helper"
      >
        {children}
      </main>
    </>
  );
}
