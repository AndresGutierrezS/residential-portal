import { useState } from "react";
import { Plus, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Payment {
  id: string;
  unit: string;
  amount: number;
  month: string;
  status: "paid" | "pending" | "overdue";
  date?: string;
}

export const PaymentsPage = () => {
  const [payments, setPayments] = useState<Payment[]>([
    { id: "1", unit: "101", amount: 850, month: "Enero 2026", status: "paid", date: "2026-01-05" },
    { id: "2", unit: "102", amount: 850, month: "Enero 2026", status: "pending" },
    { id: "3", unit: "201", amount: 950, month: "Enero 2026", status: "paid", date: "2026-01-10" },
    { id: "4", unit: "202", amount: 950, month: "Enero 2026", status: "overdue" },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ unit: "", amount: "", month: "", status: "pending" as Payment["status"] });

  const statusLabels = {
    paid: { label: "Pagado", variant: "default" as const },
    pending: { label: "Pendiente", variant: "secondary" as const },
    overdue: { label: "Vencido", variant: "destructive" as const },
  };

  const totalPaid = payments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter((p) => p.status !== "paid").reduce((sum, p) => sum + p.amount, 0);

  const handleAdd = () => {
    setFormData({ unit: "", amount: "", month: "", status: "pending" });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.unit || !formData.amount || !formData.month) {
      toast.error("Por favor complete todos los campos");
      return;
    }

    const newPayment: Payment = {
      id: Date.now().toString(),
      unit: formData.unit,
      amount: parseFloat(formData.amount),
      month: formData.month,
      status: formData.status,
      date: formData.status === "paid" ? new Date().toISOString().split("T")[0] : undefined,
    };
    setPayments([...payments, newPayment]);
    toast.success("Pago registrado correctamente");
    setIsDialogOpen(false);
  };

  const handleMarkAsPaid = (paymentId: string) => {
    setPayments(
      payments.map((p) =>
        p.id === paymentId
          ? { ...p, status: "paid" as const, date: new Date().toISOString().split("T")[0] }
          : p
      )
    );
    toast.success("Pago marcado como pagado");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pagos</h1>
          <p className="text-gray-600 mt-1">Gestión de pagos del condominio</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Registrar Pago
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Registrar Pago</DialogTitle>
              <DialogDescription>Complete los datos del pago</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
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
                <Label htmlFor="amount">Monto</Label>
                <Input
                  id="amount"
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="850"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="month">Mes</Label>
                <Input
                  id="month"
                  value={formData.month}
                  onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                  placeholder="Enero 2026"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Estado</Label>
                <Select value={formData.status} onValueChange={(value: Payment["status"]) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">Pagado</SelectItem>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="overdue">Vencido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>Guardar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pagado</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalPaid.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pendiente</CardTitle>
            <DollarSign className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">${totalPending.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pagos</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{payments.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Pagos</CardTitle>
          <CardDescription>Registro de todos los pagos del condominio</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Unidad</TableHead>
                <TableHead>Mes</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha de Pago</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">Unidad {payment.unit}</TableCell>
                  <TableCell>{payment.month}</TableCell>
                  <TableCell>${payment.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={statusLabels[payment.status].variant}>
                      {statusLabels[payment.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell>{payment.date || "-"}</TableCell>
                  <TableCell className="text-right">
                    {payment.status !== "paid" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMarkAsPaid(payment.id)}
                      >
                        Marcar como Pagado
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
