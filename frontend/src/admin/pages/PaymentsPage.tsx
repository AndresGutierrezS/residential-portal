import { useState } from "react";
import { usePayments } from "../payments/hooks/usePayments";
import { PageHeader } from "../components/PageHeader";
import { PaymentFormDialog } from "../payments/components/PaymentFormDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PaymentsSummary } from "../payments/components/PaymentsSummary";
import { PaymentsTable } from "../payments/components/PaymentsTable";


export const PaymentsPage = () => {

  const [typeId, setTypeId] = useState<number | undefined>();
  
  const { payments, createPayment, deletePayment, reasons, types, markAsPaid, isPaymentLoading, isError, isLoading } = usePayments( typeId );

  const [isDialogOpen, setIsDialogOpen] = useState(false);



  const totalPaid = payments.filter((p) => p.isPaid).reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter((p) => p.isPaid).reduce((sum, p) => sum + p.amount, 0);


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

      <PaymentsSummary 
        totalPaid={totalPaid}
        totalPayments={payments.length}
        totalPending={totalPending}
      />

      <PaymentsTable 
        payments={payments}
        isError={isError}
        isLoading={isLoading}
        onDelete={deletePayment}
        onMarkAsPaid={markAsPaid}
      />

    </div>
  );
}
