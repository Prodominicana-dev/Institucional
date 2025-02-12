/** @type {import('next').NextConfig} */
const withNextIntl = require("next-intl/plugin")();

const nextConfig = withNextIntl({
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "**",
      },
    ],
  },
});

module.exports = nextConfig;
