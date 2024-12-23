import { NextRequest, NextResponse } from 'next/server';

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
const VERCEL_DEPLOYMENT_SUFFIX = process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX;

function normalizeHostname(hostname: string) {
  // Handle localhost and root domain
  if (hostname.includes('localhost:')) {
    return hostname.replace('.localhost:3000', `.${ROOT_DOMAIN}`);
  }

  // Handle Vercel preview deployment URLs
  if (hostname.includes('---') && hostname.endsWith(`.${VERCEL_DEPLOYMENT_SUFFIX}`)) {
    return `${hostname.split('---')[0]}.${ROOT_DOMAIN}`;
  }

  return hostname;
}

export async function multiTenant(request: NextRequest, response: NextResponse) {
  const url = request.nextUrl;

  // Normalize hostname
  const rawHostname = request.headers.get('host');
  if (!rawHostname) return response;

  const hostname = normalizeHostname(rawHostname);
  console.log('Hostname:', hostname);
  const searchParams = url.searchParams.toString();
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`;

  // Root domain logic
//   if (hostname === ROOT_DOMAIN || hostname === 'localhost:3000') {
//     return NextResponse.rewrite(new URL(`/home${path === '/' ? '' : path}`, request.url));
//   }

  // Rewrite for dynamic domain routing
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, request.url));
}
