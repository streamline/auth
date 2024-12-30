import Link from 'next/link';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  domain: string;
}

export default function Footer(props: Props) {
  const domain = decodeURIComponent(props.domain);

  return (
    <footer className="mx-auto max-w-[1920px]">
      <div className="max-w-6xl mx-auto">
        <div className="flex md:items-center justify-between flex-col-reverse py-8 px-6 md:flex-row border-t-2 border-zinc-900">
          <div className="col-span-1 lg:col-span-2">
            <span>
              Copyright &copy; {new Date().getFullYear()} Rey Records. All rights reserved.
            </span>
          </div>
          <div className="col-span-1 lg:col-span-2 mb-4 md:mb-0">
            <Link
              href={`/privacy`}
              className="text-white transition duration-150 ease-in-out hover:underline hover:text-zinc-200"
            >
              Privacy Policy
            </Link>
            {' • '}
            <Link
              href={`/terms`}
              className="text-white transition duration-150 ease-in-out hover:underline hover:text-zinc-200"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
