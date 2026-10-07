# Manual de uso: Noticias y Eventos

Este manual explica cómo cargar, corregir, ocultar y eliminar **noticias** y **eventos** desde el panel administrativo del portal institucional. Está dirigido al personal de comunicaciones que publica contenido.

Los nombres de campos y botones que aparecen aquí son los que están hoy en pantalla, con la misma redacción. Si algún rótulo no coincide con lo que usted ve, avise antes de continuar: significa que el panel cambió y este manual quedó atrasado.

Dos cosas conviene saber desde ahora:

- **Toda noticia exige el contenido en inglés.** El panel no guarda la noticia si el título o el cuerpo en inglés están vacíos. Lo mismo aplica a los eventos y a las categorías de noticias.
- **Ocultar y eliminar no son lo mismo.** Ocultar se deshace en dos clics. Eliminar no se deshace.

---

## 1. Antes de empezar

### 1.1 Cómo entrar al panel

1. Entre a `prodominicana.gob.do/admin` e inicie sesión con su cuenta institucional.
2. En el menú lateral izquierdo abra **Novedades**.
3. Pulse la pantalla que necesite:

| Pantalla del menú | Dirección | Para qué sirve |
|---|---|---|
| **Noticias** | `/admin/news` | Crear, editar, ocultar y eliminar noticias |
| **Categoría de Noticias** | `/admin/news/categories` | Crear y editar las categorías que se asignan a las noticias |
| **Eventos** | `/admin/events` | Crear, editar, ocultar y eliminar eventos |
| **Categoría de Eventos** | `/admin/events/categories` | Crear y editar las categorías de eventos y el correo que recibe las inscripciones |

Si no inició sesión verá la pantalla **Acceso restringido** con el botón **Iniciar sesión**. Si inició sesión pero su usuario no tiene el permiso, verá también **Acceso restringido**, con el texto que le pide contactar al administrador.

### 1.2 Qué permiso hace falta

| Pantalla | Permiso que valida el panel |
|---|---|
| Noticias | `create:news` |
| Eventos | `create:news` |
| Categoría de Noticias | `create:transparency` |
| Categoría de Eventos | `create:transparency` |

Los permisos de las dos pantallas de categorías son distintos del de Noticias y Eventos. Es posible que usted pueda cargar noticias y, aun así, no pueda abrir la pantalla de categorías. Si le pasa eso, solicite el permiso `create:transparency` a la Dirección de Tecnología.

### 1.3 Qué tener listo antes de sentarse a cargar

Prepare esto en un documento aparte y cargue después. El formulario no guarda borradores: si cierra la ventana a medio camino, pierde lo escrito.

| Para una noticia | Para un evento |
|---|---|
| Imagen de portada, JPG o PNG, horizontal | Imagen del evento, JPG o PNG, horizontal (opcional) |
| Título en español | Título en español |
| Título en inglés | Título en inglés |
| Cuerpo de la noticia en español | Descripción del evento en español |
| Cuerpo de la noticia en inglés | Descripción del evento en inglés |
| Breve descripción en español e inglés (opcional) | Fecha de inicio y fecha final |
| Fecha de la noticia | Dirección del lugar |
| Categoría, ya creada en el panel | Coordenadas de Google Maps, separadas por coma |
| | Categoría del evento, ya creada en el panel |
| | Enlace del formulario de inscripción (opcional) |

Si la categoría que necesita no existe todavía, créela primero (apartado 4 para noticias, apartado 6.4 para eventos). El selector de categoría del formulario solo muestra las que ya están creadas y no permite agregar una desde ahí.

---

## 2. Agregar una noticia

1. Entre a **Novedades → Noticias**.
2. Pulse **Agregar**, arriba a la derecha.
3. Se abre la ventana **Nueva noticia**, con tres pasos: **Portada**, **Español**, **Inglés**. Abajo a la izquierda siempre dice en qué paso está: "Paso 1 de 3".

### 2.1 Paso 1: Portada

| Campo | Obligatorio | Detalle |
|---|---|---|
| **Fecha de la noticia** | No lo exige el formulario | Viene con la fecha del día. Pulse el recuadro y elija en el calendario. Admite desde el año 2000 hasta el año que viene |
| **Categoría** | Sí | Pulse **Selecciona una categoría...**, escriba en **Buscar categoría...** y elija de la lista |
| **Portada de la noticia** | Sí | Arrastre la imagen al recuadro o pulse **Seleccionar imagen** |

La zona de la imagen dice **Arrastra tu imagen aquí** y, debajo, **PNG, JPG o WEBP · Máximo 25.0 MB**. Cuando ya hay una imagen cargada aparecen dos botones sobre ella: **Cambiar** y **Eliminar**.

Debajo de la imagen aparece la casilla **Subir en resolución original (más lento)**. Déjela sin marcar. Sin marcar, el panel reduce la imagen a 1920 píxeles de ancho y la convierte a JPG antes de subirla, lo que acorta mucho la espera. Márquela solo si la imagen tiene un detalle fino que se pierde al comprimirla.

Avisos que puede ver en este paso:

- "La categoría es obligatoria."
- "La imagen es obligatoria."
- "La imagen supera el límite de 25.0 MB. Redúcela antes de subirla."

4. Pulse **Continuar**.

### 2.2 Paso 2: Español

| Campo | Obligatorio |
|---|---|
| **Título** | Sí |
| **Breve descripción de la noticia** | No |
| **Cuerpo de la noticia** | Sí |

La **Breve descripción** es el resumen corto que acompaña al título. Es opcional, pero conviene llenarla: es lo que se lee debajo del título en la noticia publicada. El recuadro se ve más bajo que el del cuerpo, aunque no tiene límite de caracteres.

Los dos recuadros de texto traen la misma barra de herramientas, agrupada por: **Fuente** (negrita, cursiva, subrayado, tachado, limpiar formato, resaltar), **Títulos** (H1 a H4), **Párrafo** (cita, línea separadora, lista con viñetas, lista numerada), **Enlace**, **Alinear** y **Tabla**. En **Tabla** están las opciones **Añadir tabla**, **Añadir columna antes**, **Añadir columna despues**, **Añadir fila antes**, **Añadir fila despues**, **Borrar columna**, **Borrar fila** y **Borrar tabla**.

Si pega texto desde Word, revise que no arrastre tipografías ni tamaños raros. El botón de limpiar formato, en el grupo **Fuente**, deja el texto plano.

Avisos de este paso: "El título es obligatorio." y "El cuerpo de la noticia es obligatorio."

5. Pulse **Continuar**.

### 2.3 Paso 3: Inglés

| Campo | Obligatorio |
|---|---|
| **Título en inglés** | Sí |
| **Breve descripción de la noticia en inglés** | No |
| **Cuerpo de la noticia en inglés** | Sí |

**Qué pasa si no llena el inglés.** Nada se guarda. Al pulsar **Publicar noticia** con el título o el cuerpo en inglés vacíos, el panel muestra "El título en inglés es obligatorio." o "El cuerpo de la noticia en inglés es obligatorio." y la noticia no se crea. No hay forma de publicar solo en español ni de dejar el inglés para después. Si la traducción todavía no está lista, no empiece a cargar la noticia.

6. Antes de guardar, pulse **Vista previa**, abajo a la izquierda. Se abre la noticia como se verá publicada: portada, fecha, categoría, título, descripción y cuerpo. Arriba a la derecha hay un selector **ES / EN** para revisar las dos versiones. El selector solo aparece cuando los dos títulos están escritos.
7. Pulse **Publicar noticia**.

### 2.4 Qué pasa al guardar

Mientras sube verá una barra de avance con tres mensajes, en este orden: "Optimizando la imagen...", "Subiendo... 45%" y "Procesando en el servidor, no cierres esta ventana...". El botón dice **Guardando...** y queda inhabilitado.

No cierre la ventana ni recargue la página en ese momento. Con una portada pesada la subida puede tardar varios minutos; el panel espera hasta cinco.

Al terminar aparece el aviso verde **Noticia creada / La noticia se ha creado correctamente** y la ventana se cierra. Si en cambio aparece el aviso rojo **Error / Ha ocurrido un error al crear la noticia**, la ventana **no** se cierra: lo que escribió sigue ahí y puede volver a pulsar **Publicar noticia**.

Después de guardar, busque la noticia en la lista y mire el botón del medio de la tarjeta. Si dice **Ocultar**, la noticia está visible en el portal. Si dice **Publicar**, está guardada pero no se ve, y hay que publicarla (apartado 3.3).

### 2.5 Si necesita cerrar la ventana a medio camino

Al pulsar fuera de la ventana, la tecla Escape o la X, el navegador pregunta: "¿Deseas cerrar sin guardar? Se perderá la información ingresada." Pulse **Cancelar** para seguir trabajando. Si confirma, se pierde todo lo escrito, incluida la imagen seleccionada.

---

## 3. Editar, ocultar y eliminar una noticia

En **Novedades → Noticias** cada noticia es una tarjeta con la portada, el título y el nombre de la categoría. La lista incluye tanto las publicadas como las ocultas.

Los cuatro botones de la parte baja de la tarjeta solo muestran su nombre cuando pasa el cursor por encima. De izquierda a derecha:

| Botón | Color | Qué hace |
|---|---|---|
| **Vista previa** | Gris | Abre la noticia como se ve publicada, en español y en inglés. No modifica nada |
| **Editar** | Azul | Abre el formulario con los datos cargados |
| **Ocultar** | Negro | Saca la noticia del portal. Aparece solo si la noticia está publicada |
| **Publicar** | Verde | Devuelve la noticia al portal. Aparece solo si la noticia está oculta |
| **Eliminar** | Rojo | Borra la noticia. No se deshace |

### 3.1 Editar

1. Pulse **Editar**. Se abre la ventana **Editar noticia**, con los mismos tres pasos.
2. Corrija lo que haga falta. Para cambiar la portada, arrastre otra imagen o pulse **Cambiar** sobre la imagen actual.
3. Pulse **Continuar** hasta el paso 3 y después **Guardar cambios**.

Dos advertencias sobre esta pantalla:

- Debe recorrer los tres pasos para guardar. El botón verde **Guardar cambios** solo existe en el paso 3, aunque usted solo haya cambiado la fecha en el paso 1.
- El botón **Eliminar** que aparece sobre la imagen **no deja la noticia sin portada**: descarta la imagen nueva que acaba de elegir y vuelve a mostrar la portada que ya tenía. Una noticia publicada no puede quedarse sin portada desde esta pantalla.

Al cerrar esta ventana, el navegador siempre pregunta "¿Deseas cerrar sin guardar los cambios?", aun cuando usted no haya tocado nada.

Al guardar aparece **Noticia actualizada / La noticia ha sido actualizada correctamente**.

### 3.2 Ocultar

1. Pulse **Ocultar** (botón negro).
2. El panel pregunta: **Ocultar Noticia / ¿Estás seguro que deseas ocultar esta noticia?**
3. Pulse **Ocultar** para confirmar o **Cancelar** para desistir.

La noticia desaparece del portal público pero sigue en el panel, con todos sus textos y su imagen. El botón del medio de la tarjeta pasa a decir **Publicar**.

Use **Ocultar** cuando: hay un dato equivocado y necesita tiempo para verificarlo, la noticia se publicó antes de lo acordado, o el contenido dejó de ser oportuno y prefiere no borrarlo.

### 3.3 Publicar una noticia oculta

1. Pulse **Publicar** (botón verde).
2. El panel pregunta: **Activar Noticia / ¿Estás seguro que deseas activar esta noticia? Será visible en la página de noticias.**
3. Pulse **Activar**.

### 3.4 Eliminar

1. Pulse **Eliminar** (botón rojo).
2. El panel pregunta: **Eliminar Noticia / ¿Estás seguro de que deseas eliminar esta noticia? Esta acción no se puede deshacer.**
3. Pulse **Eliminar** para confirmar o **Cancelar**.

La noticia se borra con su portada y sus dos versiones de texto. No hay papelera ni botón de deshacer, y el panel no guarda una copia. Si la dirección de esa noticia estaba compartida en redes o en un correo, ese enlace queda roto.

**Regla práctica:** ante la duda, oculte. Elimine solo cuando esté seguro de que el contenido no debe existir.

---

## 4. Categorías de noticias

Toda noticia tiene que llevar una categoría, así que la lista de categorías debe estar al día antes de cargar.

Entre a **Novedades → Categoría de Noticias**. Verá el listado con dos columnas, **Nombre** y **Acción**, de cinco en cinco. Puede cambiar a 10, 15 o 20 por página con el selector de la derecha, y moverse con **Anterior** y **Siguiente**.

### 4.1 Crear una categoría

1. Pulse **Agregar**.
2. Se abre **Crear categoría de noticias**, con dos pasos.
3. Paso 1: en **Nombre** escriba el nombre en español. Es obligatorio.
4. Pulse **Siguiente**.
5. Paso 2: en **Nombre en inglés** escriba el nombre en inglés. Es obligatorio.
6. Pulse **Guardar**.

Si ya existe una categoría con ese nombre, aparece el aviso rojo **Error creando la categoría / Existe una categoría con el mismo nombre. Por favor, cambia el nombre de la categoría o intenta de nuevo.**

### 4.2 Editar una categoría

1. Pulse el botón del lápiz en la fila de la categoría.
2. Se abre **Editar categoría de noticias**, con los dos nombres cargados.
3. Corrija y pulse **Siguiente**, luego **Guardar**.

El cambio de nombre se refleja en todas las noticias que tengan esa categoría, en el panel y en el portal. No hay que tocar las noticias una por una.

### 4.3 Por qué importa el nombre

El nombre de la categoría no es solo una etiqueta: el portal lo usa para decidir dónde sale la noticia.

- En el portal, la categoría se muestra encima del título de cada noticia. El visitante la lee.
- En la página **Radar Económico** (`prodominicana.gob.do/proeconomia`) hay tres columnas por tema. Una noticia entra en una columna solo si el **nombre en español** de su categoría contiene la palabra `exportación`, `inversión` o `finanzas`, con su tilde. "Exportación agrícola" entra en la columna de Exportación. "Comercio exterior" no entra en ninguna de las tres.
- En el panel, tanto la lista de categorías como el selector del formulario muestran siempre el **nombre en español**, incluso en el paso en inglés. El nombre en inglés solo se ve en el portal cuando el visitante cambia de idioma.

Por eso: nombres cortos, en singular, con tilde donde corresponda, y sin cambiarlos por gusto. Un cambio de nombre puede sacar una noticia de la columna donde estaba saliendo.

### 4.4 Eliminar una categoría: lea esto antes

1. Pulse el botón del zafacón en la fila de la categoría.
2. El panel pregunta: **Eliminar Categoría / ¿Estás seguro de que deseas eliminar esta categoría? Esta acción no se puede deshacer y eliminarás TODAS las noticias vinculadas a esta categoría.**

Eso es exactamente lo que ocurre: se borra la categoría **y todas las noticias que la tengan asignada**. No se reasignan a otra categoría. No quedan ocultas. Se borran.

Antes de eliminar una categoría, entre a **Noticias** y cuente cuántas noticias la están usando. Si hay alguna que deba conservarse, edítela primero y cámbiele la categoría.

---

## 5. Agregar un evento

Un evento se carga por **Novedades → Eventos** y es distinto de una noticia en cuatro puntos: lleva **fecha de inicio y fecha final**, lleva **dirección y coordenadas** porque el portal dibuja un mapa, su categoría define **a qué correo llegan las inscripciones**, y la **imagen es opcional**.

El orden de los pasos también es distinto. En Eventos el texto va primero y la imagen va al final.

1. Entre a **Novedades → Eventos**.
2. Pulse **Agregar**.
3. Se abre **Agregar un nuevo evento**, con tres pasos numerados 1, 2 y 3.

### 5.1 Paso 1: contenido en español

| Campo | Obligatorio |
|---|---|
| **Título** | Sí |
| **Descripción del evento** | Sí |

Pulse **Siguiente**. Avisos posibles: "El título es obligatorio." y "La descripción del evento es obligatoria."

### 5.2 Paso 2: contenido en inglés

| Campo | Obligatorio |
|---|---|
| **Título en inglés** | Sí |
| **Descripción del evento en inglés** | Sí |

Igual que en las noticias, sin el inglés el evento no se guarda. Pulse **Siguiente**.

### 5.3 Paso 3: fechas, categoría, lugar e imagen

| Campo | Obligatorio | Detalle |
|---|---|---|
| **Fecha inicio del evento** | Sí | Viene con la fecha del día. Pulse el recuadro y elija en el calendario |
| **Fecha final del evento** | Sin asterisco, pero el panel la envía siempre | Viene con la fecha del día. El calendario no deja elegir una fecha anterior a la de inicio |
| **Categoría del evento** | Sí | Lista desplegable con las categorías de eventos ya creadas |
| **Coordenadas de la ubicación extraídas de Google Maps** | Sí | Las dos cifras separadas por coma. Ejemplo: `18.4861, -69.9312` |
| **Dirección del lugar** | Sí | Como quiere que se lea en el portal. Ejemplo: `Av. 27 de Febrero 1762, Santo Domingo` |
| **Link del Formulario de inscripción de participantes** | No | Dirección completa, empezando por `https://` |
| Imagen | No | Pulse **Seleccione una imagen** en el recuadro de abajo |

**Sobre las fechas.** Si el evento es de un solo día, deje la misma fecha en las dos. Si cambia la fecha de inicio a un día posterior a la fecha final, el panel mueve la fecha final para igualarla. Si cambia la fecha final a un día anterior al de inicio, mueve la de inicio. Revise siempre las dos fechas antes de guardar.

**Sobre las coordenadas.** El portal dibuja un mapa de Google en la página del evento usando estas dos cifras. Para obtenerlas: abra Google Maps, ubique el lugar, pulse con el botón derecho sobre el punto exacto y copie el par de números que aparece arriba del menú. Péguelo tal cual, con la coma. Si pega una dirección en texto, o un enlace de Google Maps, o si olvida la coma, el panel no guarda el evento y muestra "Las coordenadas son obligatorias. Además, deben estar separadas por una coma (,)." Si las cifras están mal pero tienen el formato correcto, el evento se guarda y el mapa del portal muestra el centro de Santo Domingo o un aviso de ubicación inválida.

**Sobre el enlace del formulario.** Debajo del campo, el panel advierte: "Al agregar un link, este se mostrará en el botón 'Quiero participar'." Si lo deja vacío, el botón **Quiero participar** aparece igual en la página del evento, pero en gris y sin funcionar. Si va a haber inscripción, cargue el enlace desde el principio.

**Sobre la imagen.** Es opcional. Si no carga ninguna, la tarjeta del evento muestra el logo de ProDominicana en lugar de una foto. A diferencia de las noticias, aquí el panel **no comprime** la imagen ni avisa si está muy pesada: la sube tal como está. Reduzca la imagen antes de cargarla, idealmente por debajo de 2 MB (apartado 7.1).

4. Pulse **Guardar**.

Al terminar aparece **Evento creado / El evento se ha creado correctamente** y la ventana se cierra.

### 5.4 Precaución al cargar un evento

La ventana de eventos **no pregunta nada al cerrarse**. Un clic fuera de la ventana, o la tecla Escape, cierra el formulario y borra todo lo que escribió, sin aviso. Tenga los textos en un documento aparte y péguelos, en vez de redactarlos dentro del formulario.

Tampoco use los círculos numerados de arriba (1, 2, 3) para saltar de paso. Al pulsarlos, el panel valida el paso en el que está y avanza uno solo, no va al número que usted pulsó. Muévase con **Siguiente** y **Anterior**.

---

## 6. Editar, ocultar y eliminar un evento

En **Novedades → Eventos** cada evento es una tarjeta con su imagen y su título. La lista incluye los publicados y los ocultos. Si no hay ninguno, la pantalla muestra el texto "No tiene".

La tarjeta tiene tres botones, cuyo nombre aparece al pasar el cursor:

| Botón | Color | Qué hace |
|---|---|---|
| **Editar** | Azul | Abre el formulario con los datos cargados |
| **Ocultar** | Negro | Saca el evento del portal. Aparece solo si el evento está publicado |
| **Publicar** | Verde | Devuelve el evento al portal. Aparece solo si el evento está oculto |
| **Eliminar** | Rojo | Borra el evento. No se deshace |

En Eventos no hay botón de vista previa. Para revisar cómo quedó, abra la página pública del evento en otra pestaña.

### 6.1 Editar

1. Pulse **Editar**. Se abre **Editar evento** con los tres pasos y los datos cargados, incluidas las coordenadas ya unidas por coma.
2. Corrija y avance con **Siguiente** hasta el paso 3.
3. Pulse **Guardar**.

El recuadro de la imagen aparece vacío, con el texto **Seleccione una imagen**, aunque el evento ya tenga una. Eso no significa que se perdió: si no elige una imagen nueva, se conserva la que estaba. Si quiere cambiarla, cargue la nueva.

Al guardar aparece **Evento actualizado / El evento ha sido actualizado correctamente**.

### 6.2 Ocultar y publicar

Para ocultar: pulse **Ocultar** y confirme en **Ocultar Evento / ¿Estás seguro que deseas ocultar este evento? Nadie podrán verlo, pero podrás volver a activarlo más adelante.**

Para volver a publicarlo: pulse **Publicar** y confirme en **Activar Evento / ¿Estás seguro que deseas activar este evento? Será público para todos los usuarios.**

Un evento que ya pasó no se borra: se oculta. Así queda el registro en el panel y el enlace deja de aparecer en el portal.

### 6.3 Eliminar

1. Pulse **Eliminar**.
2. El panel pregunta: **Eliminar Evento / ¿Estás seguro de que deseas eliminar este evento? Esta acción no se puede deshacer y podría tener un impacto más adelante.**
3. Pulse **Eliminar** o **Cancelar**.

### 6.4 Categorías de eventos

La categoría de un evento cumple una función que no tiene la de noticias: **define el correo al que llegan los datos de las personas que se inscriben**. Por eso en la práctica es la categoría del departamento que organiza.

Entre a **Novedades → Categoría de Eventos**. El listado muestra **Nombre**, **Correo electrónico** y **Acción**.

Para crear una:

1. Pulse **Agregar**. Se abre **Agregar una nueva categoría**.
2. En **Nombre** escriba el nombre de la categoría o del departamento.
3. En **Correo electrónico** escriba la dirección que va a recibir la información de los interesados. El panel advierte: "A este correo electrónico le llegará toda la información de los participantes interesados en los eventos pertenecientes esta categoría/departamento."
4. Pulse **Guardar**.

Para editar: pulse el lápiz de la fila, corrija y pulse **Actualizar**. Tenga en cuenta que el título de esa ventana dice **Editar dirección**, no "Editar categoría"; es un rótulo equivocado en el panel y no significa que esté editando otra cosa.

Llene siempre los dos campos. El panel solo avisa cuando el nombre **y** el correo están vacíos a la vez: si escribe el nombre y deja el correo en blanco, intenta guardar sin reclamar nada, y los eventos de esa categoría se quedan sin destinatario para las inscripciones.

Al eliminar una categoría de eventos, el panel advierte: **¿Estás seguro de que deseas eliminar esta categoría? Esta acción no se puede deshacer. Se designarán todos los eventos de esta categoría como 'Sin Categoría'.** A diferencia de las categorías de noticias, aquí los eventos **no** se borran.

---

## 7. Recomendaciones de contenido

### 7.1 Imágenes

| | Noticias | Eventos |
|---|---|---|
| Medida recomendada | 1920 × 1080 píxeles | 1920 × 1080 píxeles |
| Proporción | 16:9, horizontal | 16:9, horizontal |
| Formato | JPG o PNG | JPG o PNG |
| Tope que acepta el panel | 25 MB | Sin tope en pantalla |
| Peso recomendado del archivo | Hasta 5 MB | Hasta 2 MB |
| Compresión automática | Sí, salvo que marque "Subir en resolución original" | No |

Por qué 1920 píxeles de ancho: es la medida a la que el panel reduce la portada de la noticia antes de subirla. Una imagen más grande no se publica con más detalle, solo tarda más en cargar. Una imagen más chica se publica estirada y se ve borrosa en pantallas grandes.

Por qué 16:9 y horizontal: el portal recorta la imagen para llenar el espacio que le corresponde. Siempre toma el centro. Una imagen vertical, o un afiche con texto arriba y abajo, pierde justamente los bordes donde está la información. Si tiene que publicar un afiche vertical, móntelo sobre un fondo horizontal antes de subirlo.

Dos puntos más. Las imágenes con transparencia pierden el fondo transparente al comprimirse: queda blanco. Y en eventos, como no hay compresión, una foto de cámara de 15 o 20 MB puede fallar al subir sin mensaje claro; redúzcala antes.

### 7.2 Títulos

| Lugar donde se muestra | Cómo se comporta un título largo |
|---|---|
| Tarjeta del panel, en Noticias y en Eventos | Se corta en una sola línea, con puntos suspensivos |
| Tarjeta de noticia en el portal | Se corta a tres líneas |
| Página de la noticia | Se muestra completo |

Apunte a **entre 60 y 90 caracteres**, un renglón y medio. Un título de 140 caracteres se publica, pero en el listado del portal el visitante lee solo el principio, y en el panel usted no distingue dos noticias cuyo título empieza igual.

Ponga lo informativo al principio. "ProDominicana certifica a 120 exportadores en normas de inocuidad" funciona cortado; "En el marco de la estrategia nacional de fomento, la institución realizó..." no dice nada en las primeras tres líneas.

### 7.3 Cuidado con los nombres largos

Lo mismo aplica a los nombres de categoría, de lugar y de dirección. El panel y el portal cortan el texto que no entra en el espacio asignado, sin avisar y sin dar error:

- **Categorías:** el selector del formulario y la lista cortan el nombre. Dos categorías llamadas "Inversión extranjera directa en zonas francas" e "Inversión extranjera directa en turismo" se ven iguales en pantalla y es fácil elegir la equivocada. Use nombres de una o dos palabras.
- **Dirección del lugar:** el portal la muestra en mayúsculas y en un espacio reducido, junto al ícono del mapa. Escriba la dirección útil para llegar, no el nombre completo del salón, el piso, el edificio y el sector en una sola línea.
- **Nombres de archivo de las imágenes:** evite tildes, eñes y signos. Use `feria-exportadores-2026.jpg`, no `Feria de Exportadores (versión final) #2.jpg`.

### 7.4 Antes de dar por cerrada una publicación

1. Abra la **Vista previa** y revise las dos versiones, español e inglés.
2. Confirme que la fecha de la noticia es la correcta, no la del día en que la cargó.
3. Revise que la categoría sea la que corresponde.
4. Abra la noticia o el evento en el portal público, en otra pestaña, y léala como la lee un visitante.
5. En eventos, pulse el botón **Quiero participar** y verifique que el formulario abre.

---

## 8. Fallas conocidas del panel

Lo que sigue no es una lista de cosas por aprender, sino de cosas que no funcionan como aparentan. Conviene conocerlas para no perder tiempo buscando el error por el lado equivocado.

| Dónde | Qué pasa | Qué hacer mientras tanto |
|---|---|---|
| Noticias, botón **Filtrar** | Abre una fila con un campo de texto y una lista desplegable vacía. No filtra nada: la lista de noticias queda igual | Use la búsqueda del navegador (Ctrl+F) sobre la página |
| Eventos, botón **Filtrar** | No abre ningún campo. No hace nada visible | Igual que arriba |
| Noticias, botón verde **Publicar** | Al pasar el cursor, el botón no muestra su nombre, a diferencia de los otros tres | Es el botón verde del medio, con el ícono del ojo |
| Categoría de Noticias, **Filtrar** | La búsqueda por nombre no encuentra nada y el filtro Activo/Inactivo deja la lista vacía | Recorra las páginas con **Siguiente**, o súbalo a 20 por página |
| Categoría de Noticias, encabezado del listado | Dice "Mostrando las direcciones del 1 al 5" y "direcciones por página". Son categorías, no direcciones | Ignore la palabra |
| Categoría de Eventos, ventana de edición | El título dice **Editar dirección** | Está editando la categoría, el rótulo está mal |
| Categoría de Eventos, validación | Solo reclama si el nombre y el correo están vacíos a la vez | Llene los dos campos siempre |
| Eventos, paso 3 | Si deja la **Dirección del lugar** vacía pero llenó las coordenadas, el botón **Guardar** no hace nada y no aparece ningún mensaje de error | Revise que la dirección esté escrita |
| Eventos, formulario completo | Cerrar la ventana por error, sin confirmación, borra todo lo escrito | Redacte en un documento aparte y pegue |
| Eventos, círculos numerados del paso | Al pulsarlos avanzan un paso, no van al número pulsado | Use **Siguiente** y **Anterior** |
| Vista previa de noticia, versión EN | El nombre de la categoría se muestra en español | No es un error de carga; en el portal sí sale en inglés |

---

## 9. Preguntas frecuentes

**Publiqué la noticia y no la veo en el portal. ¿Qué reviso?**
Primero, el botón del medio de la tarjeta en el panel. Si dice **Publicar**, la noticia está oculta: púlselo y confirme con **Activar**. Si dice **Ocultar**, la noticia está visible; recargue la página del portal sin usar la caché (Ctrl+Shift+R) y revise que no esté buscando en una categoría que no es la suya.

**¿Puedo publicar solo en español y traducir después?**
No. El panel no guarda la noticia ni el evento sin el título y el cuerpo en inglés. Tampoco acepta un espacio en blanco como texto. Si la traducción no está lista, espere.

**¿Qué pasa si pongo el mismo texto español en el campo de inglés para salir del paso?**
La noticia se guarda y el portal muestra ese texto en español a quien navegue en inglés. Es preferible esperar la traducción.

**La barra de subida se queda en 100% y no pasa nada.**
Al llegar a 100% la portada terminó de subir y el servidor está procesándola; el mensaje cambia a "Procesando en el servidor, no cierres esta ventana...". Espere. El panel aguarda hasta cinco minutos. Si falla, aparece el aviso rojo y la ventana queda abierta con todo lo que escribió.

**Me dice que la imagen supera el límite de 25.0 MB.**
Reduzca la imagen antes de subirla. Con la aplicación Fotos de Windows: abrir la imagen, **Redimensionar**, fijar 1920 píxeles de ancho y guardar como JPG.

**¿Para qué sirve "Subir en resolución original"?**
Sube la imagen tal como está, sin reducirla. Tarda bastante más y el portal no la muestra con más calidad, porque el ancho máximo que usa es 1920 píxeles. Déjela sin marcar salvo que tenga una razón concreta.

**Oculté una noticia por error. ¿La recupero?**
Sí. Pulse el botón verde **Publicar** en su tarjeta y confirme con **Activar**. No se perdió nada.

**Eliminé una noticia por error. ¿La recupero?**
No. No hay papelera ni deshacer. Hay que cargarla de nuevo desde cero, con su imagen y sus dos versiones de texto, y la dirección del enlace cambia: cualquier enlace compartido antes queda roto.

**¿Cuál es la diferencia real entre ocultar y eliminar?**
Ocultar deja la noticia guardada en el panel y la saca del portal; es reversible en dos clics. Eliminar borra el contenido y la imagen del servidor; no es reversible.

**Necesito corregir una sola palabra del título. ¿Tengo que pasar por los tres pasos?**
Sí. El botón **Guardar cambios** solo está en el paso 3. Pulse **Continuar** dos veces y después **Guardar cambios**. No hace falta tocar nada de los otros pasos.

**Borré una categoría de noticias y desaparecieron varias noticias.**
Es el comportamiento del panel, advertido en el mensaje de confirmación: al eliminar una categoría de noticias se borran todas las noticias que la tenían. No se recuperan. En categorías de **eventos** no ocurre: los eventos quedan como 'Sin Categoría'.

**El mapa del evento muestra el centro de Santo Domingo y no el lugar.**
Las coordenadas están mal. Edite el evento y vuelva a copiarlas desde Google Maps: botón derecho sobre el punto exacto, copiar el par de números, pegarlos con la coma en medio.

**El botón "Quiero participar" aparece gris y no abre nada.**
El evento no tiene cargado el **Link del Formulario de inscripción de participantes**. Edite el evento, péguelo en el paso 3 y guarde.

**¿A quién le llegan las inscripciones de un evento?**
Al correo configurado en la **categoría del evento**, en Novedades → Categoría de Eventos. Si ese campo está vacío, nadie recibe los datos. Revíselo antes de publicar un evento con inscripción.

**No puedo abrir Categoría de Noticias, pero sí Noticias.**
Son permisos distintos. Noticias y Eventos usan `create:news`; las dos pantallas de categorías usan `create:transparency`. Solicite ese segundo permiso a la Dirección de Tecnología.

**¿Hay que cargar la noticia dos veces, una en español y otra en inglés?**
No. Es una sola noticia con dos versiones de texto, en los pasos 2 y 3 del mismo formulario. El portal muestra una u otra según el idioma que elija el visitante.
