import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dapjholek/**',
      },
      {
        protocol: 'https',
        hostname: 'pub-c45392de4794447390623deb4dca4edd.r2.dev',
        pathname: '/cswebsite/**',
      },
    ],
  },
};

export default nextConfig;
