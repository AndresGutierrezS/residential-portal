import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRecovery } from "@/auth/hooks/recovery/useRecovery";
import { toast } from "sonner";

export const ResetPasswordPage = () => {

  const [params] = useSearchParams();
  const email = params.get("email") || "";
  const code = params.get("code") || "";

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!email || !code) {
        toast.error("Acceso inválido");
        navigate("/auth/forgot-password");
    }
  }, [email, code, navigate]);

  const { resetPassword, resetting } = useRecovery();

  const handleReset = async () => {
    try {
        const res = await resetPassword({
        email,
        code,
        password,
        password_confirmation: passwordConfirmation,
        });

        toast.success(res.message || "Contraseña actualizada");

        navigate("/auth");
    } catch (e: any) {
        toast.error(e.message || "Error al cambiar contraseña");
    }
    };

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-sm">

      <h2 className="text-xl font-semibold text-center">
        Nueva contraseña
      </h2>

      <Input
        type="password"
        placeholder="Nueva contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Input
        type="password"
        placeholder="Confirmar contraseña"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />

      <Button
        onClick={handleReset}
        disabled={resetting || !password || !passwordConfirmation}
        className="w-full"
      >
        {resetting ? "Actualizando..." : "Cambiar contraseña"}
      </Button>

    </div>
  );
};