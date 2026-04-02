import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Edit, Trash2 } from "lucide-react"
import type { Apartment } from "../interfaces/apartment.interface";
import { Badge } from "@/components/ui/badge";

interface Props {
    apartment: Apartment;
    onEdit: (apartment: Apartment) => void;
    onDelete: (apartment: Apartment) => void; 
}

export const ApartmentCard = ({apartment, onDelete: handleDelete, onEdit: handleEdit}: Props) => {
  
    const statusLabels = {
        occupied: { label: "Ocupada", variant: "default" as const },
        vacant: { label: "Disponible", variant: "secondary" as const },
        maintenance: { label: "Mantenimiento", variant: "destructive" as const },
    };

    return (
        <Card key={apartment.id}>
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                <div>
                    <CardTitle className="text-lg">Unidad {apartment.code}</CardTitle>
                    <CardDescription>Piso {apartment.floor}</CardDescription>
                </div>
                <Badge variant={statusLabels[apartment.status]?.variant}>
                    {statusLabels[apartment.status]?.label}
                </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-2 mb-4">
                <div className="text-sm">
                    <span className="text-gray-600">Área:</span>{" "}
                    <span className="font-medium">85.5 m2</span>
                </div>
                {/* {apartment.owner && (
                    <div className="text-sm">
                    <span className="text-gray-600">Propietario:</span>{" "}
                    <span className="font-medium">{apartment.owner}</span>
                    </div>
                )} */}
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(apartment)}>
                        <Edit className="h-3 w-3 mr-1" />
                        Editar
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(apartment)}>
                        <Trash2 className="h-3 w-3 text-red-600" />
                    </Button>
                </div>
            </CardContent>
        </Card>
  )
}
