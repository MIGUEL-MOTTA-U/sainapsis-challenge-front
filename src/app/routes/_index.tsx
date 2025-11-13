import { useState, useEffect } from "react";
import { Navbar } from "~/app/components/navbar";
import { OrderForm } from "~/app/components/order-form";
import { EventForm } from "~/app/components/event-form";
import { api } from "~/app/services/api";
import { Card, CardBody, CardHeader } from "@heroui/react";
import type { OrderOutDTO, TicketOutDTO, OrderInDTO, EventInDTO } from "~/app/types";

export default function Index() {
  useEffect(() => {
    document.title = "API REST Client";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Cliente simple para API REST");
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = "Cliente simple para API REST";
      document.head.appendChild(meta);
    }
  }, []);
  const [orderResponse, setOrderResponse] = useState<OrderOutDTO | null>(null);
  const [eventResponse, setEventResponse] = useState<TicketOutDTO | null>(null);
  const [isLoadingOrder, setIsLoadingOrder] = useState(false);
  const [isLoadingEvent, setIsLoadingEvent] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [eventError, setEventError] = useState<string | null>(null);

  const handleCreateOrder = async (orderData: OrderInDTO) => {
    try {
      setIsLoadingOrder(true);
      setOrderError(null);
      const response = await api.createOrder(orderData);
      setOrderResponse(response);
    } catch (err) {
      setOrderError(err instanceof Error ? err.message : 'Error al crear orden');
      setOrderResponse(null);
    } finally {
      setIsLoadingOrder(false);
    }
  };

  const handleCreateEvent = async (eventData: EventInDTO) => {
    try {
      setIsLoadingEvent(true);
      setEventError(null);
      const response = await api.createEvent(eventData);
      setEventResponse(response);
    } catch (err) {
      setEventError(err instanceof Error ? err.message : 'Error al crear evento');
      setEventResponse(null);
    } finally {
      setIsLoadingEvent(false);
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-8">
          <div className="space-y-6">
            <OrderForm onSubmit={handleCreateOrder} isLoading={isLoadingOrder} />
            
            {orderError && (
              <Card className="border-red-400 bg-red-50">
                <CardBody>
                  <p className="text-red-700">{orderError}</p>
                </CardBody>
              </Card>
            )}
            
            {orderResponse && (
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-bold">Orden Creada</h3>
                </CardHeader>
                <CardBody>
                  <pre className="text-sm bg-gray-100 p-4 rounded overflow-auto">
                    {JSON.stringify(orderResponse, null, 2)}
                  </pre>
                </CardBody>
              </Card>
            )}
          </div>
          
          <div className="space-y-6">
            <EventForm onSubmit={handleCreateEvent} isLoading={isLoadingEvent} />
            
            {eventError && (
              <Card className="border-red-400 bg-red-50">
                <CardBody>
                  <p className="text-red-700">{eventError}</p>
                </CardBody>
              </Card>
            )}
            
            {eventResponse && (
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-bold">Evento Creado</h3>
                </CardHeader>
                <CardBody>
                  <pre className="text-sm bg-gray-100 p-4 rounded overflow-auto">
                    {JSON.stringify(eventResponse, null, 2)}
                  </pre>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
