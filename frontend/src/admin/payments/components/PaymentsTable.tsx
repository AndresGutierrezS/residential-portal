import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import type { Payment } from "../interfaces/payment.interface";
import { LoadingSpinner } from "@/components/custom/LoadingSpinner";


interface Props {
    payments: Payment[];
    isError: boolean,
    isLoading: boolean,
    onDelete: (id: number) => void;
    onMarkAsPaid: (id: number) => void;
}

export const PaymentsTable = ({ payments, isLoading, onMarkAsPaid }: Props) => {
    
    const formatMonth = (date: Date) => {
        return date.toLocaleDateString("es-MX", { month: "long" });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("es-MX");
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
        }).format(amount);
    };

    return (
        <Card>
            <CardHeader>
            <CardTitle>Historial de Pagos</CardTitle>
            <CardDescription>Registro de todos los pagos del condominio</CardDescription>
            </CardHeader>
            <CardContent>
            {isLoading && (
                <LoadingSpinner show/>
            )}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Unidad</TableHead>
                        <TableHead>Mes</TableHead>
                        <TableHead>Monto</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Motivo</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Fecha de Pago</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {payments.map((payment) => (
                        <TableRow key={payment.id}>

                            <TableCell className="font-medium">
                                {payment.apartment?.name.split(' ')[1]}
                            </TableCell>
                            <TableCell>
                                {formatMonth(payment.date)}
                            </TableCell>
                            <TableCell>
                                {formatCurrency(payment.amount)}
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline">
                                    {payment.paymentType?.type}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {payment.paymentReason?.reason}
                            </TableCell>
                            <TableCell>
                                <Badge variant={payment.isPaid ? 'default' : 'secondary'}>
                                    {payment.isPaid ? 'Pagado' : 'Pendiente'}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {payment.isPaid ? formatDate(payment.date) : "-"}
                            </TableCell>
                            <TableCell className="text-right">
                                {!payment.isPaid && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onMarkAsPaid(payment.id)}
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
