import type { ReportResident } from "../interfaces/reports.interface";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface Props {
    residents: ReportResident[];
}

export const ResidentsReportTable = ({ residents }: Props) => {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Teléfono</TableHead>
                        <TableHead>Unidad</TableHead>
                        <TableHead>Rol</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {residents.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">
                                No hay residentes registrados
                            </TableCell>
                        </TableRow>
                    ) : (
                        residents.map((resident) => (
                            <TableRow key={resident.id}>
                                <TableCell>
                                    {resident.person.name}{" "}
                                    {resident.person.last_name}{" "}
                                    {resident.person.second_last_name}
                                </TableCell>

                                <TableCell>
                                    {resident.person.phone}
                                </TableCell>

                                <TableCell>
                                    {resident.apartment?.code ?? "-"}
                                </TableCell>

                                <TableCell>
                                    {resident.role?.role ?? "-"}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};