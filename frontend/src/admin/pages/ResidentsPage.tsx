import { useState } from "react";
import { Plus, Edit, Trash2, Search, Mail, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

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

  const filteredResidents = residents.filter((resident) =>
    resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.unit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setFormData({ name: "", unit: "", email: "", phone: "" });
    setEditingResident(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (resident: Resident) => {
    setFormData(resident);
    setEditingResident(resident);
    setIsDialogOpen(true);
  };

  const handleDelete = (resident: Resident) => {
    setDeletingResident(resident);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deletingResident) {
      setResidents(residents.filter((r) => r.id !== deletingResident.id));
      toast.success("Residente eliminado correctamente");
      setIsDeleteDialogOpen(false);
      setDeletingResident(null);
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.unit || !formData.email || !formData.phone) {
      toast.error("Por favor complete todos los campos");
      return;
    }

    if (editingResident) {
      setResidents(
        residents.map((r) =>
          r.id === editingResident.id ? { ...r, ...formData } : r
        )
      );
      toast.success("Residente actualizado correctamente");
    } else {
      const newResident: Resident = {
        id: Date.now().toString(),
        ...formData,
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Residentes</h1>
          <p className="text-gray-600 mt-1">Gestión de residentes del condominio</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Agregar Residente
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingResident ? "Editar Residente" : "Nuevo Residente"}
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
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Juan Pérez"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unidad</Label>
                <Input
                  id="unit"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  placeholder="101"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="juan@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="555-0101"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                {editingResident ? "Actualizar" : "Guardar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Lista de Residentes</CardTitle>
              <CardDescription>
                {filteredResidents.length} residente(s) registrado(s)
              </CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar residentes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Unidad</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResidents.map((resident) => (
                <TableRow key={resident.id}>
                  <TableCell className="font-medium">{resident.name}</TableCell>
                  <TableCell>{resident.unit}</TableCell>
                  <TableCell>{resident.email}</TableCell>
                  <TableCell>{resident.phone}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(resident)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(resident)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                      {resident.hasAccount && resident.accountStatus === "pending" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleActivateAccount(resident)}
                        >
                          <Mail className="h-4 w-4 text-green-600" />
                        </Button>
                      )}
                      {!resident.hasAccount && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleSendInvitation(resident)}
                        >
                          <Mail className="h-4 w-4 text-blue-600" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el residente{" "}
              <strong>{deletingResident?.name}</strong> de la unidad{" "}
              <strong>{deletingResident?.unit}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}