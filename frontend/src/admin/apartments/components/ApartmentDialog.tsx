import { Button } from "@/components/ui/button"
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Dialog } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SelectTrigger, SelectValue, SelectContent, SelectItem, Select } from "@/components/ui/select"
import { useEffect, useState } from "react"
import type { Apartment, ApartmentDTO, ApartmentForm } from "../interfaces/apartment.interface"
import { buildApartmentCode, parseApartmentCode } from "../utils/apartmentCode.util"

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: ApartmentDTO) => void;
    initialData?: Apartment; 
}

export const ApartmentDialog = ({ onOpenChange, onSubmit, open, initialData}: Props) => {
    
    const [formData, setFormData] = useState<ApartmentForm>({
        tower: '',
        floor: '',
        number: '',
        status: "vacant",
        area: '',
    });

    useEffect(() => {
        if(initialData) {
          const parsedCode = parseApartmentCode(initialData.code);

          if(!parsedCode) {
            return;
          } 
          
          setFormData({
            tower: parsedCode.tower,
            floor: parsedCode.floor,
            number: parsedCode.number,
            status: initialData.status,
            area: String(initialData.area),
              });
        } else {
            setFormData({
                tower: "",
                floor: "",
                number: "",
                status: "vacant",
                area: "",
            });
        }
    }, [initialData]);

    const handleSubmit = () => {
        if (
            !formData.tower ||
            !formData.floor ||
            !formData.number ||
            !formData.area
        ) {
            return;
        }

        const code = buildApartmentCode(
            formData.tower,
            formData.floor,
            formData.number
        );

        const dto: ApartmentDTO = {
            code,
            status: formData.status,
            area: Number(formData.area),
        };

        onSubmit(dto);

        setFormData({
            tower: "",
            floor: "",
            number: "",
            status: "vacant",
            area: "",
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{initialData ? "Editar Unidad" : "Nueva Unidad"}</DialogTitle>
              <DialogDescription>Complete los datos de la unidad</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                  <Label htmlFor="tower">Torre</Label>

                  <Select
                      value={formData.tower}
                      onValueChange={(value) =>
                          setFormData({ ...formData, tower: value })
                      }
                  >
                      <SelectTrigger>
                          <SelectValue placeholder="Selecciona una torre" />
                      </SelectTrigger>

                      <SelectContent>
                          <SelectItem value="A">Torre A</SelectItem>
                          <SelectItem value="B">Torre B</SelectItem>
                          <SelectItem value="C">Torre C</SelectItem>
                      </SelectContent>
                  </Select>
              </div>
              <div className="space-y-2">
                  <Label htmlFor="floor">Piso</Label>

                  <Select
                      value={formData.floor}
                      onValueChange={(value) =>
                          setFormData({ ...formData, floor: value })
                      }
                  >
                      <SelectTrigger>
                          <SelectValue placeholder="Selecciona un piso" />
                      </SelectTrigger>

                      <SelectContent>
                          {Array.from({ length: 10 }, (_, index) => {
                              const floor = index + 1;

                              return (
                                  <SelectItem
                                      key={floor}
                                      value={String(floor)}
                                  >
                                      Piso {floor}
                                  </SelectItem>
                              );
                          })}
                      </SelectContent>
                  </Select>
              </div>
              <div className="space-y-2">
                  <Label htmlFor="number">Número de unidad</Label>

                  <Input
                      id="number"
                      type="number"
                      min={1}
                      max={20}
                      inputMode="numeric"
                      value={formData.number}
                      onChange={(e) => setFormData({
                          ...formData,
                          number: e.target.value
                      })}
                      placeholder="5"
                  />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="area">Área (m²)</Label>

                  <Input
                      id="area"
                      type="number"
                      min={1}
                      step="0.01"
                      value={formData.area}
                      onChange={(e) =>
                          setFormData({
                              ...formData,
                              area: e.target.value
                          })
                      }
                      placeholder="85.5"
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
