import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table"
import { Pencil, Trash2 } from "lucide-react"
import type { Expense } from "../interfaces/expense.interface"
import { Badge } from "@/components/ui/badge"

interface Props {
    expenses: Expense[];
    onEdit?: (expense: Expense) => void;
    onDelete?: (expense: Expense) => void;
}

export const ExpensesTable = ({expenses, onDelete, onEdit}: Props) => {
    return (
        <Card>
            <CardContent className="p-0">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Proveedor</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {expenses.length === 0 ? (
                    <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                        No se encontraron gastos
                    </TableCell>
                    </TableRow>
                ) : (
                    expenses.map((expense) => (
                    <TableRow key={expense.id}>
                        <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                        <TableCell className="font-medium">{expense.description}</TableCell>
                        <TableCell>{expense.category}</TableCell>
                        <TableCell>{expense.supplier}</TableCell>
                        <TableCell>{expense.metod}</TableCell>
                        <TableCell className="font-bold">${expense.amount.toLocaleString()}</TableCell>
                        <TableCell>
                        <Badge variant={expense.state ? "default" : "destructive"}>
                            {expense.state ? "Pagado" : "Pendiente"}
                        </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                            <Button
                            variant="ghost"
                            size="icon"
                            // onClick={() => onEdit(expense)}
                            >
                            <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                            variant="ghost"
                            size="icon"
                            // onClick={() => onDelete(expense)}
                            >
                            <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                        </div>
                        </TableCell>
                    </TableRow>
                    ))
                )}
                </TableBody>
            </Table>
            </CardContent>
        </Card>
    )
}
