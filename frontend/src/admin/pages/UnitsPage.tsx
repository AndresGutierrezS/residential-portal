import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ApartmentCard } from "../apartments/components/ApartmentCard";
import { useApartments } from "../apartments/hooks/useApartments";
import type { Apartment, ApartmentDTO } from "../apartments/interfaces/apartment.interface";
import { PageHeader } from "../components/PageHeader";
import { ApartmentDialog } from "../apartments/components/ApartmentDialog";
import { LoadingSpinner } from "@/components/custom/LoadingSpinner";
import { DeleteApartmentDialog } from "../apartments/components/DeleteApartmentDialog";


export const UnitsPage = () => {
  
  const { apartments, createApartment, deleteApartment, isLoading, updateApartment } = useApartments();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<Apartment | null>(null);
  const [deletingUnit, setDeletingUnit] = useState<Apartment | null>(null);

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

    const payload: ApartmentDTO = {
      code: data.code,
      status: data.status,
    };

    if (data.is_overdue !== undefined) {
      payload.is_overdue = data.is_overdue;
    }

    if (data.name !== undefined) {
      payload.name = data.name;
    }
    updateApartment({
      id: editingUnit.id,
      data: payload
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
      <PageHeader 
        title="Unidades"
        description="Gestión de unidades del condominio"
        action={
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Agregar Unidad
            </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading && <LoadingSpinner show/>}
        {apartments.map((apartment) => (
          <ApartmentCard 
            key={apartment.id}
            apartment={apartment}
            onDelete={() => setDeletingUnit(apartment)}
            onEdit={() => setEditingUnit(apartment)}
          />
        ))}
      </div>

      <ApartmentDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleCreate}
      />

      {editingUnit && (
        <ApartmentDialog
          open={true}
          onOpenChange={() => setEditingUnit(null)}
          initialData={editingUnit}
          onSubmit={handleUpdate}
        />
      )}

      <DeleteApartmentDialog 
        apartment={deletingUnit}
        onClose={() => setDeletingUnit(null)}
        onConfirm={(id) => handleDelete(id)}
      />

    </div>
  );
}
