import type { ReportMaintenance } from "../interfaces/reports.interface";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface Props {
    maintenances: ReportMaintenance[];
}

const months = [
    "",
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];

export const MaintenanceReportTable = ({
    maintenances,
}: Props) => {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Unidad</TableHead>
                        <TableHead>Mes</TableHead>
                        <TableHead>Año</TableHead>
                        <TableHead>Monto</TableHead>
                        <TableHead>Estado</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {maintenances.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">
                                No hay cuotas de mantenimiento registradas
                            </TableCell>
                        </TableRow>
                    ) : (
                        maintenances.map((maintenance) => (
                            <TableRow key={maintenance.id}>
                                <TableCell>
                                    {maintenance.payment?.apartment?.code ??
                                        "-"}
                                </TableCell>

                                <TableCell>
                                    {months[maintenance.month] ?? "-"}
                                </TableCell>

                                <TableCell>
                                    {maintenance.year}
                                </TableCell>

                                <TableCell>
                                    $
                                    {Number(
                                        maintenance.amount
                                    ).toLocaleString("es-MX", {
                                        minimumFractionDigits: 2,
                                    })}
                                </TableCell>

                                <TableCell>
                                    {maintenance.is_completed
                                        ? "Completado"
                                        : "Pendiente"}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};