import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { ApartmentCard } from "../apartments/components/ApartmentCard";
import { useApartments } from "../apartments/hooks/useApartments";
import type { Apartment, ApartmentDTO } from "../apartments/interfaces/apartment.interface";


export const UnitsPage = () => {
  
  const { apartments, createApartment, deleteApartment, isError, isLoading, updateApartment } = useApartments();


  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<Apartment | null>(null);
  const [deletingUnit, setDeletingUnit] = useState<Apartment | null>(null);
  const [formData, setFormData] = useState({ number: "", floor: "", status: "vacant", owner: "", area: "" });

  

  const handleCreate = (payload: ApartmentDTO) => {
    createApartment(payload, {
      onSuccess: () => {
        toast.success("Apartmento creado correctamente");
        setIsDialogOpen(false);
      },
      onError: () => toast.error("Error al crear apartamento"),
    });
  };

  const handleUpdate = (data: ApartmentDTO) => {
    if(!editingUnit) return;

    updateApartment({
      id: editingUnit.id,
      data
    }, {
      onSuccess: () => {
        toast.success("Apartamento actualizado");
        setEditingUnit(null);
      },
      onError: () => toast.error("Error al actualizar el departamento"),
    });
  };

  const handleDelete = (id: number) => {
    deleteApartment(id, {
      onSuccess: () => {
        toast.success("Departamento elimado correctamente");
        setDeletingUnit(null);
      },
      onError: () => toast.error("Error al eliminar departamento")
    })
  };


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Unidades</h1>
          <p className="text-gray-600 mt-1">Gestión de unidades del condominio</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Agregar Unidad
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingUnit ? "Editar Unidad" : "Nueva Unidad"}</DialogTitle>
              <DialogDescription>Complete los datos de la unidad</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="number">Número</Label>
                <Input
                  id="number"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
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
                {/* <Select value={formData.status} onValueChange={(value: Unit["status"]) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="occupied">Ocupada</SelectItem>
                    <SelectItem value="vacant">Disponible</SelectItem>
                    <SelectItem value="maintenance">Mantenimiento</SelectItem>
                  </SelectContent>
                </Select> */}
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
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              {/* <Button onClick={handleSave}>
                {editingUnit ? "Actualizar" : "Guardar"}
              </Button> */}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {apartments.map((apartment) => (
          <ApartmentCard 
            key={apartment.id}
            apartment={apartment}
            onDelete={() => handleDelete(apartment.id)}
            onEdit={() => handleUpdate(apartment)}
          />
        ))}
      </div>

        {deletingUnit && (
          <AlertDialog open onOpenChange={() => setDeletingUnit(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer. Se eliminará permanentemente la unidad{" "}
                  <strong>{deletingUnit?.code}</strong>.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(deletingUnit.id)}>Eliminar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
    </div>
  );
}
