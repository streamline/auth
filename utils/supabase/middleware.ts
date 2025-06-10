import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { sharedDomain } from "./sharedDomain";

// Ensure options include the domain and security settings
const cookieOptions = {
	domain: sharedDomain,
	secure: true, // Ensures cookies are sent over HTTPS
	sameSite: "None", // Required for cross-domain usage
};

export const createClient = (request: NextRequest) => {
	// Create an unmodified response
	let response = NextResponse.next({
		request: {
			headers: request.headers,
		},
	});

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get(name: string) {
					return request.cookies.get(name)?.value;
				},

				set(name: string, value: string, options: CookieOptions) {

					// Update request cookies
					request.cookies.set({
						name,
						value,
						...options,
						...cookieOptions,
					});

					// Update response cookies
					response = NextResponse.next({
						request: {
							headers: request.headers,
						},
					});
					response.cookies.set({
						name,
						value,
						...options,
						...cookieOptions,
					});
				},

				remove(name: string, options: CookieOptions) {
					// Remove from request cookies
					request.cookies.set({
						name,
						value: "",
						...options,
						...cookieOptions,
					});

					// Remove from response cookies
					response = NextResponse.next({
						request: {
							headers: request.headers,
						},
					});
					response.cookies.set({
						name,
						value: "",
						...options,
						...cookieOptions,
					});
				},
			},
		},
	);

	return { supabase, response };
};

export const updateSession = async (request: NextRequest) => {
	const url = request.nextUrl;
	const path = url.pathname;

	try {
		// This `try/catch` block is only here for the interactive tutorial.
		// Feel free to remove once you have Supabase connected.
		const { supabase, response } = createClient(request);

		// This will refresh session if expired - required for Server Components
		// https://supabase.com/docs/guides/auth/server-side/nextjs
		await supabase.auth.getUser();
		
		if (path === '/done') {
			const redirectTo = url.searchParams.get('redirect');
			if (!redirectTo) return NextResponse.next();

			const { data: { session } } = await supabase.auth.getSession();

			if (session && redirectTo && redirectTo.startsWith('http')) {
				if (process.env.ALLOW_SUPA_ACROSS_DOMAINS === 'true') {
					const target = new URL('/auth/callback', redirectTo);
					target.searchParams.set('access_token', session.access_token);
					target.searchParams.set('refresh_token', session.refresh_token);
					return NextResponse.redirect(target);
				} else {
					return NextResponse.redirect(redirectTo || '/account');
				}
			} else {
				console.warn('Invalid redirectTo:', redirectTo);
				return NextResponse.redirect(new URL('/', request.url)); // fallback
			}
		}

		return response;
	} catch (e) {
		console.error('Error creating Supabase client:', e);
		// If you are here, a Supabase client could not be created!
		// This is likely because you have not set up environment variables.
		// Check out http://localhost:3000 for Next Steps.
		return NextResponse.next({
		request: {
			headers: request.headers
		}
		});
	}
};
