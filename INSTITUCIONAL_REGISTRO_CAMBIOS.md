# Institucional — Registro de cambios

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
