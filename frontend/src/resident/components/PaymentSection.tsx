import {
  CreditCard,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { PaymentResponse } from "@/admin/payments/interfaces/payment.interface";

interface PaymentSectionProps {
  payments: PaymentResponse[];
  isLoading: boolean;
}

export function PaymentSection({
  payments,
  isLoading,
}: PaymentSectionProps) {
  const paidPayments = payments.filter(
    (payment) => payment.is_paid === 1
  ).length;

  const totalPayments = payments.length;

  const paymentProgress =
    totalPayments > 0
      ? (paidPayments / totalPayments) * 100
      : 0;

  return (
    <div className="space-y-6">
      {/* Payment Progress */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-green-600" />
                Estado de Pagos
              </CardTitle>

              <CardDescription>
                Progreso de pagos del año 2026
              </CardDescription>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">
                {paidPayments}/{totalPayments}
              </p>

              <p className="text-sm text-gray-600">
                Pagados
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                Progreso anual
              </span>

              <span className="font-medium text-gray-900">
                {Math.round(paymentProgress)}%
              </span>
            </div>

            <Progress
              value={paymentProgress}
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Payments List */}
      <Card>
        <CardHeader>
          <CardTitle>
            Mis Cuotas de Mantenimiento
          </CardTitle>

          <CardDescription>
            Historial de pagos de mi unidad
          </CardDescription>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <p className="text-center text-gray-500 py-6">
              Cargando pagos...
            </p>
          ) : payments.length === 0 ? (
            <p className="text-center text-gray-500 py-6">
              No hay pagos registrados
            </p>
          ) : (
            <div className="space-y-3">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors gap-3"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className={`p-3 rounded-lg ${
                        payment.is_paid === 1
                          ? "bg-green-50"
                          : "bg-red-50"
                      }`}
                    >
                      {payment.is_paid === 1 ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      )}
                    </div>

                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {payment.payment_type.type}
                      </p>

                      <p className="text-sm text-gray-600">
                        {payment.payment_reason.reason}
                      </p>

                      <p className="text-sm text-gray-500">
                        {new Date(
                          payment.date
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="font-bold text-gray-900">
                      $
                      {Number(payment.amount).toLocaleString(
                        "es-MX",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}
                    </p>

                    <Badge
                      variant={
                        payment.is_paid === 1
                          ? "default"
                          : "destructive"
                      }
                    >
                      {payment.is_paid === 1
                        ? "Pagado"
                        : "Pendiente"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}