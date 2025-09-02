const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
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
  async redirects() {
    return [
      {
        source: "/transparency",
        destination: "https://transparencia.prodominicana.gob.do/",
        permanent: true, 
      },
      {
        source: "/transparencia",
        destination: "https://transparencia.prodominicana.gob.do/",
        permanent: true, 
      },
      {
        source: "/transparency/:path*",
        destination: "https://transparencia.prodominicana.gob.do/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
