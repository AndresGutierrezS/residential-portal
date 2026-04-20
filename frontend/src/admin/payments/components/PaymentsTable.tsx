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

export const PaymentsTable = ({ payments, isLoading, onDelete, onMarkAsPaid }: Props) => {
    
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
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha de Pago</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {payments.map((payment) => (
                    <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.apartment?.name}</TableCell>
                    <TableCell>{payment.date.getMonth()}</TableCell>
                    <TableCell>${payment.amount.toLocaleString()}</TableCell>
                    <TableCell>
                        <Badge variant={payment.isPaid ? 'default' : 'secondary'}>
                        {payment.isPaid ? 'Pagado' : 'Pendiente'}
                        </Badge>
                    </TableCell>
                    <TableCell>{payment.date.getDate() || "-"}</TableCell>
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
