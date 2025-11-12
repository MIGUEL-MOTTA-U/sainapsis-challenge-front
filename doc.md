## DTOs para el Frontend

Este documento resume los DTOs (Data Transfer Objects) públicos que el frontend puede usar para consumir la API.
Incluye las interfaces TypeScript sugeridas, una breve descripción y ejemplos JSON listos para copiar/pegar.

Nota: algunos tipos usan enums generados por Prisma: `EVENT_TYPE`, `STATE_ORDER`. En los ejemplos se usan valores ilustrativos.

---

## Contrato breve
- Inputs: datos enviados por el frontend para crear/actualizar recursos (ordenes, eventos, parámetros de paginación).
- Outputs: datos que devuelve la API al solicitar recursos.
- Errores: formato estándar devuelto por el ErrorHandler, para que el frontend muestre mensajes y procese validaciones.

---

## DTOs de entrada (Input)

1) OrderInDTO — crear/actualizar una orden

TypeScript (sugerido):

```ts
interface OrderInDTO {
  productIds: string[]; // IDs de productos (uuid o string)
  amount: number;      // monto total (ej.: en centavos o la unidad que use la API)
  state?: STATE_ORDER; // opcional
}
```

Ejemplo JSON:

```json
{
  "productIds": ["prod-1", "prod-2"],
  "amount": 12500,
  "state": "PENDING"
}
```


2) EventInDTO — crear un evento asociado a una orden

TypeScript:

```ts
interface EventInDTO {
  orderId: string;         // id de la orden
  eventType: EVENT_TYPE;   // ej.: CREATED, PAID, CANCELLED
  metadata?: unknown;      // opcional, datos libres
}
```

Ejemplo JSON:

```json
{
  "orderId": "order-123",
  "eventType": "PAID",
  "metadata": { "provider": "stripe", "tx": "tx_abc" }
}
```


3) PaginationParams — listar recursos paginados

TypeScript:

```ts
interface PaginationParams { page: number; size: number }
```

Ejemplo JSON:

```json
{
  "page": 1,
  "size": 20
}
```

---

## DTOs de salida (Output)

1) OrderOutDTO — representación pública de una orden

TypeScript:

```ts
interface OrderOutDTO {
  orderId: string;
  productsIds: string[]; // puede recibir también `productIds` según la API
  amount: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  state: STATE_ORDER;
}
```

Ejemplo JSON:

```json
{
  "orderId": "order-123",
  "productsIds": ["prod-1","prod-2"],
  "amount": 12500,
  "createdAt": "2025-11-10T12:34:56.000Z",
  "updatedAt": "2025-11-10T12:35:00.000Z",
  "state": "PENDING"
}
```


2) TicketOutDTO — registro de evento (ticket)

TypeScript:

```ts
interface TicketOutDTO {
  ticketId: string;
  orderId: string;
  eventType: EVENT_TYPE;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
```

Ejemplo JSON:

```json
{
  "ticketId": "ticket-456",
  "orderId": "order-123",
  "eventType": "PAID",
  "description": "Pago recibido vía Stripe",
  "createdAt": "2025-11-10T12:35:10.000Z",
  "updatedAt": "2025-11-10T12:35:10.000Z"
}
```


3) LoggingInfo — estructura de logs (si se expone al cliente)

TypeScript:

```ts
interface LoggingInfo { message: string; timestamp: string; context?: unknown; level: 'info' | 'error'; service: string }
```

Ejemplo JSON:

```json
{
  "message": "Order created",
  "timestamp": "2025-11-10T12:34:56.000Z",
  "context": { "orderId": "order-123" },
  "level": "info",
  "service": "OrderService"
}
```

---

## DTOs de error (ErrorHandler)

Propongo un formato consistente que el ErrorHandler devuelva. El frontend puede mapear `code` para i18n y mostrar `message` de forma segura.

1) ErrorResponse — formato estándar

TypeScript:

```ts
interface ErrorResponse {
  statusCode: number; // HTTP
  error: string;      // breve
  message: string;    // legible para mostrar
  code?: string;      // código interno (ej. ORDER_NOT_FOUND)
  details?: unknown;  // info extra (p. ej. errors de validación)
  timestamp: string;  // ISO
  path?: string;
}
```

Ejemplo JSON (404):

```json
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "Order not found",
  "code": "ORDER_NOT_FOUND",
  "details": null,
  "timestamp": "2025-11-10T12:40:00.000Z",
  "path": "/orders/order-999"
}
```


2) ValidationError — detalles de validación

TypeScript:

```ts
interface FieldError { field: string; message: string }
interface ValidationErrorDetails { errors: FieldError[] }
```

Ejemplo JSON (400):

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "code": "VALIDATION_ERROR",
  "details": { "errors": [ { "field": "productIds", "message": "Must include at least one product" }, { "field": "amount", "message": "Amount must be a positive integer" } ] },
  "timestamp": "2025-11-10T12:45:00.000Z",
  "path": "/orders"
}
```

---

## Recomendaciones rápidas para el frontend
- Validar localmente (ej.: productIds no vacío, amount > 0).
- Convertir strings ISO a Date cuando sea necesario y formatear para UI.
- Mapear códigos (`code`) a mensajes de UX/localización.
- Pedir al backend metadatos de paginación (total, totalPages) si el endpoint no los entrega.

---

## Copiar/pegar — resumen de interfaces TypeScript

```ts
interface OrderInDTO { productIds: string[]; amount: number; state?: STATE_ORDER }
interface EventInDTO { orderId: string; eventType: EVENT_TYPE; metadata?: unknown }
interface PaginationParams { page: number; size: number }

interface OrderOutDTO { orderId: string; productsIds: string[]; amount: number; createdAt: string; updatedAt: string; state: STATE_ORDER }
interface TicketOutDTO { ticketId: string; orderId: string; eventType: EVENT_TYPE; description?: string; createdAt: string; updatedAt: string }

interface ErrorResponse { statusCode: number; error: string; message: string; code?: string; details?: unknown; timestamp: string; path?: string }
```

---

Si quieres que alinee exactamente los nombres (por ejemplo `productIds` vs `productsIds`) con el código actual, puedo leer `src/app/models/index.ts` y el `ErrorHandler` para ajustar la documentación y, opcionalmente, generar un archivo TypeScript exportable con estas interfaces para usar en el frontend.

Archivo generado: `doc.md`
