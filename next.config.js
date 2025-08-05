/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost', 'firebasestorage.googleapis.com'],
  },
}

module.exports = nextConfig 