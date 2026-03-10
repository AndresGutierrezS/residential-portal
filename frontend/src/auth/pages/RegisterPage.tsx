import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { useAuthStore } from "../store/auth.store"


export const RegisterPage = () => {

  const navigate = useNavigate()
  const {register} = useAuthStore();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== passwordConfirmation) {
      toast.error("Las contraseñas no coinciden")
      return
    }

    setIsLoading(true)

    try {

      await register({
        email,
        password,
        password_confirmation: passwordConfirmation
      })

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
        <Label>Correo Electrónico</Label>
        <Input
          type="email"
          placeholder="residente@email.com"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Contraseña</Label>
        <Input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Repetir Contraseña</Label>
        <Input
          type="password"
          placeholder="••••••••"
          value={passwordConfirmation}
          onChange={(e)=>setPasswordConfirmation(e.target.value)}
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

    </form>
  )
}