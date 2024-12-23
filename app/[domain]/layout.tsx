import { Metadata } from 'next';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import { Toaster } from '@/components/ui/Toasts/toaster';
import { PropsWithChildren, Suspense } from 'react';
import { getURL } from '@/utils/helpers';
import 'styles/main.css';

const title = 'Rey Authentication';
const description = '';

// export async function generateMetadata({
//   params,
// }: {
//   params: { domain: string };
// }): Promise<Metadata | null> {
//   const domain = decodeURIComponent(params.domain);

//   // const {
//   //   name: title,
//   //   description,
//   //   image,
//   //   logo,
//   // } = data as {
//   //   name: string;
//   //   description: string;
//   //   image: string;
//   //   logo: string;
//   // };
//   const title = 'Rey Authentication';
//   const description = '';
//   const image = '';
//   const logo = '';

//   return {
//     title,
//     description,
//     openGraph: {
//       title,
//       description,
//       images: [image],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title,
//       description,
//       images: [image],
//       creator: "@vercel",
//     },
//     icons: [logo],
//     metadataBase: new URL(`https://${domain}`),
//     // Optional: Set canonical URL to custom domain if it exists
//     // ...(params.domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
//     //   data.customDomain && {
//     //     alternates: {
//     //       canonical: `https://${data.customDomain}`,
//     //     },
//     //   }),
//   };
// }

export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description
  }
};

interface RootLayoutProps extends PropsWithChildren {
  params: { domain: string };
}

export default async function RootLayout({ params, children }: RootLayoutProps) {
  const domain = decodeURIComponent(params.domain);
  // const data = await getSiteData(domain);

  return (
    <html lang="en">
      <body className="bg-black">
        {children}
        <Footer domain={domain} />
        <Suspense>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
