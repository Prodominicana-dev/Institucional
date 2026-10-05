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
  Una cuenta con permiso de escritura no basta.
- Node.js 20+, npm y PM2 ya instalados (el sitio corre con Next.js 15).

### 1. Obtener el token de registro

En GitHub: **Settings → Actions → Runners → New self-hosted runner**, o con la
CLI desde una cuenta con admin:

```bash
gh api -X POST repos/Prodominicana-dev/Institucional/actions/runners/registration-token --jq .token
```

El token expira en una hora.

### 2. Instalar el runner en el servidor

Conectado por SSH, **con el mismo usuario que ya ejecuta PM2** (importante: si se
usa otro usuario, `pm2 reload` hablaría con un demonio PM2 distinto y no
recargaría el sitio). Para confirmar cuál es:

```bash
ps -o user= -C PM2 | sort -u   # o: pm2 list
```

Luego:

```bash
mkdir -p ~/actions-runner && cd ~/actions-runner
curl -o runner.tar.gz -L https://github.com/actions/runner/releases/download/v2.330.0/actions-runner-linux-x64-2.330.0.tar.gz
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
sudo ./svc.sh install $(whoami)
sudo ./svc.sh start
sudo ./svc.sh status
```

### 4. Permisos sobre el directorio del sitio

El usuario del runner necesita escribir en el directorio de la app:

```bash
sudo chown -R $(whoami) /var/www/Institucional
```

### 5. Probar

En GitHub: **Actions → Deploy to Remote Server → Run workflow**. Debe quedar en
verde. A partir de ahí, cada push a `main` despliega solo.

## Qué hace el deploy

Sobre `/var/www/Institucional`:

1. `git fetch` + `git reset --hard origin/main`
2. `npm ci`
3. `npm run build`
4. `pm2 startOrReload ecosystem.config.js --update-env` + `pm2 save`

Si un paso falla, el deploy se detiene y PM2 **no** se recarga: el sitio sigue
sirviendo la versión anterior.

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
