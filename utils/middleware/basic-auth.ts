import { NextRequest, NextResponse } from 'next/server'

const [AUTH_USER, AUTH_PASS] = (process.env.HTTP_BASIC_AUTH || ':').split(':')

function isAuthenticated(req: NextRequest) {
  const authheader =
    req.headers.get('authorization') || req.headers.get('Authorization')

  if (!authheader) {
    return false
  }

  const auth = Buffer.from(authheader.split(' ')[1], 'base64')
    .toString()
    .split(':')
  const user = auth[0]
  const pass = auth[1]

  if (user == AUTH_USER && pass == AUTH_PASS) {
    return true
  } else {
    return false
  }
}

export async function basicAuth(request: NextRequest, response: NextResponse) {
  if (!AUTH_USER || !AUTH_PASS) {
    return response
  }

  if (!isAuthenticated(request)) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic' },
    })
  }

  return response
}