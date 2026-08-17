import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    qualities: [75, 95],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "185.185.83.14",
      },
    ],
  },
};

export default nextConfig;
