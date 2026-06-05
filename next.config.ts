import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site (no SSR/ISR/API). Builds to ./out for Cloudflare Pages.
  output: 'export',
  images: {
    // No image-optimization server on a static export. Cloudinary (and, after
    // migration, R2) already serve pre-optimized assets, so we serve as-is.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dapjholek/**',
      },
    ],
  },
};

export default nextConfig;
