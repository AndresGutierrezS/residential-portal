import { CreditCard, CheckCircle, AlertCircle, Home, Calendar, Users, Wrench } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

export function HomePage() {
  const userUnit = localStorage.getItem("userUnit") || "N/A";
  const currentUser = localStorage.getItem("currentUser") || "Usuario";
  const userName = currentUser.split('@')[0];

  // Simulated user property data
  const propertyInfo = {
    unit: userUnit,
    floor: "3",
    area: "95m²",
    bedrooms: "3",
    bathrooms: "2",
    parking: "1 espacio",
  };

  // Simulated user payments data
  const userPayments = [
    { month: "Enero 2026", amount: 850, status: "paid", date: "2026-01-05" },
    { month: "Febrero 2026", amount: 850, status: "pending", dueDate: "2026-02-05" },
    { month: "Marzo 2026", amount: 850, status: "upcoming", dueDate: "2026-03-05" },
  ];

  const paidPayments = userPayments.filter((p) => p.status === "paid").length;
  const totalPayments = userPayments.length;
  const paymentProgress = (paidPayments / totalPayments) * 100;

  const handlePayment = (month: string) => {
    toast.success(`Redirigiendo a pasarela de pago para ${month}`);
    // Here you would integrate with a payment gateway
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              ¡Hola, {userName}! 👋
            </h1>
            <p className="text-gray-600 mt-1">
              Bienvenido a tu portal de residente
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
            <Home className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-xs text-blue-600 font-medium">Mi Unidad</p>
              <p className="text-lg font-bold text-blue-900">{userUnit}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Property Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5 text-blue-600" />
            Información de Mi Propiedad
          </CardTitle>
          <CardDescription>Detalles de tu unidad</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Unidad</p>
              <p className="text-xl font-bold text-gray-900">{propertyInfo.unit}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Piso</p>
              <p className="text-xl font-bold text-gray-900">{propertyInfo.floor}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Área</p>
              <p className="text-xl font-bold text-gray-900">{propertyInfo.area}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Habitaciones</p>
              <p className="text-xl font-bold text-gray-900">{propertyInfo.bedrooms}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Baños</p>
              <p className="text-xl font-bold text-gray-900">{propertyInfo.bathrooms}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Estacionamiento</p>
              <p className="text-xl font-bold text-gray-900">{propertyInfo.parking}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Progress */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-green-600" />
                Estado de Pagos
              </CardTitle>
              <CardDescription>Progreso de pagos del año 2026</CardDescription>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">{paidPayments}/{totalPayments}</p>
              <p className="text-sm text-gray-600">Pagados</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Progreso anual</span>
              <span className="font-medium text-gray-900">{Math.round(paymentProgress)}%</span>
            </div>
            <Progress value={paymentProgress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Payments List */}
      <Card>
        <CardHeader>
          <CardTitle>Mis Cuotas de Mantenimiento</CardTitle>
          <CardDescription>
            Cuota mensual: <span className="font-bold text-gray-900">$850</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {userPayments.map((payment, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors gap-3"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`p-3 rounded-lg ${
                    payment.status === "paid" 
                      ? "bg-green-50" 
                      : payment.status === "pending"
                      ? "bg-red-50"
                      : "bg-gray-50"
                  }`}>
                    {payment.status === "paid" ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : payment.status === "pending" ? (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    ) : (
                      <Calendar className="h-5 w-5 text-gray-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{payment.month}</p>
                    <p className="text-sm text-gray-600">
                      {payment.status === "paid" 
                        ? `Pagado el ${payment.date}` 
                        : payment.status === "pending"
                        ? `⚠️ Vence el ${payment.dueDate}`
                        : `Próximo vencimiento: ${payment.dueDate}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:flex-row-reverse">
                  {payment.status === "pending" && (
                    <Button 
                      size="sm"
                      onClick={() => handlePayment(payment.month)}
                      className="w-full sm:w-auto"
                    >
                      Pagar Ahora
                    </Button>
                  )}
                  <div className="text-left sm:text-right">
                    <p className="font-bold text-gray-900">${payment.amount}</p>
                    <Badge
                      variant={
                        payment.status === "paid"
                          ? "default"
                          : payment.status === "pending"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {payment.status === "paid"
                        ? "Pagado"
                        : payment.status === "pending"
                        ? "Pendiente"
                        : "Próximo"}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Community Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-purple-600" />
              Próximos Eventos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
              <p className="font-medium text-purple-900">Reunión de Copropietarios</p>
              <p className="text-sm text-purple-700 mt-1">
                Viernes 31 de enero • 6:00 PM
              </p>
              <p className="text-sm text-purple-700">Salón Comunal</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="font-medium text-blue-900">Día de la Familia</p>
              <p className="text-sm text-blue-700 mt-1">
                Sábado 15 de febrero • 10:00 AM
              </p>
              <p className="text-sm text-blue-700">Área de Piscina</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Wrench className="h-5 w-5 text-orange-600" />
              Mantenimientos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
              <p className="font-medium text-orange-900">Mantenimiento Elevador</p>
              <p className="text-sm text-orange-700 mt-1">
                Mañana • 9:00 AM - 12:00 PM
              </p>
              <p className="text-sm text-orange-700">Servicio interrumpido</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="font-medium text-green-900">Limpieza de Tanque</p>
              <p className="text-sm text-green-700 mt-1">
                Próximo mes • Por confirmar
              </p>
              <p className="text-sm text-green-700">Se notificará con anticipación</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Contact */}
      <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-lg">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium">¿Necesitas ayuda?</p>
                <p className="text-sm text-blue-100">Contacta a la administración</p>
              </div>
            </div>
            <Button variant="secondary" size="sm">
              Enviar Mensaje
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
