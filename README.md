# 🚀 CI/CD con GitHub Actions y Docker Hub para una API Node.js

Este proyecto demuestra cómo configurar un **flujo CI/CD** para una **API en Node.js**, utilizando **GitHub Actions** para ejecutar pruebas automatizadas y **Docker Hub** para empaquetar y publicar una imagen Docker lista para producción. La API incluye un endpoint simple (`/ping`), pruebas con **Jest** y **Supertest**, y un flujo automatizado que garantiza calidad y despliegue continuo.

---

## 📋 Requisitos previos

- **Node.js** (versión 18 o superior)
- **Docker** instalado en tu máquina
- Cuenta en **Docker Hub**
- Repositorio en **GitHub**
- Conocimientos básicos de Git, Node.js y Docker

---

## 📌 Pasos para configurar el proyecto

### 1. Crear el proyecto Node.js

1. **Inicializa el proyecto**:

   ```bash
   mkdir empresa-api
   cd empresa-api
   npm init -y
   ```

2. **Instala las dependencias**:

   ```bash
   npm install express jest supertest --save
   npm install nodemon --save-dev
   ```

3. **Crea la estructura de archivos**:
   ```
   empresa-api/
   ├── src/
   │   ├── index.js
   │   ├── server.js
   │   ├── index.test.js
   ├── .gitignore
   ├── Dockerfile
   ├── package.json
   ```

### 2. Crear el `Dockerfile`

Crea un archivo `Dockerfile` en la raíz del proyecto para definir cómo se construirá la imagen de la API.

```Dockerfile
# Usar la imagen base de Node.js 18
FROM node:18

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Comando para iniciar la aplicación
CMD ["node", "src/server.js"]
```

---

### 3. Probar la imagen localmente

1. **Construye la imagen**:

   ```bash
   docker build -t empresa-api .
   ```

2. **Ejecuta el contenedor**:

   ```bash
   docker run -d -p 3000:3000 --name empresa-api-container empresa-api
   ```

3. **Verifica que funciona**:
   Abre tu navegador en `http://localhost:3000/ping` o usa:

   ```bash
   curl http://localhost:3000/ping
   ```

   Deberías ver: `{"message": "Pong!"}`

4. **Detén y elimina el contenedor** (opcional):
   ```bash
   docker stop empresa-api-container
   docker rm empresa-api-container
   ```

---

### 4. Configurar GitHub Actions para CI/CD

Crea un flujo de trabajo en GitHub Actions para automatizar pruebas, construcción y publicación de la imagen en Docker Hub.

1. **Crea el archivo de workflow**:
   En tu repositorio, crea la carpeta `.github/workflows` y añade un archivo `ci.yml`:

2. **Configura secretos en GitHub**:
   - Ve a tu repositorio en GitHub → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**.
   - Añade:
     - `DOCKER_USERNAME`: Tu usuario de Docker Hub.
     - `DOCKER_PASSWORD`: Tu contraseña o un **Access Token** de Docker Hub (recomendado).

---

### 5. Publicar la imagen en Docker Hub

1. **Empuja los cambios al repositorio**:

   ```bash
   git add .
   git commit -m "Configurar CI/CD con GitHub Actions"
   git push origin main
   ```

2. **Verifica el workflow**:

   - Ve a la pestaña **Actions** en tu repositorio de GitHub.
   - El workflow ejecutará las pruebas, construirá la imagen y la publicará en Docker Hub.

3. **Resultado**:
   La imagen estará disponible en `docker.io/TU_USUARIO/empresa-api:latest`.

---

### 6. Probar la imagen publicada

En cualquier máquina con Docker instalado:

1. **Descarga la imagen**:

   ```bash
   docker pull TU_USUARIO/empresa-api:latest
   ```

2. **Ejecuta el contenedor**:

   ```bash
   docker run -d -p 3000:3000 TU_USUARIO/empresa-api:latest
   ```

3. **Verifica**:
   ```bash
   curl http://localhost:3000/ping
   ```
   Deberías ver: `{"message": "Pong!"}`

---

### 7. Buenas prácticas

- **Versionado de imágenes**: Usa etiquetas específicas (por ejemplo, `v1.0.0`) en lugar de `latest` para producción.
  ```bash
  docker build -t TU_USUARIO/empresa-api:v1.0.0 .
  ```
- **Limpieza local**:
  ```bash
  docker system prune -f
  ```
- **Seguridad**:
  - Usa un **Access Token** en lugar de tu contraseña en Docker Hub.
  - Evita exponer puertos innecesarios en producción.
- **Pruebas robustas**: Añade más casos de prueba en `index.test.js` para cubrir otros endpoints o escenarios.

---

### 8. Solución de problemas

- **Fallo en las pruebas**: Verifica los logs en la pestaña **Actions** de GitHub.
- **Error de login en Docker Hub**: Asegúrate de que `DOCKER_USERNAME` y `DOCKER_PASSWORD` están correctamente configurados.
- **Puerto ocupado**: Cambia el puerto del host (por ejemplo, `-p 3001:3000`).
- **Espacio insuficiente**: Limpia imágenes y contenedores con `docker system prune`.

---
