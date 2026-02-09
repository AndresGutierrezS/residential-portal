import { Users, Building, CreditCard, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const DashboardPage = () => {
  const stats = [
    {
      title: "Total Residentes",
      value: "245",
      description: "+12 este mes",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Unidades",
      value: "120",
      description: "96 ocupadas",
      icon: Building,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Pagos Pendientes",
      value: "$45,250",
      description: "15 cuentas",
      icon: CreditCard,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Mensajes",
      value: "89",
      description: "Últimas 24 horas",
      icon: MessageSquare,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Bienvenido al sistema de gestión del condominio</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            {[
              {
                action: "Nuevo pago registrado",
                details: "Unidad 305 - $850",
                time: "Hace 2 horas",
              },
              {
                action: "Residente agregado",
                details: "María González - Unidad 412",
                time: "Hace 5 horas",
              },
              {
                action: "Mensaje en chat",
                details: "Anuncio de mantenimiento",
                time: "Hace 1 día",
              },
              {
                action: "Pago pendiente",
                details: "Unidad 201 - Recordatorio enviado",
                time: "Hace 2 días",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.action}</p>
                  <p className="text-sm text-gray-600">{item.details}</p>
                </div>
                <span className="text-sm text-gray-500">{item.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
