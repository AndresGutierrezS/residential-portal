import { useState } from "react";
import { FileText, Download, Calendar, TrendingUp, DollarSign, Users, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const ReportsPage = () => {
  const [reportType, setReportType] = useState("payments");
  const [reportPeriod, setReportPeriod] = useState("monthly");

  const reportTypes = [
    { value: "payments", label: "Reporte de Pagos", icon: DollarSign, color: "text-green-600" },
    { value: "expenses", label: "Reporte de Gastos", icon: TrendingUp, color: "text-red-600" },
    { value: "residents", label: "Reporte de Residentes", icon: Users, color: "text-blue-600" },
    { value: "units", label: "Reporte de Unidades", icon: Building, color: "text-purple-600" },
    { value: "financial", label: "Reporte Financiero", icon: FileText, color: "text-orange-600" },
  ];

  const handleGenerateReport = () => {
    const selectedReport = reportTypes.find((r) => r.value === reportType);
    toast.success(`Generando ${selectedReport?.label}...`);
    // Here you would generate the actual report
  };

  const handleDownloadReport = (format: string) => {
    toast.success(`Descargando reporte en formato ${format.toUpperCase()}...`);
    // Here you would download the report
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reportes</h1>
        <p className="text-gray-600 mt-1">Genera y descarga reportes del condominio</p>
      </div>

      {/* Report Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Configuración del Reporte</CardTitle>
          <CardDescription>Selecciona el tipo de reporte y período</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div className="space-y-2">
              <Label>Período</Label>
              <Select value={reportPeriod} onValueChange={setReportPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Diario</SelectItem>
                  <SelectItem value="weekly">Semanal</SelectItem>
                  <SelectItem value="monthly">Mensual</SelectItem>
                  <SelectItem value="quarterly">Trimestral</SelectItem>
                  <SelectItem value="yearly">Anual</SelectItem>
                  <SelectItem value="custom">Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleGenerateReport} className="flex-1">
              <FileText className="h-4 w-4 mr-2" />
              Generar Reporte
            </Button>
            <Button variant="outline" onClick={() => handleDownloadReport("pdf")}>
              <Download className="h-4 w-4 mr-2" />
              PDF
            </Button>
            <Button variant="outline" onClick={() => handleDownloadReport("excel")}>
              <Download className="h-4 w-4 mr-2" />
              Excel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportTypes.map((type) => (
          <Card
            key={type.value}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              reportType === type.value ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => setReportType(type.value)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{type.label}</CardTitle>
              <type.icon className={`h-5 w-5 ${type.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600">
                {type.value === "payments" && "Información detallada de todos los pagos recibidos"}
                {type.value === "expenses" && "Resumen de todos los gastos del condominio"}
                {type.value === "residents" && "Listado completo de residentes registrados"}
                {type.value === "units" && "Estado y ocupación de todas las unidades"}
                {type.value === "financial" && "Estado financiero general del condominio"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Reportes Rápidos</CardTitle>
          <CardDescription>Genera reportes predefinidos al instante</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="bg-green-50 p-2 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Pagos del Mes Actual</p>
                  <p className="text-sm text-gray-600">Febrero 2026</p>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={() => handleDownloadReport("pdf")}>
                <Download className="h-4 w-4 mr-2" />
                Descargar
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="bg-red-50 p-2 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium">Gastos del Mes Actual</p>
                  <p className="text-sm text-gray-600">Febrero 2026</p>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={() => handleDownloadReport("pdf")}>
                <Download className="h-4 w-4 mr-2" />
                Descargar
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="bg-orange-50 p-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium">Pagos Pendientes</p>
                  <p className="text-sm text-gray-600">Todas las unidades</p>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={() => handleDownloadReport("pdf")}>
                <Download className="h-4 w-4 mr-2" />
                Descargar
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Resumen Anual</p>
                  <p className="text-sm text-gray-600">2026</p>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={() => handleDownloadReport("pdf")}>
                <Download className="h-4 w-4 mr-2" />
                Descargar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Vista Previa del Reporte</CardTitle>
          <CardDescription>
            {reportTypes.find((r) => r.value === reportType)?.label} - {reportPeriod === "monthly" ? "Mensual" : reportPeriod}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              Selecciona las opciones arriba y haz clic en "Generar Reporte" para ver la vista previa
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
