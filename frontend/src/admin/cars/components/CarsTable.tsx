import { Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

import type { Car } from "../interfaces/car.interface"

interface Props {

  cars: Car[]

  onEdit: (car: Car) => void
  onDelete: (car: Car) => void

}

export const CarsTable = ({ cars, onEdit, onDelete }: Props) => {

  if (cars.length === 0) {
    return <div className="text-center text-gray-500 py-10">No hay vehículos</div>
  }

  return (

    <Table>

      <TableHeader>
        <TableRow>
          <TableHead>Placa</TableHead>
          <TableHead>Marca</TableHead>
          <TableHead>Modelo</TableHead>
          <TableHead>Color</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {cars.map((car) => (

          <TableRow key={car.id}>

            <TableCell className="font-medium">{car.plate}</TableCell>
            <TableCell>{car.brand}</TableCell>
            <TableCell>{car.model}</TableCell>
            <TableCell>{car.color}</TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(car)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(car)}
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </Button>
            </TableCell>

          </TableRow>

        ))}
      </TableBody>

    </Table>

  )
}