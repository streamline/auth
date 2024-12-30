import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { sharedDomain } from "./sharedDomain";

export const createClient = (request: NextRequest) => {
	// Create an unmodified response
	let response = NextResponse.next({
		request: {
			headers: request.headers,
		},
	});
	console.log('createClient-sharedDomain', sharedDomain)

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get(name: string) {
					return request.cookies.get(name)?.value;
				},

				set(name: string, value: string, options: CookieOptions) {
					// Ensure options include the domain and security settings
					const cookieOptions = {
						...options,
						domain: sharedDomain,
						secure: true, // Ensures cookies are sent over HTTPS
						sameSite: "None", // Required for cross-domain usage
					};

					// Update request cookies
					request.cookies.set({
						name,
						value,
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
						...cookieOptions,
					});
				},

				remove(name: string, options: CookieOptions) {
					// Ensure options include the domain and security settings
					const cookieOptions = {
						...options,
						domain: sharedDomain,
						secure: true,
						sameSite: "None",
					};

					// Remove from request cookies
					request.cookies.set({
						name,
						value: "",
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
						...cookieOptions,
					});
				},
			},
		},
	);

	return { supabase, response };
};

export const updateSession = async (request: NextRequest) => {
  try {
    // This `try/catch` block is only here for the interactive tutorial.
    // Feel free to remove once you have Supabase connected.
    const { supabase, response } = createClient(request);

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    await supabase.auth.getUser();

    return response;
  } catch (e) {
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
