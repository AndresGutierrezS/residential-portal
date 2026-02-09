import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface Unit {
  id: string;
  number: string;
  floor: string;
  status: "occupied" | "vacant" | "maintenance";
  owner: string;
  area: string;
}

export const UnitsPage = () => {
  const [units, setUnits] = useState<Unit[]>([
    { id: "1", number: "101", floor: "1", status: "occupied", owner: "Juan Pérez", area: "85m²" },
    { id: "2", number: "102", floor: "1", status: "vacant", owner: "", area: "85m²" },
    { id: "3", number: "201", floor: "2", status: "occupied", owner: "María González", area: "95m²" },
    { id: "4", number: "202", floor: "2", status: "maintenance", owner: "", area: "95m²" },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);
  const [deletingUnit, setDeletingUnit] = useState<Unit | null>(null);
  const [formData, setFormData] = useState({ number: "", floor: "", status: "vacant" as Unit["status"], owner: "", area: "" });

  const statusLabels = {
    occupied: { label: "Ocupada", variant: "default" as const },
    vacant: { label: "Disponible", variant: "secondary" as const },
    maintenance: { label: "Mantenimiento", variant: "destructive" as const },
  };

  const handleAdd = () => {
    setFormData({ number: "", floor: "", status: "vacant", owner: "", area: "" });
    setEditingUnit(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (unit: Unit) => {
    setFormData(unit);
    setEditingUnit(unit);
    setIsDialogOpen(true);
  };

  const handleDelete = (unit: Unit) => {
    setDeletingUnit(unit);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deletingUnit) {
      setUnits(units.filter((u) => u.id !== deletingUnit.id));
      toast.success("Unidad eliminada correctamente");
      setIsDeleteDialogOpen(false);
      setDeletingUnit(null);
    }
  };

  const handleSave = () => {
    if (!formData.number || !formData.floor || !formData.area) {
      toast.error("Por favor complete los campos requeridos");
      return;
    }

    if (editingUnit) {
      setUnits(units.map((u) => (u.id === editingUnit.id ? { ...u, ...formData } : u)));
      toast.success("Unidad actualizada correctamente");
    } else {
      const newUnit: Unit = {
        id: Date.now().toString(),
        ...formData,
      };
      setUnits([...units, newUnit]);
      toast.success("Unidad agregada correctamente");
    }
    setIsDialogOpen(false);
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
            <Button onClick={handleAdd}>
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
                <Select value={formData.status} onValueChange={(value: Unit["status"]) => setFormData({ ...formData, status: value })}>
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
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                {editingUnit ? "Actualizar" : "Guardar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {units.map((unit) => (
          <Card key={unit.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Unidad {unit.number}</CardTitle>
                  <CardDescription>Piso {unit.floor}</CardDescription>
                </div>
                <Badge variant={statusLabels[unit.status].variant}>
                  {statusLabels[unit.status].label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="text-sm">
                  <span className="text-gray-600">Área:</span>{" "}
                  <span className="font-medium">{unit.area}</span>
                </div>
                {unit.owner && (
                  <div className="text-sm">
                    <span className="text-gray-600">Propietario:</span>{" "}
                    <span className="font-medium">{unit.owner}</span>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(unit)}>
                  <Edit className="h-3 w-3 mr-1" />
                  Editar
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(unit)}>
                  <Trash2 className="h-3 w-3 text-red-600" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente la unidad{" "}
              <strong>{deletingUnit?.number}</strong>.
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
