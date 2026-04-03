import { Button } from "@/components/ui/button"
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Dialog } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SelectTrigger, SelectValue, SelectContent, SelectItem, Select } from "@/components/ui/select"
import { useEffect, useState } from "react"
import type { Apartment, ApartmentDTO, ApartmentForm } from "../interfaces/apartment.interface"

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: ApartmentDTO) => void;
    initialData?: Apartment; 
}

export const ApartmentDialog = ({ onOpenChange, onSubmit, open, initialData}: Props) => {
    
    const [formData, setFormData] = useState<ApartmentForm>({
        code: '',
        status: "vacant",
        area: '',
        floor: '',
        owner: '',
    });

    useEffect(() => {
        if(initialData) {
            setFormData({
                code: initialData.code,
                status: initialData.status,
                floor: String(initialData.floor),
                area: '85m2',
                owner: '',
            });
        } else {
            setFormData({
                code: "",
                status: "vacant",
                area: '',
                floor: '',
                owner: '',
            })
        }
    }, [initialData]);

    const handleSubmit = () => {
        if(!formData.code) return;

        const dto: ApartmentDTO = {
          code: formData.code,
          status: formData.status,
        }

        onSubmit(dto);
        setFormData({
            code: "",
            status: "vacant",
            area: '',
            floor: '',
            owner: '',
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{initialData ? "Editar Unidad" : "Nueva Unidad"}</DialogTitle>
              <DialogDescription>Complete los datos de la unidad</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="code">Código</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="101"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="floor">Piso</Label>
                <Input
                  id="floor"
                  value={formData.floor}
                  onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                  placeholder="1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Área</Label>
                <Input
                  id="area"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  placeholder="85m²"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Estado</Label>
                <Select value={formData.status} onValueChange={(value: 'occupied'|'vacant'|'maintenance') => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="occupied">Ocupada</SelectItem>
                    <SelectItem value="vacant">Disponible</SelectItem>
                    <SelectItem value="maintenance">Mantenimiento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="owner">Propietario</Label>
                <Input
                  id="owner"
                  value={formData.owner}
                  onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                  placeholder="Nombre del propietario"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit}>
                {initialData ? "Actualizar" : "Guardar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
  )
}
