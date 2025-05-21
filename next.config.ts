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
  async redirects() {
    return [
      {
        source: '/',
        destination: '/docs',
        permanent: true, // Or false if you want it to be temporary
        has: [
          {
            type: 'host',
            value: 'docs.cryptoindexfund.ai',
          },
        ],
      },
      // You can add other path-specific redirects for the docs subdomain here if needed
      // For example, if you had an old path /old-feature and want to redirect it to /docs/new-feature
      // {
      //   source: '/old-feature',
      //   destination: '/docs/new-feature',
      //   permanent: true,
      //   has: [
      //     {
      //       type: 'host',
      //       value: 'docs.cryptoindexfund.ai',
      //     },
      //   ],
      // }
    ];
  },
  // Removed the previous rewrites configuration
  // async rewrites() {
  //   return [
  //     {
  //       source: '/:path*',
  //       has: [
  //         {
  //           type: 'host',
  //           value: 'docs.cryptoindexfund.ai',
  //         },
  //       ],
  //       destination: '/docs/:path*',
  //     },
  //     {
  //       source: '/',
  //       has: [
  //         {
  //           type: 'host',
  //           value: 'docs.cryptoindexfund.ai',
  //         },
  //       ],
  //       destination: '/docs',
  //     },
  //   ];
  // },
};

export default nextConfig;
