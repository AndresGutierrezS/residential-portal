import { useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRecovery } from "@/auth/hooks/recovery/useRecovery";
import { toast } from "sonner";

export const ForgotPasswordPage = () => {

  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const { sendCode, sending } = useRecovery();

  const handleSubmit = async () => {
    try {
      const res = await sendCode(email);

      toast.success(res.message || "Código enviado");

      navigate(`/auth/verify-code?email=${encodeURIComponent(email)}`);
    } catch (e: any) {
      toast.error(e.message || "Error al enviar código");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-sm">

      <h2 className="text-xl font-semibold text-center">
        Recuperar contraseña
      </h2>

      <Input
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button
        onClick={handleSubmit}
        disabled={sending || !email}
        className="w-full"
      >
        {sending ? "Enviando..." : "Enviar código"}
      </Button>

    </div>
  );
};