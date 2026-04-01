import type { NextConfig } from "next";

const assetHeaders = [
  {
    key: "Cache-Control",
    value: "public, max-age=31536000, immutable",
  },
  {
    key: "Content-Disposition",
    value: "inline",
  },
  {
    key: "X-Robots-Tag",
    value: "all",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/portfolio/:path*",
        headers: assetHeaders,
      },
      {
        source: "/brand/:path*",
        headers: assetHeaders,
      },
      {
        source: "/contact/:path*",
        headers: assetHeaders,
      },
    ];
  },
};

export default nextConfig;
