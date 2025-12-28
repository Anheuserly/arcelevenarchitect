/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',        // ✅ REQUIRED for Cloudflare Pages
  images: {
    unoptimized: true,     // ✅ REQUIRED (no Next/Image server)
  },
};

export default nextConfig;

