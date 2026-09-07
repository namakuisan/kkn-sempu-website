import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Domain CDN gambar dari Contentful
        protocol: "https",
        hostname: "images.ctfassets.net",
        pathname: "/**",
      },
      {
        // Domain CDN file non-gambar dari Contentful (video, PDF, dll.)
        protocol: "https",
        hostname: "assets.ctfassets.net",
        pathname: "/**",
      },
      {
        // Gambar dummy dari Unsplash (untuk placeholder statis)
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
