import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/:path*', // Matches any path on the host
        has: [
          {
            type: 'host',
            value: 'docs.cryptoindexfund.ai',
          },
        ],
        destination: '/docs/:path*', // Rewrites to /docs/the-same-path
      },
      // Explicit rule for the root of the subdomain
      {
        source: '/', 
        has: [
          {
            type: 'host',
            value: 'docs.cryptoindexfund.ai',
          },
        ],
        destination: '/docs', // Rewrites to /docs
      },
    ];
  },
};

export default nextConfig;
