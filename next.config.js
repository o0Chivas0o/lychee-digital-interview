/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  async rewrites() {
    return [
      //接口请求 前缀带上/api-text/
      { source: '/api-text/:path*', destination: `http://127.0.0.1:8080/:path*` },
    ]
  },
};

module.exports = nextConfig;
