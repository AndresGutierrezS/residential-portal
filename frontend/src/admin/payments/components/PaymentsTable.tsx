import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import type { Payment } from "../interfaces/payment.interface";


interface Props {
    payments: Payment[];
}

export const PaymentsTable = ({ payments }: Props) => {
    
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
