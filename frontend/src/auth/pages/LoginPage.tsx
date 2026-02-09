import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SelectTrigger, SelectValue, SelectContent, SelectItem, Select } from "@/components/ui/select"
import { useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "sonner"

export const LoginPage = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "user">("user");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login
    setTimeout(() => {
      if (email && password) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("currentUser", email);
        localStorage.setItem("userRole", role);
        localStorage.setItem("userUnit", "305"); // Simulate user's unit
        toast.success("Inicio de sesión exitoso");
        navigate("/");
      } else {
        toast.error("Por favor ingrese email y contraseña");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
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
        </div>
        <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
            id="email"
            type="email"
            placeholder={role === "admin" ? "admin@condominio.com" : "residente@email.com"}
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
    </form>
  )
}
