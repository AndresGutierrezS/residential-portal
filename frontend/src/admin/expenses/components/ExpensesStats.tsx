import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingDown, TrendingUp } from "lucide-react"

interface Props {
    totalExpenses: number,
    paidExpenses: number,
    pendingExpenses: number,
    
}

export const ExpensesStats = ({ paidExpenses, pendingExpenses, totalExpenses}:Props) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Gastos</CardTitle>
                    <DollarSign className="h-4 w-4 text-gray-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">${totalExpenses.toLocaleString()}</div>
                    <p className="text-xs text-gray-600 mt-1">Este mes</p>
                </CardContent>
                </Card>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pagados</CardTitle>
                    <TrendingDown className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-green-600">${paidExpenses.toLocaleString()}</div>
                    {/* <p className="text-xs text-gray-600 mt-1">{expenses.filter((e) => e.status === "paid").length} gastos</p> */}
                </CardContent>
                </Card>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
                    <TrendingUp className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-orange-600">${pendingExpenses.toLocaleString()}</div>
                    {/* <p className="text-xs text-gray-600 mt-1">{expenses.filter((e) => e.status === "pending").length} gastos</p> */}
                </CardContent>
            </Card>
        </div>
    )
}
