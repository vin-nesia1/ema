/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Konfigurasi untuk Vercel deployment
  output: 'standalone',
  // Pastikan public directory ada
  distDir: '.next',
}

module.exports = nextConfig
