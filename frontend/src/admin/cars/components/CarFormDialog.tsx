import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Car } from "../interfaces/car.interface";
import { useApartments } from "@/admin/apartments/hooks/useApartments";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  defaultValues?: Car | null;
}

export const CarFormDialog = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
}: Props) => {

  const { apartments } = useApartments();

  const [form, setForm] = useState({
    plate: "",
    brand: "",
    model: "",
    color: "",
    apartment_id: "",
  });

  useEffect(() => {
    if (defaultValues) {
      setForm({
        plate: defaultValues.plate,
        brand: defaultValues.brand,
        model: defaultValues.model,
        color: defaultValues.color,
        apartment_id: String(defaultValues.apartment_id),
      });

      return;
    }

    setForm({
      plate: "",
      brand: "",
      model: "",
      color: "",
      apartment_id: "",
    });
  }, [defaultValues, open]);

  const handleSubmit = () => {
    onSubmit({
      ...form,
      apartment_id: Number(form.apartment_id),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>

      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            {defaultValues
              ? "Editar Vehículo"
              : "Nuevo Vehículo"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">

          <div className="space-y-2">
            <Label>Placa</Label>

            <Input
              value={form.plate}
              onChange={(e) =>
                setForm({
                  ...form,
                  plate: e.target.value,
                })
              }
              placeholder="Ej. ABC-123"
            />
          </div>

          <div className="space-y-2">
            <Label>Marca</Label>

            <Input
              value={form.brand}
              onChange={(e) =>
                setForm({
                  ...form,
                  brand: e.target.value,
                })
              }
              placeholder="Ej. Toyota"
            />
          </div>

          <div className="space-y-2">
            <Label>Modelo</Label>

            <Input
              value={form.model}
              onChange={(e) =>
                setForm({
                  ...form,
                  model: e.target.value,
                })
              }
              placeholder="Ej. Corolla"
            />
          </div>

          <div className="space-y-2">
            <Label>Color</Label>

            <Input
              value={form.color}
              onChange={(e) =>
                setForm({
                  ...form,
                  color: e.target.value,
                })
              }
              placeholder="Ej. Blanco"
            />
          </div>

          <div className="space-y-2 col-span-2">
            <Label>Departamento</Label>

            <Select
              value={form.apartment_id}
              onValueChange={(value) =>
                setForm({
                  ...form,
                  apartment_id: value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un departamento" />
              </SelectTrigger>

              <SelectContent>
                {apartments.map((apartment) => (
                  <SelectItem
                    key={apartment.id}
                    value={String(apartment.id)}
                  >
                    {apartment.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
  );
};