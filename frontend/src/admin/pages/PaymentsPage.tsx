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
import { PaymentsSummary } from "../payments/components/PaymentsSummary";
import { PaymentsTable } from "../payments/components/PaymentsTable";
import { PageHeader } from "../components/PageHeader";
import { usePayments } from "../payments/hooks/usePayments";
import { PaymentFormDialog } from "../payments/components/PaymentFormDialog";

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

  const { payments: payments2, createPayment, deletePayment, reasons, types, updatePayment, isError, isLoading } = usePayments();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ unit: "", amount: "", month: "", status: "pending" as Payment["status"] });

  const [typeId, setTypeId] = useState<number | undefined>();

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
      
      
      <PageHeader 
        title="Pagos"
        description="Gestión de pagos del condominio"
        action={
        <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
              Registrar Pago
        </Button>
        }
      />

     <PaymentFormDialog 
      isOpen={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
      onSubmit={createPayment}
      types={types}
      reasons={reasons}
      onTypeChange={setTypeId}
     />

      {/* Summary Cards */}
      <PaymentsSummary 
        totalPaid={totalPaid}
        totalPayments={payments.length}
        totalPending={totalPending}
      />

      <PaymentsTable 
        payments={payments2}
      />

    </div>
  );
}
