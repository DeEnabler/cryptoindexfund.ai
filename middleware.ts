import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log('Middleware executed!'); // Add this line
  const hostname = request.headers.get('host')!
  console.log('Hostname:', hostname); // Add this line
  if (hostname === 'docs.cryptoindexfund.ai') {
    console.log('Rewriting URL for docs subdomain'); // Add this line
    const url = request.nextUrl.clone()
    url.pathname = `/docs${url.pathname}`
    return NextResponse.rewrite(url)
  }
  return NextResponse.next()
}