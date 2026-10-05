# Despliegue automático

El sitio se despliega solo: cada push a `main` dispara
`.github/workflows/deploy.yml`, que actualiza el código, compila y recarga PM2
en el servidor.

## Por qué un runner self-hosted

El workflow anterior usaba `appleboy/ssh-action`: GitHub intentaba **entrar** por
SSH al servidor. Nunca funcionó — los 60 runs registrados fallaron con:

```
dial tcp ***:***: i/o timeout
```

El servidor institucional no acepta SSH entrante desde internet, así que el
runner de GitHub ni siquiera lograba abrir la conexión.

La solución invierte la dirección: un **runner self-hosted** instalado en el
propio servidor sale hacia GitHub por HTTPS (443, salida que normalmente sí está
permitida), recibe el trabajo y lo ejecuta localmente. **No hay que abrir ningún
puerto entrante.**

## Instalación (una sola vez)

### Requisitos

- Acceso SSH con `sudo` al servidor.
- **Permiso de admin en el repositorio** para generar el token de registro.
  Una cuenta con permiso de escritura no basta. Los únicos admin de
  `Prodominicana-dev/Institucional` son `ProdominicanaDev` y `josegv23`.
- Node.js 20+, npm y PM2 ya instalados (el sitio corre con Next.js 15).

### 1. Obtener el token de registro

En GitHub: **Settings → Actions → Runners → New self-hosted runner**, o con la
CLI desde una cuenta con admin:

```bash
gh api -X POST repos/Prodominicana-dev/Institucional/actions/runners/registration-token --jq .token
```

El token expira en una hora.

### 2. Instalar el runner en el servidor

Conectado por SSH **como el usuario `ceird`**, que es el que ejecuta PM2. Si se
usa otro usuario, `pm2 reload` hablaría con un demonio PM2 distinto y el deploy
quedaría en verde sin recargar nada.

```bash
mkdir -p ~/actions-runner && cd ~/actions-runner
curl -o runner.tar.gz -L https://github.com/actions/runner/releases/download/v2.337.0/actions-runner-linux-x64-2.337.0.tar.gz
tar xzf runner.tar.gz && rm runner.tar.gz

./config.sh \
  --url https://github.com/Prodominicana-dev/Institucional \
  --token <TOKEN_DEL_PASO_1> \
  --name institucional-prod \
  --labels self-hosted,linux,institucional \
  --work _work \
  --unattended
```

Las etiquetas **deben** incluir `institucional`: el workflow selecciona el
servidor con `runs-on: [self-hosted, linux, institucional]`.

> Verificar la última versión del runner en
> <https://github.com/actions/runner/releases> y ajustar la URL si cambió.

### 3. Dejarlo como servicio

Así sobrevive a reinicios del servidor:

```bash
sudo ./svc.sh install ceird
sudo ./svc.sh start
sudo ./svc.sh status
```

### 4. Permisos sobre el directorio del sitio

No hace falta hacer nada: `/var/www/Institucional` ya pertenece a `ceird:ceird`,
el mismo usuario del runner. **No correr `chown` sobre esa carpeta** sin
revisarla antes.

### 5. Probar

En GitHub: **Actions → Deploy to Remote Server → Run workflow**. Debe quedar en
verde. A partir de ahí, cada push a `main` despliega solo.

## Qué hace el deploy

Sobre `/var/www/Institucional`:

1. `git fetch` + `git merge --ff-only origin/main`
2. `npm install`
3. `npm run build`
4. `pm2 reload Institucional`

Si un paso falla, el deploy se detiene y PM2 **no** se recarga: el sitio sigue
sirviendo la versión anterior.

### Por qué estos comandos y no otros

Este servidor **no es un clon limpio del repositorio**, así que el deploy está
escrito para fallar antes que destruir:

- **`git merge --ff-only`, nunca `git reset --hard`.** La rama del servidor
  divergió de GitHub y hay archivos versionados con cambios locales (los PDFs de
  guías de inversión, `package-lock.json`). `ff-only` se niega a avanzar si
  perdería algo; `reset --hard` lo borraría sin preguntar.
- **Nunca `git clean`.** Hay archivos sin seguimiento que el sitio necesita: el
  `.env.local` de producción y la ruta `src/app/[locale]/(mujeres-exportadoras)/`,
  que está viva en producción pero no existe en el repositorio.
- **`npm install`, no `npm ci`.** `ci` borra `node_modules` y exige el lockfile
  sincronizado; aquí `package-lock.json` tiene cambios locales.
- **`pm2 reload Institucional` por nombre, no con `ecosystem.config.js`.** El
  proceso real corre en `cluster_mode` y con Node v23.7.0 de nvm — una
  configuración que no coincide con la del archivo del repo. Pasar el archivo le
  cambiaría el modo de ejecución en caliente.

## Notas importantes

- **El repositorio es público.** Por eso el workflow se dispara únicamente con
  `push` a `main`. **Nunca agregar el evento `pull_request`**: cualquiera podría
  abrir un PR desde un fork y ejecutar código arbitrario en el servidor de
  producción. Conviene además dejar activado
  *Settings → Actions → Fork pull request workflows → Require approval for all
  external collaborators*.
- **No agregar `git clean` al workflow.** `git reset --hard` respeta los archivos
  ignorados, así que el `.env.local` del servidor sobrevive; `git clean` lo
  borraría y tumbaría el sitio.
- Las variables de entorno de producción viven en el `.env.local` del servidor,
  fuera de Git.
- Los secrets viejos (`SERVER_HOST`, `SERVER_PORT`, `SERVER_USERNAME`,
  `SERVER_PASSWORD`) ya no se usan y se pueden borrar. Además, `SERVER_PASSWORD`
  guardaba una contraseña SSH en texto: conviene rotarla.

## Pendientes conocidos

Cosas que hay que resolver para que el deploy automático funcione de punta a
punta. Ninguna es urgente, pero sin la primera los deploys fallarán:

1. **La rama del servidor divergió de `origin/main`.** Tiene un merge commit
   local (`13e3eb5`) y commits que nunca se subieron. Mientras eso siga así,
   `git merge --ff-only` fallará y el deploy no avanzará. Hay que revisar
   `git log origin/main..HEAD` y subir a GitHub lo que valga la pena.
2. **Código en producción fuera de Git:** `src/app/[locale]/(mujeres-exportadoras)/`
   está sin seguimiento pero sirve una ruta real. Debería commitearse.
3. **Node inconsistente:** el shell usa v20.20.2 y PM2 ejecuta la app con
   v23.7.0 (nvm). Se compila con una versión y se sirve con otra. Conviene
   unificar en una LTS.
4. **PM2 desactualizado en memoria:** 5.3.1 corriendo contra 6.0.5 instalado.
   `pm2 update` lo arregla, pero reinicia las tres apps: hacerlo en una ventana
   de mantenimiento.

## Si falla

```bash
# Estado del runner
cd ~/actions-runner && sudo ./svc.sh status
# Logs del runner
journalctl -u actions.runner.Prodominicana-dev-Institucional.institucional-prod -f
# Estado y logs de la app
pm2 list && pm2 logs Institucional --lines 100
```

Si el job queda colgado en *Waiting for a runner*, el servicio del runner está
caído o las etiquetas no coinciden.

Si falla con `node: command not found`, el PATH del usuario no se está cargando:
el workflow usa un shell de login (`bash -l`) para leer `~/.bashrc` / nvm.
Verificar que node sea accesible en una sesión no interactiva, o instalarlo a
nivel de sistema.
