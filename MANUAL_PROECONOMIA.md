# Manual de uso: Proeconomía / Radar Económico

Este manual explica cómo cargar y mantener el contenido de la página pública **Radar Económico** (`prodominicana.gob.do/proeconomia`) desde el panel administrativo. Está dirigido al personal de comunicaciones que publica. Todo el contenido de esta página se carga a mano: no hay ningún dato que se actualice por sí solo.

Hay una regla que conviene leer antes de empezar: los cuatro indicadores económicos **tienen fecha de caducidad** y el portal deja de mostrar la cifra cuando se vencen. El apartado 4 lo explica en detalle.

---

## 1. Qué es el Radar Económico y dónde se ve

Es una página pública del portal institucional dedicada a la información económica. El visitante llega a ella desde el menú **Novedades → Radar Económico**. La dirección directa es `prodominicana.gob.do/proeconomia`.

La página está armada por bloques. Cada bloque toma su contenido de una pantalla distinta del panel:

| Bloque en la página pública | De dónde sale el contenido | Pantalla del panel |
|---|---|---|
| Barra de categorías y buscador | Categorías de noticias | `/admin/news/categories` |
| Banda de titulares en movimiento | Títulos de las noticias publicadas | `/admin/news` |
| Noticia destacada (imagen grande) | La noticia marcada como destacada | `/admin/news` |
| Portada del periódico, a la derecha de la destacada | La portada más reciente que haya cargado | `/admin/newspaper-covers` |
| Tres miniaturas de noticias recientes | Las tres noticias más recientes | `/admin/news` |
| Tres tarjetas de noticia con su categoría | Las tres noticias siguientes en antigüedad | `/admin/news` |
| Columnas por tema (Exportación, Inversión, Finanzas) | Noticias agrupadas por su categoría | `/admin/news` |
| "Al Día con ProDominicana" (carrusel semanal) | La Agenda que ya usaban | `/admin/schedule` |
| Cuatro indicadores económicos | Valores cargados a mano | `/admin/indicators` |
| Formulario de suscripción al boletín | Se llena solo con quien se suscribe | `/admin/newsletter/subscribers` |

Dos aclaraciones sobre el funcionamiento de la página:

- La barra de categorías y el buscador afectan **solo** a las tres miniaturas y a las tres tarjetas. La banda de titulares, la noticia destacada, el carrusel de la Agenda y los indicadores se muestran siempre completos.
- La página existe en español y en inglés. Lo que no tenga traducción al inglés se muestra en blanco en la versión inglesa.

---

## 2. Cómo entrar al panel

1. Entre a `prodominicana.gob.do/admin` e inicie sesión con su cuenta institucional.
2. En el menú lateral izquierdo abra **Novedades**.
3. Pulse **Proeconomía**.

Verá una pantalla con cuatro tarjetas:

| Tarjeta | Para qué sirve |
|---|---|
| **Boletines** | Redactar, editar, enviar y eliminar el boletín; ver cuántas personas lo recibieron y lo abrieron |
| **Suscriptores** | Consultar quién está suscrito, buscar por nombre o correo, exportar la lista y eliminar registros |
| **Portadas Diarias** | Cargar la portada de los periódicos del día, con el medio y la fecha |
| **Indicadores** | Actualizar el dólar, el euro, el petróleo y el flete marítimo |

La noticia destacada no está aquí: se marca desde la pantalla de **Noticias**, que ya conocen.

Para ver estas pantallas su usuario necesita el permiso **create:news**, el mismo que ya se usa para cargar Noticias y Eventos. Si al entrar le aparece un aviso de acceso restringido, solicite ese permiso a la Dirección de Tecnología; no es un permiso nuevo ni distinto.

---

## 3. Tarea por tarea

### 3.1 Publicar una noticia que salga en el Radar Económico

No hay una pantalla aparte para las noticias del Radar. Se publican desde **Novedades → Noticias**, igual que siempre. Lo que determina si una noticia aparece en el Radar es su **categoría** y su **fecha**.

1. Entre a **Novedades → Noticias**.
2. Pulse el botón de crear noticia.
3. Paso 1: elija la **Fecha de la noticia**, la **Categoría** y suba la **Portada de la noticia**. Los tres campos son obligatorios.
4. Paso 2: escriba el **Título**, la **Breve descripción** y el **Cuerpo de la noticia** en español.
5. Paso 3: escriba los mismos tres campos en inglés.
6. Pulse **Publicar noticia**.
7. Abra `prodominicana.gob.do/proeconomia` y confirme que la noticia aparece.

**Sobre la categoría.** La barra de filtro del Radar tiene cuatro botones: Exportación, Inversión, Turismo y Finanzas. Una noticia aparece bajo uno de esos botones solo si el nombre de su categoría contiene esa palabra. Una noticia con la categoría "Exportación agrícola" sale bajo Exportación. Una con la categoría "Comercio" no sale bajo ninguno de los cuatro botones, aunque sí aparece en "Todos". Las categorías se administran en **Novedades → Categoría de Noticias**.

**Sobre la fecha.** Las tres miniaturas muestran las tres noticias más recientes y las tres tarjetas las tres siguientes. Cada noticia nueva empuja a las anteriores hacia abajo. Una noticia que ya no esté entre las seis más recientes sigue publicada y sigue accesible desde las columnas por tema y desde la sección de Noticias del portal, pero deja de ocupar un espacio en la parte alta del Radar.

### 3.2 Marcar la noticia destacada

La noticia destacada es la imagen grande de la parte superior de la página, la que acompaña a la portada del periódico.

1. Entre a **Novedades → Noticias**.
2. Busque la noticia que quiere destacar.
3. Actívele la marca de noticia destacada.
4. Abra la página pública y confirme el cambio.

Solo puede haber **una** noticia destacada a la vez. Al marcar una, la anterior se desmarca automáticamente: no hace falta ir a buscarla para quitarle la marca.

Si no hay ninguna noticia destacada, el espacio grande de la página muestra el texto "Sin noticia destacada". Conviene que nunca se quede así.

### 3.3 Subir la portada del día

1. Entre a **Proeconomía → Portadas Diarias**.
2. Pulse **Agregar portada**.
3. Arrastre la imagen de la portada al recuadro, o pulse el recuadro para seleccionar el archivo. La imagen es obligatoria y no debe pasar de 10 MB.
4. En **Medio** escriba el nombre del periódico, por ejemplo "Listín Diario". Es obligatorio.
5. En **Fecha** deje la fecha del día o corríjala si está cargando una portada de otro día. Es obligatorio.
6. En **Enlace (opcional)** pegue la dirección de la nota o de la edición digital. Si lo completa, el visitante que pulse la portada en el portal va a esa dirección.
7. Pulse **Crear**.

La página pública muestra **una sola portada**: la más reciente por fecha. Las demás quedan guardadas en el panel y se pueden editar o eliminar, pero no se ven en el portal.

### 3.4 Actualizar los indicadores

1. Entre a **Proeconomía → Indicadores**.
2. Verá cuatro bloques: dólar, euro, petróleo y flete marítimo. Cada uno tiene su etiqueta de estado (vea el apartado 4).
3. En **Valor** escriba la cifra tal como quiere que se lea en el portal, con su símbolo. Lo que escriba se publica igual, sin ningún formato automático.
4. En **Nota (ES)** puede escribir una aclaración corta, por ejemplo la fuente o la variación del día. Es opcional y se muestra debajo del valor.
5. En **Nota (EN)** escriba la misma aclaración en inglés. Si la deja vacía, la versión inglesa de la página muestra la nota en español.
6. Pulse **Guardar cambios**.

Un detalle operativo: el botón **Guardar cambios** es uno solo para los cuatro indicadores. Antes de pulsarlo revise los cuatro valores, no únicamente el que vino a cambiar.

### 3.5 Redactar y enviar el boletín

**Redactar**

1. Entre a **Proeconomía → Boletines**.
2. Pulse **Crear boletín**.
3. **Título (ES)**: obligatorio. Es el nombre con el que va a identificar el boletín en la lista del panel.
4. **Título (EN)**: opcional.
5. **Asunto del correo**: obligatorio. Es la línea que el suscriptor ve en su bandeja de entrada antes de abrir el correo.
6. **Etiquetas**: opcional, separadas por coma. Sirven para clasificar los boletines dentro del panel.
7. **Contenido del boletín**: obligatorio. Escriba aquí el cuerpo del boletín con el editor de texto.
8. Pulse **Crear boletín**. Queda guardado con el estado **Borrador** y todavía no se ha enviado a nadie.

El boletín no tiene campo de imagen de portada. Las imágenes que quiera incluir van dentro del contenido.

**Revisar antes de enviar**

Léalo completo una vez más desde el botón de editar. Después del envío no hay corrección posible.

**Enviar**

1. En la lista de boletines, ubique el suyo y pulse el ícono de enviar.
2. Lea el aviso de confirmación. El boletín se envía a **todos los suscriptores activos**.
3. Pulse **Enviar ahora**.

**El envío no se puede deshacer, cancelar ni corregir.** Un boletín enviado con un error se corrige únicamente enviando otro correo. Por eso vale la pena el paso de revisión.

**Ver cuántos lo abrieron**

En la lista, el ícono de métricas muestra tres cifras: **Enviados**, **Abiertos** y **Clicks**. La cifra de abiertos es un mínimo, no un número exacto: varios programas de correo no informan la apertura, así que siempre habrá más lecturas de las que registra el panel.

**Estados del boletín**

| Estado | Qué significa |
|---|---|
| Borrador | Creado y guardado, sin enviar |
| Programado | Marcado para envío posterior |
| Publicado | Disponible, sin envío registrado |
| Enviado | Ya salió a los suscriptores; no admite envío de nuevo |

**Programar un envío**

En el formulario, el campo **Programar envío** admite fecha y hora. Si lo completa, el boletín queda en estado *Programado* y **se envía solo** en ese momento a todos los suscriptores activos; no hace falta que nadie entre ese día.

Si deja el campo vacío, el boletín se guarda como borrador y usted lo envía a mano cuando quiera. Para cancelar una programación, borre la fecha y guarde: el boletín vuelve a borrador.

El servidor revisa los boletines programados cada cinco minutos, así que el envío puede salir hasta cinco minutos después de la hora indicada.

### 3.6 Consultar y exportar suscriptores

1. Entre a **Proeconomía → Suscriptores**.
2. Arriba a la izquierda verá el **Total suscriptores**.
3. La tabla muestra Nombre, Email, Estado (Activo o Inactivo) y Fecha de suscripción, de diez en diez. Use **Anterior** y **Siguiente** para recorrerla.
4. Para buscar a una persona, escriba su nombre o su correo en el campo de búsqueda.
5. Para llevarse la lista, pulse **Exportar CSV**. Se descarga el archivo `suscriptores-newsletter.csv`, que abre directamente en Excel.
6. El ícono de papelera elimina un suscriptor. Esa acción no se puede deshacer y la persona desaparece de la lista; úsela solo cuando haya una solicitud expresa de la persona o un correo claramente inválido.

### 3.7 El carrusel "Al Día con ProDominicana"

Este bloque no tiene pantalla propia. Toma las actividades de la **Agenda** que ya existía en el panel, en **Novedades → Agenda**. Lo que cargue o modifique allí se refleja en el Radar Económico. Si la Agenda está vacía, el bloque no se muestra en la página.

---

## 4. La vigencia de los indicadores

Este es el apartado más importante del manual.

Cada uno de los cuatro indicadores tiene un plazo de vigencia contado desde la última vez que se guardó:

| Indicador | Vigencia |
|---|---|
| Dólar | Un día |
| Euro | Un día |
| Petróleo | Un día |
| Flete marítimo | Una semana |

**Qué pasa cuando se cumple el plazo.** El portal deja de mostrar la cifra. En su lugar aparece la tarjeta en gris, con el texto **"No disponible"** y la fecha de la última actualización, por ejemplo "Actualizado el 28 de septiembre de 2026". El nombre del indicador se sigue viendo; el número, no.

**Es intencional.** Un dato cambiario de la semana pasada publicado sin fecha es información incorrecta, y el portal es una fuente oficial. Se prefiere un espacio vacío con su fecha visible antes que una cifra vieja que el visitante va a leer como la de hoy.

**Cómo saber en qué estado está cada indicador.** En la pantalla de Indicadores, cada bloque muestra una etiqueta:

- Etiqueta **verde "Vigente"**: la cifra se está mostrando en el portal.
- Etiqueta **ámbar "Vencido — no se muestra en el portal"**: la cifra está oculta.

Al lado de la etiqueta aparece la fecha de la última actualización y el tipo de vigencia (diaria o semanal). Si un indicador nunca se ha cargado, dice "Nunca se ha cargado".

**Cómo reactivar un indicador vencido.** Entre a **Proeconomía → Indicadores**, escriba el valor del día en el indicador correspondiente y pulse **Guardar cambios**. La etiqueta pasa a verde y la cifra vuelve a aparecer en el portal de inmediato.

**Aviso por correo.** El sistema envía un aviso cuando algún indicador se vence. Falta definir a qué dirección debe llegar ese aviso. Mientras no se configure, la única forma de detectar un vencimiento es entrar a la pantalla de Indicadores o mirar la página pública. Conviene resolverlo esta semana: defina la dirección o la lista de correo que debe recibirlo y solicite su configuración a la Dirección de Tecnología.

---

## 5. Preguntas frecuentes

**Publiqué una noticia y no aparece en el Radar Económico.**

Revise estas cuatro causas, en este orden:

1. La noticia está oculta. En **Noticias**, confirme que esté publicada y no en estado oculto.
2. Ya no está entre las seis más recientes. Otras noticias más nuevas ocuparon su lugar. Siga buscándola en las columnas por tema y en la sección de Noticias del portal.
3. Su categoría no coincide con ninguno de los cuatro botones del filtro. Si el nombre de la categoría no contiene la palabra Exportación, Inversión, Turismo o Finanzas, la noticia aparece solo bajo "Todos".
4. Tiene un filtro activo en su propio navegador. Si dejó seleccionado un botón de categoría o escribió algo en el buscador, está viendo una lista recortada. Pulse "Todos" y borre el texto del buscador.

**¿Por qué el indicador salió en gris y dice "No disponible"?**

Se venció. Pasó un día sin actualizarse en el caso del dólar, el euro o el petróleo, o una semana en el caso del flete marítimo. Entre a **Proeconomía → Indicadores**, cargue el valor del día y guarde. Vea el apartado 4.

**Subí dos portadas con la misma fecha. ¿Qué se publica?**

Una sola. La página muestra la portada más reciente por fecha y nada más. Si cargó dos para el mismo día, no está garantizado cuál de las dos sale. Elimine o corrija la fecha de la que no corresponda, y vuelva a mirar la página pública para confirmar que quedó la correcta.

**Envié el boletín con un error. ¿Puedo deshacer el envío?**

No. Una vez que pulsa **Enviar ahora**, los correos salen y no hay forma de retirarlos, cancelarlos ni editarlos. El boletín queda en estado Enviado y ya no admite un segundo envío. La única corrección posible es redactar otro boletín con la aclaración y enviarlo. Por eso el paso de revisión antes de enviar no es opcional.

**¿Qué pasa con quien se da de baja del boletín?**

Deja de recibir los envíos siguientes, de forma inmediata y sin que nadie tenga que hacer nada en el panel. Su registro no desaparece: en **Suscriptores** sigue apareciendo con el Estado en **Inactivo**, y el sistema no lo incluye en los próximos envíos. Si esa persona después intenta suscribirse otra vez desde el formulario del portal, puede recibir el mensaje "Este correo ya está suscrito". En ese caso, consulte con la Dirección de Tecnología para reactivar el registro: no se resuelve desde el panel.

**¿Puedo tener dos noticias destacadas a la vez?**

No. El espacio grande de la página es uno. Al marcar una noticia como destacada, la que estaba antes se desmarca automáticamente.

**¿Los indicadores se actualizan desde alguna fuente oficial automáticamente?**

No. Los cuatro se cargan a mano, uno por uno, desde la pantalla de Indicadores. Quien los carga es responsable de la cifra que publica.

**Cambié algo y la página sigue igual.**

Recargue la página pública en el navegador. Si después de recargar el cambio no aparece, vuelva al panel y confirme que el registro se guardó: las pantallas muestran un aviso verde de confirmación al guardar. Si guardó y aun así no se refleja, repórtelo a la Dirección de Tecnología indicando qué pantalla usó y a qué hora.

---

## 6. Responsabilidades periódicas

Esta tabla está pensada para asignarse. La columna de responsable queda en blanco a propósito: complétela con el nombre de la persona y de quien la sustituye en sus ausencias.

**Todos los días laborables**

| Tarea | Pantalla | Responsable |
|---|---|---|
| Cargar el valor del dólar | Proeconomía → Indicadores | |
| Cargar el valor del euro | Proeconomía → Indicadores | |
| Cargar el valor del petróleo | Proeconomía → Indicadores | |
| Confirmar que los cuatro indicadores tienen la etiqueta verde "Vigente" | Proeconomía → Indicadores | |
| Subir la portada del periódico del día | Proeconomía → Portadas Diarias | |
| Revisar que la noticia destacada siga siendo la que corresponde | Novedades → Noticias | |

**Cada semana**

| Tarea | Pantalla | Responsable | Día sugerido |
|---|---|---|---|
| Cargar el valor del flete marítimo | Proeconomía → Indicadores | | Lunes |
| Actualizar las actividades de la Agenda que alimentan el carrusel | Novedades → Agenda | | Lunes |
| Redactar y enviar el boletín | Proeconomía → Boletines | | |
| Revisar el total de suscriptores y exportar la lista como respaldo | Proeconomía → Suscriptores | | Viernes |
| Abrir `prodominicana.gob.do/proeconomia` y revisar la página completa como la ve un visitante | Página pública | | Viernes |

**Pendiente de definir**

| Punto | Qué falta decidir |
|---|---|
| Destinatario del aviso de indicador vencido | A qué dirección o lista de correo debe llegar |
| Suplencia de la carga diaria de indicadores | Quién carga el dólar, el euro y el petróleo en vacaciones, licencias y días feriados |
| Fuente de cada indicador | De qué fuente oficial se toma cada cifra, para que no cambie según quién la cargue |
