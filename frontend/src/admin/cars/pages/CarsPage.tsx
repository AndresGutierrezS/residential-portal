import { useState } from "react";
import { Car, Plus, Pencil, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Vehicle {
  id: string;
  licensePlate: string;
  brand: string;
  model: string;
  color: string;
  type: string;
  unit: string;
  owner: string;
  parkingSpot: string;
  status: string;
}

export const CarsPage = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: "1",
      licensePlate: "ABC-1234",
      brand: "Toyota",
      model: "Corolla",
      color: "Blanco",
      type: "Sedan",
      unit: "305",
      owner: "Juan Pérez",
      parkingSpot: "P-305A",
      status: "active",
    },
    {
      id: "2",
      licensePlate: "XYZ-5678",
      brand: "Honda",
      model: "CR-V",
      color: "Negro",
      type: "SUV",
      unit: "102",
      owner: "María García",
      parkingSpot: "P-102A",
      status: "active",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [formData, setFormData] = useState({
    licensePlate: "",
    brand: "",
    model: "",
    color: "",
    type: "Sedan",
    unit: "",
    owner: "",
    parkingSpot: "",
    status: "active",
  });

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.unit.includes(searchTerm)
  );

  const handleAdd = () => {
    const newVehicle: Vehicle = {
      id: Date.now().toString(),
      ...formData,
    };
    setVehicles([...vehicles, newVehicle]);
    setIsAddDialogOpen(false);
    resetForm();
    toast.success("Vehículo registrado exitosamente");
  };

  const handleEdit = () => {
    if (!selectedVehicle) return;
    setVehicles(
      vehicles.map((v) =>
        v.id === selectedVehicle.id ? { ...selectedVehicle, ...formData } : v
      )
    );
    setIsEditDialogOpen(false);
    setSelectedVehicle(null);
    resetForm();
    toast.success("Vehículo actualizado exitosamente");
  };

  const handleDelete = () => {
    if (!selectedVehicle) return;
    setVehicles(vehicles.filter((v) => v.id !== selectedVehicle.id));
    setIsDeleteDialogOpen(false);
    setSelectedVehicle(null);
    toast.success("Vehículo eliminado exitosamente");
  };

  const resetForm = () => {
    setFormData({
      licensePlate: "",
      brand: "",
      model: "",
      color: "",
      type: "Sedan",
      unit: "",
      owner: "",
      parkingSpot: "",
      status: "active",
    });
  };

  const openEditDialog = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setFormData({
      licensePlate: vehicle.licensePlate,
      brand: vehicle.brand,
      model: vehicle.model,
      color: vehicle.color,
      type: vehicle.type,
      unit: vehicle.unit,
      owner: vehicle.owner,
      parkingSpot: vehicle.parkingSpot,
      status: vehicle.status,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vehículos</h1>
          <p className="text-gray-600 mt-1">Gestión de vehículos registrados</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Vehículo
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vehículos</CardTitle>
            <Car className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vehicles.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activos</CardTitle>
            <Car className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {vehicles.filter((v) => v.status === "active").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Espacios Ocupados</CardTitle>
            <Car className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{vehicles.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar por placa, propietario o unidad..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Placa</TableHead>
                <TableHead>Marca/Modelo</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Unidad</TableHead>
                <TableHead>Propietario</TableHead>
                <TableHead>Estacionamiento</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVehicles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    No se encontraron vehículos
                  </TableCell>
                </TableRow>
              ) : (
                filteredVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="font-medium">{vehicle.licensePlate}</TableCell>
                    <TableCell>
                      {vehicle.brand} {vehicle.model}
                    </TableCell>
                    <TableCell>{vehicle.type}</TableCell>
                    <TableCell>{vehicle.unit}</TableCell>
                    <TableCell>{vehicle.owner}</TableCell>
                    <TableCell>{vehicle.parkingSpot}</TableCell>
                    <TableCell>
                      <Badge variant={vehicle.status === "active" ? "default" : "secondary"}>
                        {vehicle.status === "active" ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(vehicle)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDeleteDialog(vehicle)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Registrar Nuevo Vehículo</DialogTitle>
            <DialogDescription>
              Ingresa la información del vehículo
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="licensePlate">Placa *</Label>
              <Input
                id="licensePlate"
                value={formData.licensePlate}
                onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value })}
                placeholder="ABC-1234"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Tipo *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sedan">Sedan</SelectItem>
                  <SelectItem value="SUV">SUV</SelectItem>
                  <SelectItem value="Pickup">Pickup</SelectItem>
                  <SelectItem value="Moto">Moto</SelectItem>
                  <SelectItem value="Otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand">Marca *</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Modelo *</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">Unidad *</Label>
              <Input
                id="unit"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="owner">Propietario *</Label>
              <Input
                id="owner"
                value={formData.owner}
                onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="parkingSpot">Estacionamiento *</Label>
              <Input
                id="parkingSpot"
                value={formData.parkingSpot}
                onChange={(e) => setFormData({ ...formData, parkingSpot: e.target.value })}
                placeholder="P-305A"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAdd}>Registrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Vehículo</DialogTitle>
            <DialogDescription>
              Modifica la información del vehículo
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-licensePlate">Placa *</Label>
              <Input
                id="edit-licensePlate"
                value={formData.licensePlate}
                onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-type">Tipo *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sedan">Sedan</SelectItem>
                  <SelectItem value="SUV">SUV</SelectItem>
                  <SelectItem value="Pickup">Pickup</SelectItem>
                  <SelectItem value="Moto">Moto</SelectItem>
                  <SelectItem value="Otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-brand">Marca *</Label>
              <Input
                id="edit-brand"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-model">Modelo *</Label>
              <Input
                id="edit-model"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-color">Color</Label>
              <Input
                id="edit-color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-unit">Unidad *</Label>
              <Input
                id="edit-unit"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-owner">Propietario *</Label>
              <Input
                id="edit-owner"
                value={formData.owner}
                onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-parkingSpot">Estacionamiento *</Label>
              <Input
                id="edit-parkingSpot"
                value={formData.parkingSpot}
                onChange={(e) => setFormData({ ...formData, parkingSpot: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Estado</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Activo</SelectItem>
                  <SelectItem value="inactive">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEdit}>Guardar Cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El vehículo será eliminado permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
