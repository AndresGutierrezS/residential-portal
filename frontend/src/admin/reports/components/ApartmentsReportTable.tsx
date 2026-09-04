import type { ReportApartment } from "../interfaces/reports.interface";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface Props {
    apartments: ReportApartment[];
}

export const ApartmentsReportTable = ({ apartments }: Props) => {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Código</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Área</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Residentes</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {apartments.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">
                                No hay unidades registradas
                            </TableCell>
                        </TableRow>
                    ) : (
                        apartments.map((apartment) => (
                            <TableRow key={apartment.id}>
                                <TableCell>
                                    {apartment.code}
                                </TableCell>

                                <TableCell>
                                    {apartment.name}
                                </TableCell>

                                <TableCell>
                                    {apartment.area
                                        ? `${apartment.area} m²`
                                        : "-"}
                                </TableCell>

                                <TableCell>
                                    {apartment.status}
                                </TableCell>

                                <TableCell>
                                    {apartment.apartment_people.length}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};