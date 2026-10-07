# Institucional — Registro de cambios

## 2026-10-07 — Radar Económico: ajuste a la maqueta

El cliente señaló que lo visual no coincidía con el mandato. Se revisó la maqueta
contra el código y se corrigieron las seis diferencias. Rama `feat/radar-economico-v2`,
partiendo de `44a7411`; proeconomía entró por merge de `feat/noticias-pro` para no
perder los textos de Sumando Exportadoras.

### Movido al menú Novedades

Estaba como enlace suelto de primer nivel ("Noticias Pro"), al lado de SheTrades y
Mujer Exporta. Ahora es un elemento del desplegable **Novedades**, con el rótulo
**Radar Económico** y su descripción, en escritorio (`navbar.tsx`) y en móvil
(`navBarMobile.tsx`). La clave suelta `navbar.noticiasPro` quedó huérfana y se quitó.

### Diferencias con la maqueta, corregidas

- **Franja de titulares roja.** Era `bg-blue-950`. El rojo elegido es `#C8102E`, el
  que ya trae el logo `prodominicanaFull.svg` — no es paleta nueva y `globals.css`
  sigue sin tocarse. El mismo rojo se aplicó a las etiquetas de categoría y al filete
  de las columnas. Se dejó `text-red-400` en el hero (sobre el degradado azul oscuro
  `#C8102E` no se lee) y `text-red-700` en el error del boletín, que no es categoría.
- **Cabecera propia.** La barra de categorías ahora lleva la marca PROECONOMÍA +
  "Radar Económico" a la izquierda, las secciones en el centro y el buscador a la
  derecha, como la maqueta. Sin archivo de logo: la marca va en texto con Montserrat.
- **Secciones.** Exportación · Inversión · Turismo · Finanzas, en lugar de
  Importación · Inversión · Economía · Internacionales.
- **Columnas.** Exportación / Inversión / Finanzas (antes Importación / Inversión /
  Economía).
- **Tablero de Datos.** Ya existía para la portada: se importan `DataDashboard` y
  `DataDashboardMobile` de `src/components/home/`, a ancho completo entre las tarjetas
  y "Al Día". No se construyó nada nuevo ni se tocaron esos componentes.
- **"Al Día con ProDominicana".** Pasa de banda azul a fondo blanco: subtítulo rojo
  entre filetes, título centrado, tarjetas blancas con borde inferior azul y bloque de
  fecha azul.

### Pendiente de verificar

- Las secciones salen de la tabla `NewsCategory`. Si **Turismo** y **Finanzas** no
  existen ahí, su filtro y su columna saldrán vacíos.
- Falta el archivo del logo PROECONOMÍA; mientras tanto es texto.

Verificado: `npx tsc --noEmit` sin errores. Sin commitear.

## 2026-10-01 — Proeconomía / Radar Económico

Apartado nuevo bajo el menú Novedades: página pública `/proeconomia` y cuatro
pantallas de administración.

Regla aplicada en todo el trabajo: **no se modifica código existente**. Los
componentes se reusan importándolos. Los archivos existentes que aparecen abajo
solo reciben inserciones.

### Línea gráfica

La del sitio actual. La maqueta entregada se usó como referencia de contenido y
disposición, no de identidad visual:

- Tokens institucionales de `globals.css` (`--color-blue-dark: #01296d`,
  `--color-navy`), fuentes Montserrat y OpenSans. **No se creó paleta propia y no
  se tocó `globals.css`** — a diferencia de Mujer Exporta, que sí tiene la suya
  (`--color-me-*`).
- Sin logo ni navegación propios: el navbar y el footer los pone `(home)/layout.tsx`.
- La cabecera con menú de la maqueta (Exportación/Inversión/Turismo/Finanzas) se
  convirtió en barra de filtro por categoría dentro de la página.
- La franja roja de titulares va en el azul institucional.
- Radios y espaciados copiados de `(home)/news` y `(home)/gallery`.

### Página pública

`src/app/[locale]/(home)/proeconomia/page.tsx` (59 líneas) solo compone. Los
organismos viven en `src/components/proeconomia/`:

`CategoryBar` · `TickerBanner` · `HeroSection` (destacada + portada del día) ·
`RecentNewsThumbs` · `NewsCards` · `ScheduleCarousel` ("Al Día con ProDominicana",
sobre el módulo `Schedule` que ya existía) · `ColumnedNews` · `IndicatorsRow` ·
`NewsletterForm`.

Fuera de alcance por decisión del cliente: el **Tablero de Datos** de la maqueta.

### Panel de administración

| Ruta | Pantalla |
|---|---|
| `/admin/newsletter` | boletines: crear, editar, enviar, métricas, eliminar |
| `/admin/newsletter/subscribers` | suscriptores con buscador, CSV y eliminar |
| `/admin/newspaper-covers` | portadas diarias |
| `/admin/indicators` | los 4 indicadores del ticker |

Todas con `<AuthUser permission="create:news">` y `<Sketch>`. UI en shadcn; no se
agregó `@material-tailwind/react`. El editor del boletín reusa el tiptap de
`src/components/admin/tools/rich-editor/`, y la subida de imagen reusa
`UploadImage` y `compressImage`.

### Servicios

`src/services/proeconomia/service.ts` (lecturas públicas y alta de suscriptor),
`src/services/newsletter/{service,subscribers}.ts`,
`src/services/newspaper-cover/service.ts`,
`src/services/economic-indicator/service.ts`.

El de boletines se partió en dos (`service.ts` 221 líneas + `subscribers.ts` 105)
para respetar el límite de 300.

### Archivos existentes tocados (solo inserciones)

| Archivo | Qué se le agregó |
|---|---|
| `navbar.tsx` | 5ª entrada en `newsListItems` + el icono |
| `navbarMenu.tsx` | entrada en `routeMap`, para el estado activo |
| `navBarMobile.tsx` | ítem en el grupo Novedades |
| `(home)/search/page.tsx` | el apartado en el buscador |
| `messages/es.json` · `messages/en.json` | claves del menú y bloque de página |
| `admin/layout/sidebar.tsx` | 4 ítems en el acordeón Novedades |

La ruta es `/proeconomia` en ambos idiomas y **no** se registró en
`src/i18n/routing.ts`: el navbar usa `Link` de `next/link` plano y un pathname
localizado daría 404. Es el mismo motivo por el que `/tv` tampoco está ahí.

### Verificación hecha

- `npx tsc --noEmit` — exit 0

`npm run build` **no corre en WSL**: falta el binario Linux de `lightningcss`
porque `node_modules` se instaló desde Windows.

### Pendiente

- Revisar la página en el navegador, en es y en, y en móvil.
- El modal del boletín no tiene campo de portada: la API no define subida de
  imagen aunque el modelo tiene `cover`.
- La columna "Turismo" no existe en el bloque de tres columnas (la maqueta solo
  muestra Exportación/Inversión/Finanzas); sí aparece como filtro.

### Defecto detectado, NO tocado

`src/components/admin/news/edit.tsx:177-184` hace `setImages([])` al montar y pisa
el `setImages(news.images)` de la línea 89. Editar una noticia envía
`images: "[]"` y borra las imágenes relacionadas. Es código existente: queda
reportado, sin tocar.
