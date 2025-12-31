import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  htmlLimitedBots: /.*/,
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
        port: "3008",
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
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=120, stale-while-revalidate=300",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
