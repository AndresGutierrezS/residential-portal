import { useState } from "react"
import { Plus, Search, Car } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { useCarsApi } from "../hooks/useCarsApi"
import { useRequestTransition } from "@/hooks/useRequestTransition"

import { CarsTable } from "../components/CarsTable"
import { CarFormDialog } from "../components/CarFormDialog"
import { DeleteCarDialog } from "../components/DeleteCarDialog"

import { LoadingSpinner } from "@/components/custom/LoadingSpinner"

import { toast } from "sonner"
import type { Car as CarType } from "../interfaces/car.interface"

export const CarsPage = () => {

  const { carsQuery, createMutation, updateMutation, deleteMutation } = useCarsApi()

  const { execute, loading } = useRequestTransition()

  const cars = carsQuery.data ?? []

  const [search, setSearch] = useState("")
  const [selectedCar, setSelectedCar] = useState<CarType | null>(null)

  const [isCreateOpen, setCreateOpen] = useState(false)
  const [isEditOpen, setEditOpen] = useState(false)
  const [isDeleteOpen, setDeleteOpen] = useState(false)

  const filtered = cars.filter((car) =>
    car.plate.toLowerCase().includes(search.toLowerCase())
  )

  const handleCreate = (data: any) => {

    execute(async () => {

      await createMutation.mutateAsync(data)

      toast.success("Vehículo creado")

      setCreateOpen(false)

    })

  }

  const handleUpdate = (data: any) => {

    if (!selectedCar) return

    execute(async () => {

      await updateMutation.mutateAsync({
        id: selectedCar.id,
        car: data
      })

      toast.success("Vehículo actualizado")

      setEditOpen(false)
      setSelectedCar(null)

    })

  }

  const handleDelete = () => {

    if (!selectedCar) return

    execute(async () => {

      await deleteMutation.mutateAsync(selectedCar.id)

      toast.success("Vehículo eliminado")

      setDeleteOpen(false)
      setSelectedCar(null)

    })

  }

  return (

    <>
      <LoadingSpinner show={loading} />

      <div className="space-y-6">

        <div className="flex justify-between items-center">
          
          <div>
            <h1 className="text-3xl font-bold">Vehículos</h1>
            <p className="text-gray-500">Gestión de vehículos</p>
          </div>

          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo
          </Button>

        </div>

        <div className="grid grid-cols-3 gap-4">

          <Card>
            <CardHeader className="flex flex-row justify-between pb-2">
              <CardTitle>Total Vehículos</CardTitle>
              <Car className="h-4 w-4" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">{cars.length}</div>
            </CardContent>

          </Card>

        </div>

        <div className="relative">

          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

          <Input
            className="pl-10"
            placeholder="Buscar por placa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <CarsTable
          cars={filtered}
          onEdit={(car) => {
            setSelectedCar(car)
            setEditOpen(true)
          }}
          onDelete={(car) => {
            setSelectedCar(car)
            setDeleteOpen(true)
          }}
        />

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
  )
}