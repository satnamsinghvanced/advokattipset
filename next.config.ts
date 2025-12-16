import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["advokattipset.no"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "advokattipset.no",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.advokattipset.no",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
