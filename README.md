# API REST Client

Cliente frontend para consumir API REST de órdenes y eventos.

## Stack

- Remix 2
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
npm run build
npm start
```
