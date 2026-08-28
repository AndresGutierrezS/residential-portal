import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import type { Resident, ResidentDTO } from "../interfaces/resident.interface";
import { useResidentFormData } from "../hooks/useResidentFormData";
import { useApartments } from "@/admin/apartments/hooks/useApartments";


interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resident: Resident | null;
  onSubmit: (data: ResidentDTO) => void;
}

export const ResidentFormDialog = ({
  open,
  onOpenChange,
  resident,
  onSubmit,
}: Props) => {
    const { pendingPeople, isLoading, roles } = useResidentFormData();

    const { apartments } = useApartments();
  
    const [formData, setFormData] = useState({
        person_id: "",
        apartment_id: "",
        role_id: "",
    });


  useEffect(() => {
    setFormData({
        person_id: "",
        apartment_id: "",
        role_id: "",
    });
  }, [resident, open]);

  const handleSubmit = () => {
    const payload = {
      person_id: Number(formData.person_id),
      apartment_id: Number(formData.apartment_id),
      role_id: Number(formData.role_id),
      is_resident: true,
    }
    
    onSubmit(payload);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {resident ? "Editar Residente" : "Nuevo Residente"}
          </DialogTitle>

          <DialogDescription>
            Asigne una persona a un apartamento
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Persona</Label>

            <Select
              value={formData.person_id}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  person_id: value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione una persona" />
              </SelectTrigger>

              <SelectContent>
                {pendingPeople.map((person) => (
                    <SelectItem 
                        key={person.id}
                        value={String(person.id)}
                    >
                        {person.name} {person.last_name} {person.second_last_name}
                        {" - "}
                        {person.user?.email}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Unidad</Label>

            <Select
              value={formData.apartment_id}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  apartment_id: value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un apartamento" />
              </SelectTrigger>

              <SelectContent>
                {apartments
                    .filter((apartment) => apartment.status === "vacant")
                    .map((apartment) => (
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


            <div className="space-y-2">
                <Label>Rol</Label>

                <Select
                    value={formData.role_id}
                    onValueChange={(value) =>
                        setFormData({
                            ...formData,
                            role_id: value,
                        })
                    }
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Seleccione un rol" />
                    </SelectTrigger>

                    <SelectContent>
                        {roles.map((role) => (
                            <SelectItem
                                key={role.id}
                                value={String(role.id)}
                            >
                                {role.role}
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
            {resident ? "Actualizar" : "Guardar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};