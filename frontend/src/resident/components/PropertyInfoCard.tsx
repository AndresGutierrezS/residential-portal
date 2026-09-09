import { Home } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PropertyInfoCardProps {
  unit: string;
  floor: string;
  area: string;
  bedrooms: string;
  bathrooms: string;
  parking: string;
}

export function PropertyInfoCard({
  unit,
  floor,
  area,
  bedrooms,
  bathrooms,
  parking,
}: PropertyInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="h-5 w-5 text-blue-600" />
          Información de Mi Propiedad
        </CardTitle>

        <CardDescription>
          Detalles de tu unidad
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <PropertyItem
            label="Unidad"
            value={unit}
          />

          <PropertyItem
            label="Piso"
            value={floor}
          />

          <PropertyItem
            label="Área"
            value={area}
          />

          <PropertyItem
            label="Habitaciones"
            value={bedrooms}
          />

          <PropertyItem
            label="Baños"
            value={bathrooms}
          />

          <PropertyItem
            label="Estacionamiento"
            value={parking}
          />
        </div>
      </CardContent>
    </Card>
  );
}

interface PropertyItemProps {
  label: string;
  value: string;
}

function PropertyItem({ label, value }: PropertyItemProps) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <p className="text-sm text-gray-600">
        {label}
      </p>

      <p className="text-xl font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
}