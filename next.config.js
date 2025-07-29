/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Pastikan API routes tidak di-prerender
  experimental: {
    outputFileTracingRoot: undefined,
  },
}

module.exports = nextConfig
