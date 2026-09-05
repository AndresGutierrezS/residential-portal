import { Users, Building, CreditCard, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usePayments } from "../payments/hooks/usePayments";
import { useApartments } from "../apartments/hooks/useApartments";
import { useReports } from "../reports/hooks/useReports";
import { LoadingSpinner } from "@/components/custom/LoadingSpinner";

export const DashboardPage = () => {
  const { apartments, isLoading: isApartmentsLoading } = useApartments();
  const { payments, isLoading: isPaymentsLoading } = usePayments();
  const { data: residents, isLoading: isResidentsLoading } = useReports("residents");

  const totalUnits = apartments.length;

  const occupiedUnits = apartments.filter(
      (apartment) => apartment.status === "occupied"
  ).length;

  const pendingPayments = payments.filter(
      (payment) => !payment.isPaid
  );

  const pendingPaymentsAmount = pendingPayments.reduce(
      (total, payment) => total + payment.amount,
      0
  );

  const occupancyPercentage =
    totalUnits > 0
        ? Math.round((occupiedUnits / totalUnits) * 100)
        : 0;

  const totalResidents = residents.length;

    
  const stats = [
    {
        title: "Total Residentes",
        value: totalResidents,
        description: "Registrados",
        icon: Users,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
    },
    {
      title: "Unidades",
      value: totalUnits,
      description: `${occupancyPercentage}% ocupación`,
      icon: Building,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
        title: "Pagos Pendientes",
        value: `$${pendingPaymentsAmount.toLocaleString("es-MX")}`,
        description: `${pendingPayments.length} registros`,
        icon: CreditCard,
        color: "text-orange-600",
        bgColor: "bg-orange-50",
    },
    
  ];

  const recentPayments = [...payments]
    .sort(
        (a, b) =>
            new Date(b.date).getTime() -
            new Date(a.date).getTime()
    )
    .slice(0, 5);

  if (
      isApartmentsLoading ||
      isPaymentsLoading ||
      isResidentsLoading
  ) {
      return <LoadingSpinner show />
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Bienvenido al sistema de gestión del condominio</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-600 mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
          <CardDescription>Últimas acciones en el sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPayments.map((payment) => (
                <div
                    key={payment.id}
                    className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0"
                >
                    <div className="flex-1">
                        <p className="font-medium text-gray-900">
                            {payment.isPaid
                              ? "Pago realizado"
                              : "Pago pendiente"}
                        </p>

                        <p className="text-sm text-gray-600">
                            {payment.apartment?.code} - $
                            {Number(payment.amount).toLocaleString("es-MX")}
                        </p>
                    </div>

                    <span className="text-sm text-gray-500">
                        {new Date(payment.date).toLocaleDateString("es-MX")}
                    </span>
                </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
