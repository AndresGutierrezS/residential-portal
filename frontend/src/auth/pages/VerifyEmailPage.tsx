import { useSearchParams, Link } from "react-router";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";

export const VerifyEmailPage = () => {

  const [params] = useSearchParams();
  const status = params.get("status");

  const success = status === "success";

  return (
    <div className="flex flex-col items-center text-center space-y-4">

      {success ? (
        <CheckCircle2 className="h-12 w-12 text-green-500" />
      ) : (
        <XCircle className="h-12 w-12 text-red-500" />
      )}

      <h2 className="text-xl font-semibold">
        {success ? "Correo verificado" : "Error de verificación"}
      </h2>

      <p className="text-sm text-muted-foreground">
        {success
          ? "Tu correo ha sido verificado correctamente. Ahora puedes iniciar sesión."
          : "El enlace es inválido o ha expirado. Intenta registrarte nuevamente o solicita otro enlace."}
      </p>

      <Button asChild className="w-full mt-2">
        <Link to="/auth">
          Ir a iniciar sesión
        </Link>
      </Button>

    </div>
  );
};