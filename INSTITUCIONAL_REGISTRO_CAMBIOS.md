# Institucional — Registro de cambios

## 2026-10-20 — Noticias Pro: logo del cliente en la cabecera, la pestaña y al compartir

**La cabecera pinta el logo, no el texto.** `CategoryBar.tsx` (lista) y
`CabeceraDetalle.tsx` (detalle) rotulaban la marca con el texto `brandName` y
una barrita roja a la izquierda. Ahora muestran el logo que entregó el cliente,
`/svg/noticias-pro-logo.svg`, a 32 px de alto en móvil y 40 px en escritorio;
el texto sigue vivo como texto alternativo de la imagen, así que un lector de
pantalla y el buscador leen lo mismo que antes. La barrita roja se retira
porque el propio logo ya trae el rojo.

**El logo se sacó del PDF original**, vectorial y de dos páginas (color y
blanco), con `pdftocairo`. Quedan en el repositorio:
`public/svg/noticias-pro-logo.svg`, `public/svg/noticias-pro-logo-blanco.svg`,
`public/images/noticias-pro/logo-correo-blanco.png` (440 px, para el correo, que
no admite SVG), `public/images/noticias-pro/icono.png` y `icono-32.png` (el
isotipo recortado, para la pestaña) y `public/images/noticias-pro/og.png`
(1200 × 630, para compartir).

**Icono propio de la pestaña en `/noticias-pro`.** El grupo `(noticias-pro)`
tenía el layout entero marcado como cliente, y de un componente de cliente no
se pueden exportar metadatos. Se parte en dos: `layout.tsx` queda en servidor y
declara los metadatos, y `shell.tsx` se lleva el proveedor de react-query y el
pie. No cambia nada de lo que se pinta.

**Los iconos del sitio pasan a la API de metadatos.** En `[locale]/layout.tsx`
los dos `<link rel="icon">` estaban escritos a mano dentro de `<head>`, y lo
escrito a mano no lo puede sustituir una ruta hija: en `/noticias-pro` salían
los dos iconos institucionales **más** el de Noticias Pro. Ahora el layout raíz
los declara en `metadata.icons` y la ruta de Noticias Pro los sustituye por el
suyo. Las demás páginas quedan igual: se comprobó en el HTML pintado que `/`
sigue sirviendo `favicon-32x32.png` y `favicon-16x16.png`.

**Imagen al compartir.** Se añade `metadataBase` en el layout raíz y la imagen
se declara en el layout de Noticias Pro. No se usa el archivo de convención
`opengraph-image.png`: para esos archivos Next ignora `metadataBase` y arma la
dirección con el origen del servidor, que fuera de Vercel es `localhost`, y el
enlace compartido no cargaría la imagen. Comprobado en el HTML: `og:image` sale
como `https://prodominicana.gob.do/images/noticias-pro/og.png`.

Verificado: `tsc --noEmit` sin errores y las dos cabeceras pintadas en el
navegador contra los datos de producción.

## 2026-10-20 — Noticias Pro: las tarjetas muestran todas las noticias y el carrusel avanza solo

**Las tarjetas ya no empiezan después del carrusel.** El reparto era
`filteredNews.slice(RECIENTES, RECIENTES + TARJETAS)`: las 6 noticias que se
llevaba Noticias Recientes se descontaban de la rejilla de abajo. Con 10
noticias publicadas en el portal, abajo solo quedaban 4 tarjetas y el tope de 9
no se rozaba nunca, así que la página aparentaba tener menos contenido del que
hay. Ahora las tarjetas arrancan también por la primera
(`filteredNews.slice(0, TARJETAS)`): las 6 del carrusel se repiten abajo y se
ven todas las noticias vivas. `TARJETAS` pasa de 9 a 15, que es el total que la
página ya mostraba antes de "Ver más" sumando carrusel y rejilla, y la condición
del botón pasa de `> RECIENTES + TARJETAS` a `> TARJETAS` para que ninguna
noticia se quede escondida sin botón que la saque.

**Noticias Recientes avanza solo cada 5 segundos.** Se añade
`embla-carousel-autoplay` con `loop: true`, `stopOnMouseEnter` y
`stopOnInteraction`, igual que la noticia destacada y las portadas diarias: se
detiene mientras la persona tiene el ratón encima y no se reanuda si usa las
flechas, para no mover un titular que se está leyendo. El 16 de octubre se dejó
a propósito sin avance automático; se cambia a petición suya.

Comprobado pintado contra los datos de producción: 10 noticias publicadas, 10
tarjetas abajo y el carrusel desplazado solo a los 14 segundos. `tsc --noEmit`
sin errores.

**Nota sobre los datos, no es código.** En producción hay 27 noticias con
sección: 10 publicadas y 17 deshabilitadas desde el panel (los días 14, 15 y 16
de octubre). Las tarjetas salen de las publicadas, así que el número que se ve
depende de cuántas queden habilitadas. Conviene saber además que `disable()` y
`enable()` de la API escriben solo `status` y no tocan `updated_At` ni
`updated_By`, de modo que no queda constancia de quién deshabilitó una noticia
ni cuándo.

## 2026-10-16 — Noticias Pro: recientes en carrusel, nueve tarjetas, Turismo y un panel más corto

**Noticias Recientes pasa a carrusel.** `RecentNewsThumbs.tsx` monta Embla con
tres miniaturas por vista en pantalla grande, dos en tableta y una en móvil, y
recibe las **6** noticias más recientes en vez de 3. No lleva avance automático
a propósito: son titulares para leer, no un escaparate, así que solo se mueve si
la persona lo mueve. Las flechas van en la cabecera, a la derecha del título, y
no superpuestas sobre las miniaturas, donde tapaban la portada de la primera y
la última. Con tres noticias o menos no aparecen ni flechas ni puntos.

**Debajo se pintan 9 tarjetas antes del botón "Ver más"**, no 3. Las dos
cantidades viven en `RECIENTES` y `TARJETAS`, al principio de
`(noticias-pro)/noticias-pro/page.tsx`: el carrusel toma las 6 primeras y las
tarjetas las 9 siguientes, así que la primera pantalla muestra 15 noticias y el
botón solo sale si hay más.

**"Al Día con ProDominicana" baja debajo de los Indicadores Económicos.** Es un
intercambio de orden dentro del mismo contenedor; el Tablero de Datos y el
formulario del boletín siguen después, como estaban.

**"Al Día con ProDominicana" también sale de la página.** Primero se bajó debajo
de los Indicadores Económicos y después él decidió quitarla del todo, así que se
borra `ScheduleCarousel.tsx` y con él las claves `scheduleTitle` y
`scheduleSubtitle` de los dos idiomas. La agenda sigue viva en el portal
institucional (`(home)/schedule`), que usa el mismo `useAllSchedule`: ahí no se
tocó nada.

**Las columnas por sección salen de la página.** `ColumnedNews.tsx` se borra, y
con él las claves `colExport`, `colInvest` y `colFinance` de `messages/es.json` y
`messages/en.json`, que ya no las usa nadie. Desaparece también el cálculo de
`newsColumnas`, que servía solo para no repetir arriba y abajo las mismas
noticias.

**Turismo vuelve como quinta sección de Noticias Pro.** Una entrada más en
`secciones.ts` y la clave `categories.turismo` en los dos idiomas. Como es la
definición única, sale a la vez en la barra de la página, en el filtro del panel
de Noticias Pro y en el desplegable de las portadas. Con seis pestañas la barra
ya no cabía: `CategoryBar.tsx` baja el texto a 13 píxeles y el relleno a `px-2.5`
en pantalla grande, y el buscador deja de estirarse (`lg:w-56` y
`flex-shrink-0`). Comprobado pintado a 1366 y a 1600 píxeles de ancho: las seis
entran enteras.

**En el panel, la categoría se va con los demás campos.** En `CamposPro.tsx` el
bloque "Categoría del portal" entra en la misma rejilla que Fecha y Sección, que
pasa a tres columnas en pantalla grande. Su texto de ayuda decía "en qué columna
de Noticias Pro aparece" y ahora dice "en qué sección", porque las columnas ya no
existen.

**Un solo campo: la sección. La categoría del portal desaparece del panel de
Noticias Pro.** En Noticias Pro la categoría no decidía nada —solo rotulaba la
etiqueta roja—, pero `News.categoryId` es obligatorio en la base, así que sigue
guardándose: ahora todas las noticias de Noticias Pro llevan siempre la misma,
**«Noticias Pro» / «Pro News»**, definida una sola vez en
`categoriaPro.ts` (`CATEGORIA_PRO` e `idCategoriaPro`). Al **crear** se asigna
sola; al **editar** se conserva la que la noticia ya tenía, para que una noticia
devuelta al portal (guardada sin sección) no se lleve la categoría de Noticias
Pro consigo. Si esa categoría no existe en el portal, el formulario lo dice en
rojo y no deja publicar.

⛔ **Antes de desplegar hay que crear esa categoría en la base de producción**,
o el panel de Noticias Pro no dejará publicar nada:
`insert into "NewsCategory" (id,"nameEs","nameEn") values (gen_random_uuid(),'Noticias Pro','Pro News');`

**La etiqueta roja pasa a rotular la sección**, no la categoría, que es lo único
que ahora se elige: tarjetas (`NewsCards.tsx`), miniaturas
(`RecentNewsThumbs.tsx`) y destacada (`FeaturedCarousel.tsx`) usan la nueva
`rotuloSeccion()` de `secciones.ts`, y el detalle (`ArticuloPro.tsx`) pierde el
texto gris de categoría, que repetía lo que ya decía la etiqueta roja. Con eso
`categoria.ts` y su `nombreCategoria` se quedan sin usar y se borran. En el
panel, la tarjeta de cada noticia deja de mostrar la categoría (diría lo mismo en
todas) y la vista previa rotula la sección.

**Fuera el campo "Breve descripción de la noticia"**, en crear y en editar y en
los dos idiomas. `PasosIdiomaPro.tsx` pierde el editor y sus props, y
`useEditoresPro.ts` baja de cuatro editores a dos. Al crear se envía
`description: ""`. **Al editar se reenvía la descripción que la noticia ya tenía**
(`news?.es.description`), para que una noticia vieja no pierda su entradilla por
pasar por el formulario; la vista previa muestra lo mismo que se va a guardar. El
campo es opcional en la API (`description?: string` en `news.dto.ts`), así que no
hizo falta tocarla.

ℹ️ Las Portadas Diarias ya pedían 8 desde el 15 de octubre
(`useNewspaperCovers(8)` en `HeroSection.tsx`): no hizo falta cambiar nada.

Verificado: `npx tsc --noEmit` sin errores, la página pintada en el navegador en
"Todos" y filtrada por Turismo, y el DOM servido contando 6 miniaturas en el
carrusel, 9 tarjetas y el botón "Ver más noticias".

## 2026-10-15 — Noticias Pro: seccion Economicas, portada del periodico mas grande y carrusel de destacadas

**La seccion Finanzas pasa a llamarse Economicas.** Cambia solo el rotulo:
`categories.finanzas` y `colFinance` en `messages/es.json` ("Economicas") y en
`messages/en.json` ("Economic"), mas el `nombre` de `secciones.ts`, que es lo
que ve la administradora en el desplegable de las portadas. La clave sigue
siendo `finanzas` a proposito, porque es el valor ya guardado en el campo
`seccion` de las noticias y en `NewspaperCover.section`; cambiarla dejaria fuera
de la seccion a la noticia de produccion que ya la lleva. Queda anotado en el
comentario de `secciones.ts` para que nadie la "corrija" despues.

**La portada del periodico acaba a la misma altura que la noticia destacada.**
En `HeroSection.tsx` la rejilla pasa a `lg:h-[500px]` y la columna de portadas
de 260 a 320 pixeles de ancho; la destacada deja su altura fija y toma
`lg:h-full`. `CoversCarousel.tsx` se vuelve una columna flexible: el area de
diapositivas crece con `lg:flex-1`, la imagen pasa a `lg:h-full` y el rotulo del
medio queda abajo, asi que las dos piezas del encabezado terminan a la misma
altura. En movil no cambia nada: todos los ajustes van con el prefijo `lg:`, y
la imagen conserva su proporcion porque `h-full` sobre un contenedor de altura
automatica no aplica.

**El encabezado admite hasta cinco noticias destacadas y las pasa en carrusel.**
Antes solo podia haber una. `FeaturedCarousel.tsx` (nuevo) las pasa con Embla,
avance automatico cada 6 segundos que se detiene al pasar el raton y no se
reanuda si el lector usa las flechas o los puntos, igual que el de portadas. Los
puntos van superpuestos sobre la imagen para no romper la altura del bloque. Con
una sola destacada se ve como antes: ni flechas ni puntos.

`HeroSection` ya recibe un arreglo; si delante quedara un build viejo de la API
que responde con una sola noticia, la envuelve y la pinta igual.

En el panel, `FeaturedPicker.tsx` lista las destacadas numeradas, muestra el
contador "(N de 5)" y deshabilita el boton Destacar al llegar al tope, con el
aviso de que hay que retirar una antes. El tope vive en `TOPE_DESTACADAS` de
`services/news-featured/service.ts`, que ademas traduce el 409 de la API a un
mensaje claro. La tarjeta del panel y el titulo de la pantalla pasan a plural.

Verificado en local con la base de desarrollo: `npx tsc --noEmit` sin errores, y
la pagina pintada en el navegador en es y en en, con cinco destacadas, tres
portadas y la seccion Economicas en la barra.
## 2026-10-14 — Portadas Diarias dejan de dar 500, y el orden y la repeticion de Noticias Pro

**Subir una portada de periodico fallaba siempre con 500.** El modal mandaba la
fecha tal como la entrega el `input type="date"`, es decir `2026-10-14`, y el
campo `date` de `NewspaperCover` es `DateTime`. Prisma 5.22 rechaza ese valor
con `Invalid value for argument 'date': premature end of input. Expected
ISO-8601 DateTime.`, el `catch` del controlador lo convertia en 500 y el panel
solo mostraba "Ha ocurrido un error al crear la portada". Reproducido contra la
base local antes de tocar nada: con la cadena de 10 caracteres falla, con un ISO
completo crea la fila.

`components/admin/newspaper-covers/CoverModal.tsx` ahora manda
`new Date(`${date}T12:00:00`).toISOString()`. Es mediodia local a proposito: a
medianoche el paso a UTC (RD esta en -4) adelantaria la portada un dia en la
lista y en el `substring(0, 10)` que rellena el formulario de edicion. Arregla
tambien la edicion, porque sale del mismo `FormData`. La noticia normal nunca
tuvo el fallo: `admin/news/dialog.tsx` ya enviaba `date.toISOString()`.

**El tablero de datos baja debajo de los indicadores.** En
`(noticias-pro)/noticias-pro/page.tsx` el par `DataDashboard` /
`DataDashboardMobile` estaba entre las tarjetas y "Al Dia con ProDominicana".
Ahora el contenedor que lleva "Al Dia", las columnas y los Indicadores
Economicos se cierra antes, el tablero va a continuacion a todo lo ancho (como
estaba, fuera del `max-w-7xl`) y el formulario del boletin queda en su propio
contenedor al final.

**El enlace de la noticia ahora si llega al periodico.** El campo "Enlace de la
noticia" del panel es un `Input` de texto sin validacion: si alguien escribia
`listindiario.com/...` sin `https://`, el navegador lo tomaba como ruta del
propio portal y el lector acababa en
`prodominicana.gob.do/noticias-pro/listindiario.com/...`. `enlace.ts` gana
`urlExterna()`, unica definicion: recorta, devuelve `undefined` si queda vacio y
antepone `https://` cuando falta el esquema. `enlaceNoticia` la usa, asi que
quedan cubiertas las cinco listas que ya pasaban por ella (destacada, Noticias
Recientes, tarjetas y las dos plazas de las columnas). Un enlace de solo
espacios ya no cuenta como externo: lleva al detalle, como corresponde.

**La portada sin enlace ya no era un enlace falso.** `CoversCarousel` pintaba
`<a href={cover.link ?? "#"} target="_blank">` siempre, asi que una portada
cargada sin enlace abria una pestana nueva en blanco. Ahora pasa por
`urlExterna` y, sin enlace, el contenedor es un `div`. Queda una limitacion sin
tocar: el `PATCH` de portadas no permite borrar un enlace ya guardado, porque el
modal no manda el campo cuando esta vacio y Prisma ignora `undefined`.

**Las columnas de abajo ya no repiten lo de arriba.** `ColumnedNews` recibia la
lista completa de noticias con seccion, asi que las tres de Noticias Recientes y
las tres tarjetas volvian a salir mas abajo. Ahora recibe `newsColumnas`, la
lista sin los seis ids que se pintan arriba sin tocar "Ver mas". Consecuencia
asumida: con pocas noticias por seccion, una columna puede quedarse sin su nota
principal y entonces no se pinta, porque `NewsCol` devuelve `null` sin `main`.
La noticia destacada de la portada se sigue permitiendo repetida: sale ahi
porque alguien la eligio a mano.

## 2026-10-13 — Detalle propio de Noticias Pro: el lector ya no sale del apartado

Las listas estaban separadas, pero el detalle no. Una noticia de Noticias Pro
sin enlace externo llevaba a `/news/{id}`, la pantalla de detalle del portal,
con el navbar y el pie institucionales: el lector salia del apartado por el
unico camino que quedaba abierto.

Ahora Noticias Pro tiene su propio detalle en `/noticias-pro/{id}`, dentro del
grupo `(noticias-pro)`, asi que hereda su layout y no monta el navbar
institucional. Cinco archivos nuevos, ninguna pieza de `(home)/news/[id]`
reusada:

- `app/[locale]/(noticias-pro)/noticias-pro/[id]/page.tsx`: solo compone.
- `components/proeconomia/detalle/CabeceraDetalle.tsx`: la marca y las cuatro
  secciones de `CategoryBar`, pero como enlaces a la lista y no como botones de
  filtro. Desde el detalle no hay nada que filtrar.
- `components/proeconomia/detalle/ArticuloPro.tsx`: seccion en el rojo
  `#C8102E`, categoria, fecha, titular, entradilla, portada y cuerpo. El cuerpo
  reusa `components/news/text.tsx`, que solo aplica estilos al HTML del editor.
- `components/proeconomia/detalle/CompartirPro.tsx`.
- `components/proeconomia/detalle/AnteriorSiguientePro.tsx`.

**El cruce queda cortado en los dos sentidos.** Una noticia sin seccion abierta
en `/noticias-pro/{id}` no se pinta: sale el aviso `notInPro` y el boton de
volver a la lista. La API ya hacia su parte, porque `getPrevNextNews` no cruza
de apartado.

Dos cosas que decidio el codigo existente, no el gusto:

- Los iconos de FontAwesome se importan como objeto dentro de `CompartirPro`.
  `library.add()` solo se ejecuta en `(home)/layout.tsx`, asi que las
  referencias por texto (`["fab","facebook-f"]`) saldrian vacias en este grupo
  de rutas.
- `enlace.ts` gana `prefijoIdioma(locale)` y `enlaceNoticia` pasa a recibir el
  idioma. `localePrefix` es `as-needed` y `/noticias-pro` no esta en el mapa de
  `pathnames`, asi que el ingles necesita el prefijo `/en` a mano. De paso se
  arregla un defecto que ya estaba: desde `/en/noticias-pro` las tarjetas
  llevaban a la version en espanol. Las cuatro llamadas actualizadas:
  `ColumnedNews.tsx` (dos, y `NewsCol` recibe ahora el idioma), `NewsCards.tsx`,
  `RecentNewsThumbs.tsx` y `HeroSection.tsx`.

La cabecera del detalle vuelve a la lista con `?s=<seccion>`, y la lista lo lee
para no perder la seccion que el lector venia viendo. Un valor desconocido no
filtra nada. Claves nuevas en `messages/{es,en}.json`: `backToList`, `prev`,
`next`, `share` y `notInPro`.

Verificado: `tsc --noEmit` 0 y, contra la app corriendo con 6 noticias de prueba
(3 con seccion, 3 sin), `/noticias-pro/{id}` en 200 en es y en, el id sin
seccion devolviendo el aviso, y `?s=inversión` en 200. Los 404 de
`/apiv2/news/images/...` del registro son de los datos de prueba, que se
sembraron con un nombre de portada sin archivo.

## 2026-10-12 — Fuera el indicador de Flete maritimo

Se quita por decision suya. No tenia fuente publica gratuita (FBX y Drewry son
de pago), asi que era el unico de los cuatro que habia que teclear a mano cada
semana, y mientras nadie lo hacia mostraba "No disponible".

- `IndicatorsRow.tsx`: la fila pasa de `lg:grid-cols-4` a `lg:grid-cols-3`, para
  que no quede un hueco. Fuera el `TruckIcon`, que era el suyo y quedaba sin uso.
- `services/economic-indicator/service.ts`: el tipo `key` ya no admite
  `"freight"`.

**La fila de la base se queda**, por decision suya, con su historico. Como el
componente pinta lo que la API devuelve, se filtra aqui: `NO_SE_PUBLICAN` en
`IndicatorsRow.tsx`. El panel la sigue mostrando, asi que si algun dia vuelve a
haber fuente basta quitarla de esa lista.

## 2026-10-12 — Noticias Pro sale del menu Novedades

El enlace a Noticias Pro ya no se pinta en el desplegable **Novedades**, ni en
escritorio (`navbar.tsx`) ni en movil (`navBarMobile.tsx`). **La ruta sigue
viva**: `/noticias-pro` responde en es y en, con sus redirecciones y su layout
propio sin tocar.

Se quito tambien el `import` de `ChartBarIcon`, que quedaba sin uso al borrar la
entrada.

Siguen en pie, porque no son del menu: la entrada de `/noticias-pro` en el
`routeMap` de `navbarMenu.tsx` (traduce el pathname actual) y las claves
`news.menuList.proeconomia` de `messages/{es,en}.json`, que usa el buscador.

Verificado: `tsc --noEmit` 0 y, contra la app corriendo, `/noticias-pro` en 200
(es y en) con la portada `/es` sin ninguna mencion a esa ruta.

## 2026-10-12 — Noticias Pro con pantallas propias, separadas de Noticias

La administradora editaba una noticia por otra: el panel de Noticias Pro no
tenia pantalla de noticias, su tarjeta llevaba a `/admin/news`, y alli salian
las 192 noticias del portal. En el mismo formulario convivian **Categoria** y
**Etiquetas**, ambas con "Exportacion", asi que elegir la etiqueta equivocada
saca la noticia de Noticias sin avisar.

**Camino propio** en `/admin/proeconomia/noticias`, con lista, tarjeta, alta y
edicion propias en `src/components/admin/proeconomia/noticias/`. No se reusa
ninguna pieza de `admin/news/`; si se reusan los atomos de `NewsModal/`
(Header, Stepper, UploadImage, CategorySelect, DatePicker, Footer,
PreviewModal), que son del panel entero.

- **La seccion es obligatoria al crear.** De esta pantalla no puede salir una
  noticia sin seccion, que es una noticia que no aparece en ningun lado.
- **Al editar si se puede dejar vacia**: es la unica forma de devolver al portal
  una noticia etiquetada por error. Avisa en pantalla y pide confirmacion.
- **Las dos listas ya no se mezclan.** `/admin/proeconomia/noticias` muestra
  solo las que tienen seccion; `/admin/news` solo las que no la tienen.
- **Fuera el campo Etiquetas del formulario institucional** (`dialog.tsx` y
  `edit.tsx`). Desde Noticias ya no se puede etiquetar nada. En la edicion la
  seccion guardada se conserva y se reenvia, para no borrarla si se llega por
  otra via.
- Botonera con las cuatro secciones y su conteo, insignia con la seccion en cada
  tarjeta y marca "Oculta" cuando la noticia no esta publicada.

Se borro `BackLinkSiViene.tsx`: existia para el enlace de vuelta desde
`/admin/news`, que ya no se usa porque el panel no manda a nadie alli.

Verificado: `tsc --noEmit` 0. ⚠️ Nadie lo ha probado contra la app corriendo:
este clon no tiene `.env` ni base de datos.

## 2026-10-08 (noche) — Retoques del panel de Noticias Pro

- **Volver a Noticias Pro desde la pantalla de Noticias.** La tarjeta del panel
  lleva ahora `?from=proeconomia` y el enlace de vuelta solo se pinta con ese
  parametro: a `/admin/news` tambien se entra por el menu lateral, y ahi ese
  enlace confundiria. Se lee con `window.location` a proposito, porque
  `useSearchParams` obliga a envolver la pagina en Suspense o falla el build.
- **Fuera la tarjeta "Boletin por correo".** El modulo sigue existiendo en
  `/admin/newsletter`; solo deja de anunciarse. Quedan cinco tarjetas.

ℹ️ Suscriptores se mantiene porque la pagina publica sigue recogiendo correos.
Si no se van a enviar boletines, conviene decidir que se hace con esa recogida.

## 2026-10-08 (noche) — Separación completa entre Noticias y Noticias Pro

Decisión del cliente: *"lo de Noticias Pro va solo en Noticias Pro y lo de
Noticias solo va en Noticias"*.

- **Etiquetas como desplegable.** En el formulario de noticias el campo pasa a
  llamarse "Etiquetas", con las cuatro secciones. En el del boletín, "Etiquetas"
  deja de ser texto libre y usa el mismo desplegable (se guarda como `tags`,
  que la API ya define como lista).
- **`/noticias` oculta lo etiquetado para Noticias Pro**, igual que Noticias Pro
  ya ocultaba el resto.
- **La portada del portal** pasa de `useLastTwoNews` a la lista completa y corta
  las dos primeras sin etiqueta: pedir solo dos a la API y filtrar después podía
  dejar una o ninguna.
- **El selector de noticia destacada** solo ofrece las etiquetadas, que son las
  únicas que pueden encabezar esa página.

ℹ️ Sin tocar: la navegación anterior/siguiente del detalle de una noticia
(`/apiv2/:lang/news/prnxt/:id`) la resuelve la API y puede saltar a una noticia
de Noticias Pro. Hace falta cambio de API para cerrarlo.

Verificado: `tsc --noEmit` 0.

## 2026-10-08 (tarde) — Noticias Pro deja de mostrar todas las noticias del portal

Hasta ahora `/noticias-pro` servía la lista general de noticias (191 en
producción) y solo filtraba al pulsar una sección, así que en "Todos" salía
todo el portal. No era lo que se quería.

- **Campo propio "Sección de Noticias Pro"** en crear y editar noticia, vacío
  por defecto. Se guarda en `metadata` junto al título y el enlace, así que
  **no hubo cambio de esquema ni SQL**.
- **La página solo muestra lo marcado.** `page.tsx` filtra por `seccion`, y el
  filtro de la barra compara contra ese campo en vez de adivinar por el nombre
  de la categoría. `ColumnedNews` hace lo mismo con sus tres columnas.
- La categoría de la noticia queda para lo que siempre fue: el portal
  institucional. Las dos cosas dejan de estar acopladas.

⚠️ **Noticias Pro sale vacío hasta que se marquen noticias.** Es el efecto
buscado: nada aparece ahí por accidente.

Verificado: `tsc --noEmit` 0.

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
