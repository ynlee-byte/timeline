/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'c.animaapp.com',
      },
      {
        protocol: 'https',
        hostname: 'anima-uploads.s3.amazonaws.com',
      },
    ],
  },
};

module.exports = nextConfig;
