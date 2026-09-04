import type { ReportPayment } from "../interfaces/reports.interface";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface Props {
    payments: ReportPayment[];
}

export const PaymentsReportTable = ({ payments }: Props) => {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Unidad</TableHead>
                        <TableHead>Monto</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Motivo</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Fecha</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {payments.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">
                                No hay pagos registrados
                            </TableCell>
                        </TableRow>
                    ) : (
                        payments.map((payment) => (
                            <TableRow key={payment.id}>
                                <TableCell>
                                    {payment.apartment?.code ?? "-"}
                                </TableCell>

                                <TableCell>
                                    ${Number(payment.amount).toLocaleString(
                                        "es-MX",
                                        {
                                            minimumFractionDigits: 2,
                                        }
                                    )}
                                </TableCell>

                                <TableCell>
                                    {payment.payment_type?.type ?? "-"}
                                </TableCell>

                                <TableCell>
                                    {payment.payment_reason?.reason ?? "-"}
                                </TableCell>

                                <TableCell>
                                    {payment.is_paid ? "Pagado" : "Pendiente"}
                                </TableCell>

                                <TableCell>
                                    {new Date(payment.date).toLocaleDateString(
                                        "es-MX"
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};