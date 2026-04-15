import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

interface Payment {
  id: string;
  unit: string;
  amount: number;
  month: string;
  status: "paid" | "pending" | "overdue";
  date?: string;
}

interface Props {
    payments: Payment[];
}

export const PaymentsTable = ({ payments }: Props) => {
  
    const statusLabels = {
        paid: { label: "Pagado", variant: "default" as const },
        pending: { label: "Pendiente", variant: "secondary" as const },
        overdue: { label: "Vencido", variant: "destructive" as const },
    };

    

    return (
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
                            //onClick={() => handleMarkAsPaid(payment.id)}
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
    )
}
