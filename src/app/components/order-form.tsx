import { useState } from "react";
import { Button, Card, CardBody, CardHeader, Input } from "@heroui/react";
import type { OrderInDTO } from "~/app/types";

interface OrderFormProps {
  onSubmit: (order: OrderInDTO) => Promise<void>;
  isLoading?: boolean;
}

export function OrderForm({ onSubmit, isLoading }: OrderFormProps) {
  const [productIds, setProductIds] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productIdArray = productIds.split(",").map((id) => id.trim()).filter(Boolean);
    await onSubmit({
      productIds: productIdArray,
      amount: parseFloat(amount),
    });
    setProductIds("");
    setAmount("");
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-bold">Crear Orden</h2>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="IDs de Productos (separados por coma)"
            value={productIds}
            onChange={(e) => setProductIds(e.target.value)}
            required
            disabled={isLoading}
          />
          <Input
            label="Monto"
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            disabled={isLoading}
          />
          <Button type="submit" color="primary" isLoading={isLoading}>
            Crear Orden
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
