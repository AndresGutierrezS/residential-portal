import { Calendar, Wrench } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Event } from "@/admin/events/interfaces/event.interface";
import type { PaymentResponse } from "@/admin/payments/interfaces/payment.interface";

interface CommunitySectionProps {
  events: Event[];
  eventsLoading: boolean;
  payments: PaymentResponse[];
  paymentsLoading: boolean;
}

export function CommunitySection({
  events,
  eventsLoading,
  payments,
  paymentsLoading,
}: CommunitySectionProps) {
  const upcomingEvents = events
    .filter(
      (event) =>
        new Date(event.event_date) >= new Date()
    )
    .slice(0, 2);

  const maintenancePayments = payments
    .filter((payment) => payment.maintenance)
    .slice(0, 2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="h-5 w-5 text-purple-600" />
            Próximos Eventos
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {eventsLoading ? (
            <p className="text-center text-gray-500 py-4">
              Cargando eventos...
            </p>
          ) : upcomingEvents.length === 0 ? (
            <p className="text-center text-gray-500 py-4">
              No hay próximos eventos
            </p>
          ) : (
            upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="p-3 bg-purple-50 rounded-lg border border-purple-200"
              >
                <p className="font-medium text-purple-900">
                  {event.title}
                </p>

                <p className="text-sm text-purple-700 mt-1">
                  {new Date(
                    event.event_date
                  ).toLocaleString("es-MX", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>

                {event.location && (
                  <p className="text-sm text-purple-700">
                    {event.location}
                  </p>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Maintenance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Wrench className="h-5 w-5 text-orange-600" />
            Mantenimientos
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {paymentsLoading ? (
            <p className="text-center text-gray-500 py-4">
              Cargando mantenimientos...
            </p>
          ) : maintenancePayments.length === 0 ? (
            <p className="text-center text-gray-500 py-4">
              No hay mantenimientos registrados
            </p>
          ) : (
            maintenancePayments.map((payment) => {
              const maintenance = payment.maintenance!;

              return (
                <div
                  key={maintenance.payment_id}
                  className={`p-3 rounded-lg border ${
                    maintenance.is_completed
                      ? "bg-green-50 border-green-200"
                      : "bg-orange-50 border-orange-200"
                  }`}
                >
                  <p
                    className={`font-medium ${
                      maintenance.is_completed
                        ? "text-green-900"
                        : "text-orange-900"
                    }`}
                  >
                    Mantenimiento{" "}
                    {maintenance.month}/{maintenance.year}
                  </p>

                  <p
                    className={`text-sm mt-1 ${
                      maintenance.is_completed
                        ? "text-green-700"
                        : "text-orange-700"
                    }`}
                  >
                    Monto: $
                    {Number(
                      maintenance.amount
                    ).toLocaleString("es-MX", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>

                  <p
                    className={`text-sm ${
                      maintenance.is_completed
                        ? "text-green-700"
                        : "text-orange-700"
                    }`}
                  >
                    {maintenance.is_completed
                      ? "Mantenimiento completado"
                      : "Mantenimiento pendiente"}
                  </p>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}