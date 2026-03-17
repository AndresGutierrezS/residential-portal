import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PageHeader } from "../components/PageHeader";
import { ResidentsTable } from "../residents/components/ResidentsTable";
import { ResidentFormDialog } from "../residents/components/ResidentFormDialog";
import { DeleteResidentDialog } from "../residents/components/DeleteResidentDialog";

interface Resident {
  id: string;
  name: string;
  unit: string;
  email: string;
  phone: string;
  hasAccount?: boolean;
  accountStatus?: "pending" | "active";
}

export const ResidentsPage = () => {
  const [residents, setResidents] = useState<Resident[]>([
    { id: "1", name: "Juan Pérez", unit: "101", email: "juan@email.com", phone: "555-0101" },
    { id: "2", name: "María González", unit: "202", email: "maria@email.com", phone: "555-0202" },
    { id: "3", name: "Carlos Rodríguez", unit: "303", email: "carlos@email.com", phone: "555-0303" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingResident, setEditingResident] = useState<Resident | null>(null);
  const [deletingResident, setDeletingResident] = useState<Resident | null>(null);
  const [formData, setFormData] = useState({ name: "", unit: "", email: "", phone: "" });
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null);

  const filteredResidents = residents.filter((resident) =>
    resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.unit.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleDelete = (resident: Resident) => {
    setSelectedResident(resident);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedResident) return;

    setResidents(residents.filter((r) => r.id !== selectedResident.id));
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

  const handleSave = (data: any) => {
    if (!data.name || !data.unit || !data.email || !data.phone) {
      toast.error("Por favor complete todos los campos");
      return;
    }

    if (selectedResident) {
      setResidents(
        residents.map((r) =>
          r.id === selectedResident.id ? { ...r, ...data } : r
        )
      );
      toast.success("Residente actualizado correctamente");
    } else {
      const newResident: Resident = {
        id: Date.now().toString(),
        ...data,
      };
      setResidents([...residents, newResident]);
      toast.success("Residente agregado correctamente");
    }

    setIsDialogOpen(false);
  };

  const handleSendInvitation = (resident: Resident) => {
    // Generate a random confirmation token (in production, this would be done server-side)
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    // Update resident with account pending status
    setResidents(
      residents.map((r) =>
        r.id === resident.id 
          ? { ...r, hasAccount: true, accountStatus: "pending" } 
          : r
      )
    );
    
    // Simulate sending email with token
    toast.success(`Invitación enviada a ${resident.email}`, {
      description: `Token de confirmación: ${token.substring(0, 8)}...`,
    });
  };

  const handleActivateAccount = (resident: Resident) => {
    setResidents(
      residents.map((r) =>
        r.id === resident.id 
          ? { ...r, accountStatus: "active" } 
          : r
      )
    );
    toast.success(`Cuenta activada para ${resident.name}`);
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
        isLoading={true}
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
        resident={selectedResident}
        onSubmit={handleSave}
      />

      <DeleteResidentDialog 
         onConfirm={confirmDelete}
         onOpenChange={setIsDeleteDialogOpen}
         open={isDeleteDialogOpen}
         resident={selectedResident}
      />

    </div>
  );
}