import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type STATE_ORDER = 
  | 'PENDING'
  | 'ON_HOLD'
  | 'PENDING_PAYMENT'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'RETURNING'
  | 'RETURNED'
  | 'REFUNDED'
  | 'CANCELLED';

export type EVENT_TYPE = 
  | 'PENDING_BIOMETRICAL_VERIFICATION'
  | 'NO_VERIFICATION_NEEDED'
  | 'PAYMENT_FAILED'
  | 'ORDER_CANCELLED'
  | 'BIOMETRICAL_VERIFICATION_SUCCESSFUL'
  | 'VERIFICATION_FAILED'
  | 'ORDER_CANCELLED_BY_USER'
  | 'PAYMENT_SUCCESSFUL'
  | 'PREPARING_SHIPMENT'
  | 'ITEM_DISPATCHED'
  | 'ITEM_RECEIVED_BY_CUSTOMER'
  | 'DELIVERY_ISSUE'
  | 'RETURN_INITIATED_BY_CUSTOMER'
  | 'ITEM_RECEIVED_BACK'
  | 'REFUND_PROCESSED';

export interface OrderInDTO {
  productIds: string[];
  amount: number;
  state?: STATE_ORDER;
}

export interface EventInDTO {
  orderId: string;
  eventType: EVENT_TYPE;
  metadata?: unknown;
}

export interface PaginationParams {
  page: number;
  size: number;
}

export interface OrderOutDTO {
  orderId: string;
  productsIds: string[];
  amount: number;
  createdAt: string;
  updatedAt: string;
  state: STATE_ORDER;
}

export interface TicketOutDTO {
  ticketId: string;
  orderId: string;
  eventType: EVENT_TYPE;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ErrorResponse {
  statusCode: number;
  error: string;
  message: string;
  code?: string;
  details?: unknown;
  timestamp: string;
  path?: string;
}
