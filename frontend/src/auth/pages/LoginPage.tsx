import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SelectTrigger, SelectValue, SelectContent, SelectItem, Select } from "@/components/ui/select"
import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { toast } from "sonner"
import { useAuthStore } from "../store/auth.store"

export const LoginPage = () => {
  const navigate = useNavigate();
  
  const login = useAuthStore(state => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //const [role, setRole] = useState<"admin" | "user">("user");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(email, password);

    if (success) {
      toast.success("Inicio de sesión exitoso");
      navigate("/");
    } else {
      toast.error("Por favor ingrese email y contraseña");
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
        {/* <div className="space-y-2">
            <Label htmlFor="role">Tipo de Usuario</Label>
            <Select value={role} onValueChange={(value: "admin" | "user") => setRole(value)}>
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="user">Residente</SelectItem>
            </SelectContent>
            </Select>
        </div> */}
        <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
            id="email"
            type="email"
            placeholder={"residente@email.com"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </div>
        <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </div>
        <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
        >
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </Button>

        <div className="text-center text-sm text-muted-foreground">
         ¿No tienes una cuenta?{" "}
            <Link
            to="/auth/register"
            className="font-medium text-primary underline-offset-4 hover:underline"
            >
                Registrate
            </Link>
      </div>
    </form>
  )
}
