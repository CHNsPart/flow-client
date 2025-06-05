import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  images: {
    domains: [
      'images.unsplash.com',
      'plus.unsplash.com',
      'avatars.githubusercontent.com',
      'github.com',
      'lh3.googleusercontent.com',
      'ui-avatars.com',
      'randomuser.me',
      'cloudflare-ipfs.com',
      's3.amazonaws.com',
      'avatar.vercel.sh'
    ],
  },
};

export default nextConfig;