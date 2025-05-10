import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'koutuk-vidyalay.github.io',
      },
      {
        protocol: 'https',
        hostname: 'www.netrarit.com',
      },
      {
        protocol: 'https',
        hostname: 'ritindia.edu',
      },
    ],
  },
};

export default nextConfig;
