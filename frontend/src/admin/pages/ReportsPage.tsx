import { useState } from "react";
import { FileText, DollarSign, Users, Building, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/custom/LoadingSpinner";
import { useReports } from "../reports/hooks/useReports";
import { PaymentsReportTable } from "../reports/components/PaymentsReportTable";
import type { ReportApartment, ReportMaintenance, ReportPayment, ReportResident } from "../reports/interfaces/reports.interface";
import { ResidentsReportTable } from "../reports/components/ResidentsReportTable";
import { ApartmentsReportTable } from "../reports/components/ApartmentsReportTable";
import { MaintenanceReportTable } from "../reports/components/MaintenanceReportTable";

export const ReportsPage = () => {
  const [reportType, setReportType] = useState("payments");
  const { data, isLoading } = useReports(
    reportType as "payments" | "residents" | "units" | "maintenance"
  );

  const reportTypes = [
    {
      value: "payments",
      label: "Reporte de Pagos",
      icon: DollarSign,
      color: "text-green-600",
      description: "Información detallada de los pagos del condominio",
    },
    {
      value: "residents",
      label: "Reporte de Residentes",
      icon: Users,
      color: "text-blue-600",
      description: "Listado de residentes y sus unidades",
    },
    {
      value: "units",
      label: "Reporte de Unidades",
      icon: Building,
      color: "text-purple-600",
      description: "Estado y ocupación de las unidades",
    },
    {
      value: "maintenance",
      label: "Reporte de Mantenimiento",
      icon: Wrench,
      color: "text-orange-600",
      description: "Estado de las cuotas de mantenimiento",
    },
  ];

  const handleGenerateReport = () => {
    // Aquí conectaremos los reportes reales
  };

  const selectedReport = reportTypes.find(
    (report) => report.value === reportType
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reportes</h1>
        <p className="text-gray-600 mt-1">
          Consulta información del condominio
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuración del Reporte</CardTitle>
          <CardDescription>
            Selecciona el tipo de información que deseas consultar
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Tipo de Reporte</Label>

            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {reportTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleGenerateReport} className="w-full">
            <FileText className="h-4 w-4 mr-2" />
            Generar Reporte
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reportTypes.map((type) => (
          <Card
            key={type.value}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              reportType === type.value ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => setReportType(type.value)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {type.label}
              </CardTitle>

              <type.icon className={`h-5 w-5 ${type.color}`} />
            </CardHeader>

            <CardContent>
              <p className="text-xs text-gray-600">
                {type.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      
      <Card>
        <CardHeader>
          <CardTitle>{selectedReport?.label}</CardTitle>

          <CardDescription>
            Los resultados del reporte aparecerán aquí
          </CardDescription>
        </CardHeader>

        <CardContent>

          {isLoading ? (
              <LoadingSpinner show/>
          ) : (
              <>
                  {reportType === "payments" && (
                      <PaymentsReportTable
                          payments={data as ReportPayment[]}
                      />
                  )}

                  {reportType === "residents" && (
                      <ResidentsReportTable
                          residents={data as ReportResident[]}
                      />
                  )}

                  {reportType === "units" && (
                      <ApartmentsReportTable
                          apartments={data as ReportApartment[]}
                      />
                  )}

                  {reportType === "maintenance" && (
                      <MaintenanceReportTable
                          maintenances={data as ReportMaintenance[]}
                      />
                  )}
              </>
          )}

        </CardContent>
      </Card>
    </div>
  );
};