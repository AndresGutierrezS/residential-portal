import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PageHeader } from "../components/PageHeader";
import { ResidentsTable } from "../residents/components/ResidentsTable";
import { ResidentFormDialog } from "../residents/components/ResidentFormDialog";
import { DeleteResidentDialog } from "../residents/components/DeleteResidentDialog";
import { useResidents } from "../residents/hooks/useResidents";
import type { CreateResidentDTO, Resident } from "../residents/interfaces/resident.interface";


export const ResidentsPage = () => {

  const { residents, createResident, isError, isLoading } = useResidents();

  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingResident, setEditingResident] = useState<Resident | null>(null);
  const [deletingResident, setDeletingResident] = useState<Resident | null>(null);
  const [formData, setFormData] = useState({ name: "", unit: "", email: "", phone: "" });
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null);

  const filteredResidents = residents.filter((resident) =>
    resident.fullName.toLowerCase()!.includes(searchTerm.toLowerCase()) ||
    resident.code.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleDelete = (resident: Resident) => {
    setSelectedResident(resident);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedResident) return;

    //setResidents(residents.filter((r) => r.id !== selectedResident.id));
    toast.success("Residente eliminado correctamente");

    setIsDeleteDialogOpen(false);
    setSelectedResident(null);
  };

  const handleAdd = () => {
    setSelectedResident(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (resident: Resident) => {
    setSelectedResident(resident);
    setIsDialogOpen(true);
  };

  const handleSave = (data: CreateResidentDTO) => {
    // if (!data.person || !data.code || !data.email) {
    //   toast.error("Por favor complete todos los campos");
    //   return;
    // }

    createResident(data, {
      onSuccess: () => {
        toast.success("Residente agregado correctamente");
        setIsDialogOpen(false);
      },
      onError: () => {
        toast.error("Error al crear residente");
      }
    });

    setIsDialogOpen(false);
  };

  const handleSendInvitation = (resident: Resident) => {
    // Generate a random confirmation token (in production, this would be done server-side)
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    // Update resident with account pending status
    // setResidents(
    //   residents.map((r) =>
    //     r.id === resident.id 
    //       ? { ...r, hasAccount: true, accountStatus: "pending" } 
    //       : r
    //   )
    // );
    
    // Simulate sending email with token
    toast.success(`Invitación enviada a ${resident.email}`, {
      description: `Token de confirmación: ${token.substring(0, 8)}...`,
    });
  };

  const handleActivateAccount = (resident: Resident) => {
    // setResidents(
    //   residents.map((r) =>
    //     r.id === resident.id 
    //       ? { ...r, accountStatus: "active" } 
    //       : r
    //   )
    // );
    //toast.success(`Cuenta activada para ${resident.name}`);
  };

  return (
    <div className="space-y-6">
      
      <PageHeader 
        title="Residentes"
        description="Gestión de residentes del condominio"
        action={
            <Button onClick={handleAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Agregar Residente
            </Button>} 
      />

      <ResidentsTable 
        residents={filteredResidents}
        isLoading={isLoading}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        actions={{
          onEdit: handleEdit,
          onDelete: handleDelete,
          onInvite: handleSendInvitation,
          onActivate: handleActivateAccount
        }}
      />

      <ResidentFormDialog 
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        resident={null}
        onSubmit={handleSave}
      />

      <DeleteResidentDialog 
         onConfirm={confirmDelete}
         onOpenChange={setIsDeleteDialogOpen}
         open={isDeleteDialogOpen}
         resident={residents[0]}
      />

    </div>
  );
}