/** @type {import('next').NextConfig} */
console.log('process.env.', process.env.SERVER);
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/data-api/:path*',
        // destination: 'http://localhost:4000/:path*',
        destination: process.env.SERVER + '/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
