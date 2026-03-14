import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "sonner"
import { useNavigate } from "react-router"
import { changePasswordAction } from "../actions/changePassword.action"

export const ChangePasswordPage = () => {

  const navigate = useNavigate()

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      toast.error("Las contraseñas no coinciden")
      return
    }

    setIsLoading(true)

    const success = await changePasswordAction({
      current_password: currentPassword,
      new_password: newPassword,
      new_password_confirmation: confirmPassword
    })

    if (success) {
      toast.success("Contraseña actualizada. Debes iniciar sesión nuevamente.")
      localStorage.removeItem("token")
      navigate("/auth")
    } else {
      toast.error("No se pudo cambiar la contraseña")
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <div className="space-y-2">
        <Label>Contraseña actual</Label>
        <Input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Nueva contraseña</Label>
        <Input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Confirmar nueva contraseña</Label>
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <Button className="w-full" disabled={isLoading}>
        {isLoading ? "Actualizando..." : "Cambiar contraseña"}
      </Button>

    </form>
  )
}