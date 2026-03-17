import { Button } from "@/components/ui/button"
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Dialog } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resident: any | null;
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
    unit: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (resident) {
      setFormData({
        name: resident.name || "",
        unit: resident.unit || "",
        email: resident.email || "",
        phone: resident.phone || "",
      });
    } else {
      setFormData({
        name: "",
        unit: "",
        email: "",
        phone: "",
      });
    }
  }, [resident, open]);

  const handleSubmit = () => {
    onSubmit(formData);
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
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Juan Pérez"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="unit">Unidad</Label>
                    <Input
                    id="unit"
                    value={formData.unit}
                    onChange={(e) =>
                        setFormData({ ...formData, unit: e.target.value })
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