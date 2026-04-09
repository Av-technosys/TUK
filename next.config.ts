import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  images: {
    loader: 'custom',
    loaderFile: './image/loader.js',
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.cloudinary.com",
      },
    ],
  },
    trailingSlash: true,
};

export default nextConfig;
