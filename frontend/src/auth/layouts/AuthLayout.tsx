import { Outlet, useLocation } from "react-router";
import { Building2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


export const AuthLayout = () => {
  const location = useLocation();

  const subtitleMap: Record<string, string> = {
    "/auth": "Iniciar sesión",
    "/auth/register": "Crear una cuenta",
    "/auth/verify-email": "Verificación de correo"
  };

const subtitle = subtitleMap[location.pathname] ?? "";

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-1">
          <div className="flex justify-center mb-2">
            <div className="bg-blue-600 p-3 rounded-full">
              <Building2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">Portal Gate</CardTitle>
          <CardDescription>
            Sistema de Gestión de Condominios
          </CardDescription>
          <p className="text-md text-muted-foreground font-medium">
            {subtitle}
          </p>
        </CardHeader>
        <CardContent>
          <Outlet />
        </CardContent>
      </Card>
    </div>
  );
}