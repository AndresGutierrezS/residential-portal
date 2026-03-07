import { useEffect, useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import type { Car } from "../interfaces/car.interface"


interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: any) => void
  defaultValues?: Car | null
}

export const CarFormDialog = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues
}: Props) => {

  const [form, setForm] = useState({
    plate: "",
    brand: "",
    model: "",
    color: "",
    apartment_id: ""
  })

  useEffect(() => {

    if (defaultValues) {

      setForm({
        plate: defaultValues.plate,
        brand: defaultValues.brand,
        model: defaultValues.model,
        color: defaultValues.color,
        apartment_id: String(defaultValues.apartment_id)
      })

    }

  }, [defaultValues])

  const handleSubmit = () => {

    onSubmit({
      ...form,
      apartment_id: Number(form.apartment_id)
    })

  }

  return (

    <Dialog open={open} onOpenChange={onOpenChange}>
      
      <DialogContent>
        
        <DialogHeader>
          <DialogTitle>
            {defaultValues ? "Editar Vehículo" : "Nuevo Vehículo"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Placa</Label>
            <Input
              value={form.plate}
              onChange={(e) =>
                setForm({ ...form, plate: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Marca</Label>
            <Input
              value={form.brand}
              onChange={(e) =>
                setForm({ ...form, brand: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Modelo</Label>
            <Input
              value={form.model}
              onChange={(e) =>
                setForm({ ...form, model: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Color</Label>
            <Input
              value={form.color}
              onChange={(e) =>
                setForm({ ...form, color: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Apartment ID</Label>
            <Input
              value={form.apartment_id}
              onChange={(e) =>
                setForm({ ...form, apartment_id: e.target.value })
              }
            />
          </div>

        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            Guardar
          </Button>
        </DialogFooter>

      </DialogContent>

    </Dialog>

  )
}