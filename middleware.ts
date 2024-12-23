import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware';
import { basicAuth } from '@/utils/middleware/basic-auth';
import { multiTenant } from '@/utils/middleware/multi-tenant';

export async function middleware(request: NextRequest) {
  const handlers = [basicAuth, multiTenant, updateSession]
  const response = NextResponse.next()

  for (const handler of handlers) {
    const handlerResponse = await handler(request, response)

    if (handlerResponse === response) {
      // Continue to the next handler
      continue
    } else if (handlerResponse instanceof NextResponse) {
      return handlerResponse
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
};

