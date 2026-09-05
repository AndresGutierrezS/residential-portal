import { useState } from "react";
import { Plus, Search, Car, Building2, Tags } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useCarsApi } from "../hooks/useCarsApi";
import { useRequestTransition } from "@/hooks/useRequestTransition";

import { CarsTable } from "../components/CarsTable";
import { CarFormDialog } from "../components/CarFormDialog";
import { DeleteCarDialog } from "../components/DeleteCarDialog";

import { LoadingSpinner } from "@/components/custom/LoadingSpinner";

import { toast } from "sonner";
import type { Car as CarType } from "../interfaces/car.interface";

export const CarsPage = () => {
  const {
    carsQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  } = useCarsApi();

  const { execute, loading } = useRequestTransition();

  const cars = carsQuery.data ?? [];

  const [search, setSearch] = useState("");
  const [selectedCar, setSelectedCar] = useState<CarType | null>(null);

  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);

  const uniqueApartments = new Set(
    cars.map((car) => car.apartment_id)
  ).size;

  const uniqueBrands = new Set(
    cars.map((car) => car.brand.toLowerCase())
  ).size;

  const filtered = cars.filter((car) => {
    const query = search.toLowerCase();

    return (
      car.plate.toLowerCase().includes(query) ||
      car.brand.toLowerCase().includes(query) ||
      car.model.toLowerCase().includes(query) ||
      car.apartment?.code.toLowerCase().includes(query)
    );
  });

  const handleCreate = (data: any) => {
    execute(async () => {
      try {
        await createMutation.mutateAsync(data);

        toast.success("Vehículo creado");
        setCreateOpen(false);
      } catch (error: any) {
        if (error?.response?.status === 422) {
          toast.error(
            error.response.data?.errors?.plate?.[0] ??
            "La placa ya está registrada"
          );
          return;
        }

        toast.error("No se pudo crear el vehículo");
      }
    });
  };

  const handleUpdate = (data: any) => {
    if (!selectedCar) return;

    execute(async () => {
      await updateMutation.mutateAsync({
        id: selectedCar.id,
        car: data,
      });

      toast.success("Vehículo actualizado");

      setEditOpen(false);
      setSelectedCar(null);
    });
  };

  const handleDelete = () => {
    if (!selectedCar) return;

    execute(async () => {
      await deleteMutation.mutateAsync(selectedCar.id);

      toast.success("Vehículo eliminado");

      setDeleteOpen(false);
      setSelectedCar(null);
    });
  };

  return (
    <>
      <LoadingSpinner show={loading} />

      <div className="space-y-5">

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Vehículos</h1>
            <p className="text-gray-500">
              Gestión de vehículos del condominio
            </p>
          </div>

          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Vehículos
              </CardTitle>

              <div className="bg-blue-50 p-2 rounded-lg">
                <Car className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">
                {cars.length}
              </div>

              <p className="text-xs text-gray-500 mt-1">
                Registrados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Departamentos
              </CardTitle>

              <div className="bg-green-50 p-2 rounded-lg">
                <Building2 className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">
                {uniqueApartments}
              </div>

              <p className="text-xs text-gray-500 mt-1">
                Con vehículo registrado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Marcas
              </CardTitle>

              <div className="bg-purple-50 p-2 rounded-lg">
                <Tags className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">
                {uniqueBrands}
              </div>

              <p className="text-xs text-gray-500 mt-1">
                Marcas registradas
              </p>
            </CardContent>
          </Card>

        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

          <Input
            className="pl-10"
            placeholder="Buscar por placa, marca, modelo o departamento..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Listado de Vehículos</CardTitle>
          </CardHeader>

          <CardContent>
            <CarsTable
              cars={filtered}
              onEdit={(car) => {
                setSelectedCar(car);
                setEditOpen(true);
              }}
              onDelete={(car) => {
                setSelectedCar(car);
                setDeleteOpen(true);
              }}
            />
          </CardContent>
        </Card>

        <CarFormDialog
          open={isCreateOpen}
          onOpenChange={setCreateOpen}
          onSubmit={handleCreate}
        />

        <CarFormDialog
          open={isEditOpen}
          onOpenChange={setEditOpen}
          defaultValues={selectedCar}
          onSubmit={handleUpdate}
        />

        <DeleteCarDialog
          open={isDeleteOpen}
          onOpenChange={setDeleteOpen}
          onConfirm={handleDelete}
        />

      </div>
    </>
  );
};