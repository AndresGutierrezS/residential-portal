import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { toast } from "sonner"
import { useAuthStore } from "../store/auth.store"
import type { RegisterDto } from "../interfaces/register.dto"


export const RegisterPage = () => {

  const navigate = useNavigate()
  const { register } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<RegisterDto>({
    name: "",
    last_name: "",
    second_last_name: "",
    phone: "",
    email: "",
    password: "",
    password_confirmation: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.password_confirmation) {
      toast.error("Las contraseñas no coinciden")
      return
    }

    setIsLoading(true)

    try {
      await register(formData);
      toast.success("Registro exitoso. Revisa tu correo para verificar tu cuenta.")
      navigate("/auth")
    } catch (error) {
      toast.error("No se pudo registrar el usuario")
    }

    setIsLoading(false)
  }

  return (

    <form onSubmit={handleRegister} className="space-y-4">

      <div className="space-y-2">
        <Label>Nombre</Label>
        <Input
          name="name"
          type="text"
          placeholder="nombre"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
     
      <div className="space-y-2">
        <Label>Apellido Paterno</Label>
        <Input
          name="last_name"
          type="text"
          placeholder="Apellido Paterno"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label>Apellido Materno</Label>
        <Input
          name="second_last_name"
          type="text"
          placeholder="Apellido Materno"
          value={formData.second_last_name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label>Telefono</Label>
        <Input
          name="phone"
          type="tel"
          placeholder="Telefono"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label>Correo Electrónico</Label>
        <Input
          name="email"
          type="email"
          placeholder="residente@email.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Contraseña</Label>
        <Input
          name="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Repetir Contraseña</Label>
        <Input
          name="password_confirmation"
          type="password"
          placeholder="••••••••"
          value={formData.password_confirmation}
          onChange={handleChange}
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Registrando..." : "Registrarse"}
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        ¿Ya tienes una cuenta?{" "}
        <Link
          to="/auth"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Inicia sesión
        </Link>
      </div>

    </form>
  )
}