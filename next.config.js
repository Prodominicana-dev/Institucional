/** @type {import('next').NextConfig} */
const withNextIntl = require("next-intl/plugin")();

const nextConfig = withNextIntl({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "img.icons8.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "prodominicana.gob.do",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "**",
      },

      {
        protocol: "https",
        hostname: "hoy.com.do",
        pathname: "**",
      },
    ],
  },
});

module.exports = nextConfig;
