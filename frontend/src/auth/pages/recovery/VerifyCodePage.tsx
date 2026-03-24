import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRecovery } from "@/auth/hooks/recovery/useRecovery";
import { toast } from "sonner";

export const VerifyCodePage = () => {

  const [params] = useSearchParams();
  const email = params.get("email") || "";

  const [code, setCode] = useState("");

  const navigate = useNavigate();
  
  useEffect(() => {
    if (!email) {
        toast.error("Acceso inválido");
        navigate("/auth/forgot-password");
    }
  }, [email, navigate]);

  const { verifyCode, verifying } = useRecovery();

  const handleVerify = async () => {
    try {
        const res = await verifyCode({ email, code });

        toast.success(res.message || "Código válido");

        navigate(`/auth/reset-password?email=${encodeURIComponent(email)}&code=${code}`);
    } catch (e: any) {
        toast.error(e.message || "Código inválido");
    }
    };

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-sm">

      <h2 className="text-xl font-semibold text-center">
        Verificar código
      </h2>

      <Input
        placeholder="Código de 6 dígitos"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <Button
        onClick={handleVerify}
        disabled={verifying || !code}
        className="w-full"
      >
        {verifying ? "Verificando..." : "Verificar código"}
      </Button>

    </div>
  );
};