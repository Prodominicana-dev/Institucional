const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  /* Recorta el bundle de las librerías de íconos: sin esto, importar un solo
     ícono de @heroicons/react o @material-tailwind/react arrastra todo el
     paquete al bundle del cliente. */
  experimental: {
    optimizePackageImports: [
      "@heroicons/react",
      "@material-tailwind/react",
      "@fortawesome/react-fontawesome",
      "@tabler/icons-react",
      "lucide-react",
    ],
  },
  images: {
    formats: ["image/avif", "image/webp"],
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

      {
        source: "/RepositorioExportacion",
        destination: "/RepositorioExportacion/Guia-Exportacion-2025.pdf",
        permanent: false,
      },
      {
        source: "/mujeres-exportadoras",
        destination: "/mujer-exporta",
        permanent: true,
      },
      {
        source: "/es/mujeres-exportadoras",
        destination: "/es/mujer-exporta",
        permanent: true,
      },
      {
        source: "/en/women-exporters",
        destination: "/en/mujer-exporta",
        permanent: true,
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
