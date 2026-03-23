import { Button } from "@/components/ui/button"
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Dialog } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import type { Resident } from "../interfaces/resident.interface";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resident: Resident | null;
  onSubmit: (data: any) => void;
}

export const ResidentFormDialog = ({
  open,
  onOpenChange,
  resident,
  onSubmit,
}: Props) => {

  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    second_last_name: "",
    code: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (resident) {
        const nameParts = resident.fullName.split(' ');
      setFormData({
        name: nameParts[0] || "",
        last_name: nameParts[1] || "",
        second_last_name: nameParts[2] || "",
        code: resident.code || "",
        email: resident.email || "",
        phone: resident.phone || "",
      });
    } else {
      setFormData({
        name: "",
        last_name: "",
        second_last_name: "",
        code: "",
        email: "",
        phone: "",
      });
    }
  }, [resident, open]);

  const handleSubmit = () => {
    const payload = {
        name: formData.name,
        last_name: formData.last_name,
        second_last_name: formData.second_last_name || null,
        phone: formData.phone,
        email: formData.email,
        code: formData.code,
        role_id: 1, // temporal
    };
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
                    Complete los datos del residente
                </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                
                <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Juan"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="last_name">Apellido Paterno</Label>
                    <Input
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) =>
                        setFormData({ ...formData, last_name: e.target.value })
                    }
                    placeholder="Pérez"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="second_last_name">Apellido Materno</Label>
                    <Input
                    id="second_last_name"
                    value={formData.second_last_name}
                    onChange={(e) =>
                        setFormData({ ...formData, second_last_name: e.target.value })
                    }
                    placeholder="Pérez"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="code">Código</Label>
                    <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) =>
                        setFormData({ ...formData, code: e.target.value })
                    }
                    placeholder="101"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="juan@email.com"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="555-0101"
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
                    {resident ? "Actualizar" : "Guardar"}
                </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
};