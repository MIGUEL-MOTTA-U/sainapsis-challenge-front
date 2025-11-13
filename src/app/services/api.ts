import type { OrderInDTO, OrderOutDTO, EventInDTO, TicketOutDTO } from '~/app/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Error desconocido' }));
    throw new Error(error.message || 'Error en la petición');
  }

  return response.json();
}

export const api = {
  createOrder: (data: OrderInDTO): Promise<OrderOutDTO> => {
    return fetchAPI<OrderOutDTO>('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  createEvent: (data: EventInDTO): Promise<TicketOutDTO> => {
    return fetchAPI<TicketOutDTO>(`/orders/${data.orderId}/events`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
