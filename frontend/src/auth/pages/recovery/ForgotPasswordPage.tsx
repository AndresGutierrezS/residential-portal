import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const ForgotPasswordPage = () => {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Error al enviar el código");
    }
  };

  return (
    <div className="flex flex-col space-y-4 w-full max-w-sm">

      <h2 className="text-xl font-semibold text-center">
        Recuperar contraseña
      </h2>

      <Input
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button onClick={handleSubmit}>
        Enviar código
      </Button>

      {message && (
        <p className="text-sm text-center text-muted-foreground">
          {message}
        </p>
      )}

    </div>
  );
};