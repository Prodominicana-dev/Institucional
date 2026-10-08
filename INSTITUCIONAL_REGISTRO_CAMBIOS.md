# Institucional — Registro de cambios

## 2026-10-08 — Noticias Pro: enlace en la noticia y sección en las portadas

El equipo reportó que "las noticias no suben". La causa real tenía dos partes:
la tarjeta **Noticias** del panel de Noticias Pro abría `/admin/newsletter`,
que es el módulo de **correo**, y en producción faltaban las tablas del
apartado (ver nota al final).

- **Enlace de la noticia.** `dialog.tsx` y `edit.tsx` ganan un campo opcional
  en el primer paso. Viaja dentro de `metadata`, que la API devuelve tal cual
  (`news.service.ts` hace `...filteredNews`), así que **no hizo falta tocar la
  API ni la base de datos**.
- **La página usa ese enlace.** `enlace.ts` decide a dónde lleva cada noticia:
  al enlace si lo hay, y si no al detalle de siempre. Lo usan `NewsCards`,
  `RecentNewsThumbs`, `ColumnedNews` y `HeroSection`. Los externos abren en
  pestaña nueva con `rel="noopener noreferrer"`.
- **La tarjeta "Noticias" apunta a `/admin/news`**, que es donde se redactan
  las noticias del portal. El boletín por correo pasa a su propia tarjeta,
  rotulada como lo que es. Era la raíz de la confusión.
- **Sección en las portadas diarias.** `NewspaperCover` recibe la columna
  `section` y el formulario un desplegable con las cuatro secciones. Una
  portada sin sección sale en todas, que es como están las ya cargadas.
- **Una sola definición de las secciones**, en `proeconomia/secciones.ts`. La
  usan la barra pública, el desplegable de portadas y el filtrado.

Verificado: `tsc --noEmit` 0 en el front, `nest build` 0 en la API.

⚠️ **Antes de desplegar** hay que correr en producción `proeconomia.sql`,
`proeconomia_vigencia.sql` y el nuevo `proeconomia_seccion_portadas.sql`. Hoy
la base de producción no tiene ninguna de las tablas del apartado: `Newsletter`
da `P2021`, `NewspaperCover` y `EconomicIndicator` no existen y `News.featured`
tampoco, así que portadas, indicadores y la noticia destacada responden 500.

⚠️ La sección **Finanzas** sale vacía hasta que se cree esa categoría de
noticias. Exportación e Inversión ya existen, e Internacionales se cubre con
"Misión internacional" porque el filtro busca "internacional" dentro del
nombre.

- **Portada rota al comprimir (defecto previo, corregido).** `compressImage`
  renombra el archivo a `.jpg`, pero `cover` guardaba el nombre original: una
  portada subida en `.png` o `.webp` que se comprimiera quedaba apuntando a un
  archivo inexistente. Ahora el nombre sale del archivo que de verdad se sube,
  y al editar sin imagen nueva se conserva el que ya tenía. En crear y en
  editar. **Las noticias ya guardadas con el nombre equivocado siguen rotas**:
  hay que volver a subirles la portada.

⚠️ Hallazgo del 8-oct: en producción **falla cualquier lectura de `News`**
(`/apiv2/es/news` y `/apiv2/news/c/all` devuelven el error del catch), porque el
código desplegado espera `News.featured` y la columna no existe. El portal no
está sirviendo noticias en ninguna página. Lo arregla la primera línea de
`proeconomia.sql`.

## 2026-10-07 (tarde) — Noticias Pro: ruta propia y cabecera sin navbar

Segunda tanda de correcciones, tras la revisión del cliente ya desplegada.

- **Ruta `/proeconomia` → `/noticias-pro`.** La página se movió al grupo nuevo
  `src/app/[locale]/(noticias-pro)/`, siguiendo el patrón de `(mujer-exporta)`.
  `next.config.js` recibe tres redirecciones permanentes (`/proeconomia`,
  `/es/proeconomia`, `/en/proeconomia`), porque la dirección vieja ya estuvo
  publicada. Verificado: 308 a la nueva.
- **Sin navbar institucional.** El grupo trae su propio `layout.tsx`: solo
  `QueryClientProvider`, la página, accesibilidad y el pie. La cabecera de la
  sección es la única barra de navegación, como en la maqueta.
- **El rótulo pasa a NOTICIAS PRO** (en inglés, PRO NEWS), en el menú y en la
  cabecera de la página. Se retiró "PROECONOMÍA / Radar Económico" y la clave
  `brandTagline`.
- **Turismo fuera.** Las secciones quedan Exportación · Inversión ·
  Internacionales · Finanzas.

Verificado con los dos servidores en local: `/es/noticias-pro` da 200, el rótulo y
la sección Internacionales salen en el marcado, Turismo no, y del navbar no queda
rastro (lo que aparece de "Servicios" y "Transparencia" es el pie).
`npx tsc --noEmit` sin errores.

⚠️ Al mover la ruta, `.next/types/validator.ts` quedó apuntando a la carpeta vieja
y `tsc` falló con `TS2307`. Se arregla borrando `.next`.

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
