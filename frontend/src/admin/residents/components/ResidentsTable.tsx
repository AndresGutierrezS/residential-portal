import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table"
import { Search, Edit, Trash2, Mail } from "lucide-react"

interface Resident {
    id: string;
    name: string;
    unit: string;
    email: string;
    phone: string;
    hasAccount?: boolean;
    accountStatus?: "pending" | 'active';
}

interface Props {
    residents: Resident[];
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    isLoading: boolean;
    actions: {
        onEdit: (resident: Resident) => void;
        onDelete: (resident: Resident) => void;
        onInvite: (resident: Resident) => void;
        onActivate: (resident: Resident) => void;
    }
}

export const ResidentsTable = ({actions, residents, searchTerm, setSearchTerm}: Props) => {

    return (
        <Card>
            <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                <CardTitle>Lista de Residentes</CardTitle>
                <CardDescription>
                    {residents.length} residente(s) registrado(s)
                </CardDescription>
                </div>
                <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                    placeholder="Buscar residentes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
                </div>
            </div>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Unidad</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {residents.map((resident) => (
                    <TableRow key={resident.id}>
                    <TableCell className="font-medium">{resident.name}</TableCell>
                    <TableCell>{resident.unit}</TableCell>
                    <TableCell>{resident.email}</TableCell>
                    <TableCell>{resident.phone}</TableCell>
                    <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => actions.onEdit(resident)}
                        >
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => actions.onDelete(resident)}
                        >
                            <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                        {resident.hasAccount && resident.accountStatus === "pending" && (
                            <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => actions.onActivate(resident)}
                            >
                            <Mail className="h-4 w-4 text-green-600" />
                            </Button>
                        )}
                        {!resident.hasAccount && (
                            <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => actions.onInvite(resident)}
                            >
                            <Mail className="h-4 w-4 text-blue-600" />
                            </Button>
                        )}
                        </div>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </CardContent>
        </Card>
    )
}