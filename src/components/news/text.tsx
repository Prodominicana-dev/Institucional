import React from "react";

/* El contenido llega como HTML del editor, sin estilos propios. Sin estas
   reglas el texto sale pegado, a ancho completo y con los titulares del mismo
   tamano que el cuerpo: cuesta leerlo. La medida se limita a unos 72
   caracteres por linea, que es lo comodo para leer corrido. */
export default function TextContent({ text }: { text: any }) {
  return (
    <div
      className="
        mx-auto w-full max-w-[72ch] font-opensans text-[17px] leading-[1.8]
        text-gray-800 lg:text-[18px]
        [&_p]:mb-5
        [&_h1]:mt-8 [&_h1]:mb-3 [&_h1]:font-montserrat [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:leading-snug [&_h1]:text-blue-950
        [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:font-montserrat [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:leading-snug [&_h2]:text-blue-950
        [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:font-montserrat [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-blue-950
        [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6
        [&_li]:mb-2
        [&_a]:text-blue-dark [&_a]:underline [&_a]:underline-offset-2
        [&_strong]:font-semibold [&_strong]:text-blue-950
        [&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-blue-dark
        [&_blockquote]:bg-gray-50 [&_blockquote]:px-5 [&_blockquote]:py-3 [&_blockquote]:italic
        [&_img]:my-6 [&_img]:h-auto [&_img]:w-full [&_img]:rounded-md
        [&_table]:my-6 [&_table]:w-full [&_table]:border-collapse
        [&_td]:border [&_td]:border-gray-200 [&_td]:p-2
        [&_th]:border [&_th]:border-gray-200 [&_th]:bg-gray-50 [&_th]:p-2 [&_th]:text-left
      "
      dangerouslySetInnerHTML={{ __html: text }}
    ></div>
  );
}
