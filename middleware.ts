import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host')!
  if (hostname === 'docs.cryptoindexfund.ai') {
    const url = request.nextUrl.clone()
    url.pathname = `/docs${url.pathname}`
    return NextResponse.rewrite(url)
  }
  return NextResponse.next()
}