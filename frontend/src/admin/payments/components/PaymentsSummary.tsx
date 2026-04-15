import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { DollarSign } from "lucide-react"

interface Props {
    totalPaid: number;
    totalPending: number;
    totalPayments: number;
}


export const PaymentsSummary = ({ totalPaid, totalPayments, totalPending }: Props) => {
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pagado</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-green-600">${totalPaid.toLocaleString()}</div>
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pendiente</CardTitle>
                <DollarSign className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-orange-600">${totalPending.toLocaleString()}</div>
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pagos</CardTitle>
                <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-blue-600">{totalPayments}</div>
            </CardContent>
            </Card>
        </div>
    )
}
