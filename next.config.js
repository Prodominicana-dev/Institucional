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
  /* Códigos QR ya impresos.

     Sus direcciones no se pueden cambiar, pero los PDF viven ahora en la API,
     que los entrega por su propio endpoint. Cada regla lleva una dirección
     impresa a su archivo, conservando el nombre.

     Son reescrituras y no redirecciones para que el visitante siga viendo la
     dirección impresa en el código: el portal trae el documento de la API y lo
     entrega él mismo, sin que la barra del navegador cambie.

     Van en beforeFiles para que ganen sobre el archivo antiguo que todavía
     pueda quedar en public/Documentos.

     Los paréntesis van escapados en el source, porque de lo contrario Next los
     interpreta como un patrón, y codificados en el destination, que analiza
     como URL. */
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/Documentos/Perfiles productivos provinciales 2022.pdf",
          destination: "https://prodominicana.gob.do/apiv2/qr-docs/file/Perfiles%20productivos%20provinciales%202022.pdf",
        },
        {
          source: "/Documentos/Guia_de_Inversion_ RD_en_Espanol.pdf",
          destination: "https://prodominicana.gob.do/apiv2/qr-docs/file/Guia_de_Inversion_%20RD_en_Espanol.pdf",
        },
        {
          source: "/Documentos/Directorio  Exportadores.pdf",
          destination: "https://prodominicana.gob.do/apiv2/qr-docs/file/Directorio%20%20Exportadores.pdf",
        },
        {
          source: "/Documentos/Perfiles_Productivos_Provinciales.pdf",
          destination: "https://prodominicana.gob.do/apiv2/qr-docs/file/Perfiles_Productivos_Provinciales.pdf",
        },
        {
          source: "/Documentos/Investment_PORTFOLIO Ingles_2023_.pdf",
          destination: "https://prodominicana.gob.do/apiv2/qr-docs/file/Investment_PORTFOLIO%20Ingles_2023_.pdf",
        },
      ],
    };
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
