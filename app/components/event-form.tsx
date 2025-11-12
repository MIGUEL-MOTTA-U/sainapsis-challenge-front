import { useState } from "react";
import { Button, Card, CardBody, CardHeader, Input, Select, SelectItem, Textarea } from "@heroui/react";
import type { EventInDTO, EVENT_TYPE } from "~/types";

interface EventFormProps {
  onSubmit: (event: EventInDTO) => Promise<void>;
  isLoading?: boolean;
}

export function EventForm({ onSubmit, isLoading }: EventFormProps) {
  const [orderId, setOrderId] = useState("");
  const [eventType, setEventType] = useState<EVENT_TYPE>("PENDING_BIOMETRICAL_VERIFICATION");
  const [metadata, setMetadata] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let parsedMetadata: Record<string, any> = {};
    
    if (metadata.trim()) {
      try {
        parsedMetadata = JSON.parse(metadata);
      } catch (error) {
        alert("Metadata debe ser un JSON válido");
        return;
      }
    }

    await onSubmit({
      orderId: orderId,
      eventType: eventType,
      metadata: parsedMetadata,
    });
    setOrderId("");
    setMetadata("");
    setEventType("PENDING_BIOMETRICAL_VERIFICATION");
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-bold">Crear Evento</h2>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="ID de Orden"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
            disabled={isLoading}
          />
          <Select
            label="Tipo de Evento"
            selectedKeys={[eventType]}
            onSelectionChange={(keys) => setEventType(Array.from(keys)[0] as EVENT_TYPE)}
            disabled={isLoading}
          >
            <SelectItem key="PENDING_BIOMETRICAL_VERIFICATION">PENDING_BIOMETRICAL_VERIFICATION</SelectItem>
            <SelectItem key="NO_VERIFICATION_NEEDED">NO_VERIFICATION_NEEDED</SelectItem>
            <SelectItem key="PAYMENT_FAILED">PAYMENT_FAILED</SelectItem>
            <SelectItem key="ORDER_CANCELLED">ORDER_CANCELLED</SelectItem>
            <SelectItem key="BIOMETRICAL_VERIFICATION_SUCCESSFUL">BIOMETRICAL_VERIFICATION_SUCCESSFUL</SelectItem>
            <SelectItem key="VERIFICATION_FAILED">VERIFICATION_FAILED</SelectItem>
            <SelectItem key="ORDER_CANCELLED_BY_USER">ORDER_CANCELLED_BY_USER</SelectItem>
            <SelectItem key="PAYMENT_SUCCESSFUL">PAYMENT_SUCCESSFUL</SelectItem>
            <SelectItem key="PREPARING_SHIPMENT">PREPARING_SHIPMENT</SelectItem>
            <SelectItem key="ITEM_DISPATCHED">ITEM_DISPATCHED</SelectItem>
            <SelectItem key="ITEM_RECEIVED_BY_CUSTOMER">ITEM_RECEIVED_BY_CUSTOMER</SelectItem>
            <SelectItem key="DELIVERY_ISSUE">DELIVERY_ISSUE</SelectItem>
            <SelectItem key="RETURN_INITIATED_BY_CUSTOMER">RETURN_INITIATED_BY_CUSTOMER</SelectItem>
            <SelectItem key="ITEM_RECEIVED_BACK">ITEM_RECEIVED_BACK</SelectItem>
            <SelectItem key="REFUND_PROCESSED">REFUND_PROCESSED</SelectItem>
          </Select>
          <Textarea
            label="Metadata (JSON)"
            placeholder='{"key": "value"}'
            value={metadata}
            onChange={(e) => setMetadata(e.target.value)}
            disabled={isLoading}
          />
          <Button type="submit" color="primary" isLoading={isLoading} isDisabled={!orderId}>
            Crear Evento
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
