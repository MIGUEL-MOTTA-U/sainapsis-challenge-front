# API REST Client

Cliente frontend para consumir API REST de órdenes y eventos.

## Stack

- React 19
- Vite 7
- HeroUI v2
- Tailwind CSS
- TypeScript

## Instalación

```bash
npm install
```

## Configuración

Configurar la URL del API en el archivo `.env`:

```
VITE_API_URL=https://your-api-url.com
```

## Desarrollo

```bash
npm run dev
```

Disponible en `http://localhost:5173`

## Endpoints

- `POST /orders` - Crear orden
- `POST /events` - Crear evento

## Build

```bash
# Compilar para producción
npm run build

# Servir el build (accesible desde la red)
npm start

# Preview local del build
npm run preview
```

## Comandos disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Compilar para producción
- `npm run start` - Servir build (puerto 4173, accesible desde red)
- `npm run preview` - Preview local del build
- `npm run lint` - Verificar código con ESLint
- `npm run lint:fix` - Corregir errores de ESLint automáticamente
- `npm run typecheck` - Verificar tipos TypeScript
