import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SelectTrigger, SelectValue, SelectContent, SelectItem, Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { PaymentType, PaymentReason, CreatePaymentDTO } from "../interfaces/payment.interface";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreatePaymentDTO) => void;

    types: PaymentType[];
    reasons: PaymentReason[];

    onTypeChange: (typeId: number) => void;
}

export const PaymentFormDialog = ({
    isOpen,
    onClose,
    onSubmit,
    types,
    reasons,
    onTypeChange
}: Props) => {

    const [formData, setFormData] = useState({
        apartment_id: "",
        amount: "",
        payment_type_id: "",
        payment_reason_id: "",
        date: "",
        description: "",
        receipt: "",
        is_paid: false,
        month: "",
        year: ""
    });

    const handleSave = () => {
        if (
            !formData.apartment_id ||
            !formData.amount ||
            !formData.payment_type_id ||
            !formData.payment_reason_id ||
            !formData.date
        ) {
            return;
        }

        const payload: CreatePaymentDTO = {
            apartment_id: Number(formData.apartment_id),
            amount: Number(formData.amount),
            payment_type_id: Number(formData.payment_type_id),
            payment_reason_id: Number(formData.payment_reason_id),
            date: formData.date,
            description: formData.description,
            receipt: formData.receipt ?? undefined,
            is_paid: formData.is_paid,
            month: formData.month ? Number(formData.month) : undefined,
            year: formData.year ? Number(formData.year) : undefined,
        };
        console.log(payload);

        onSubmit(payload);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Registrar Pago</DialogTitle>
                    <DialogDescription>Complete los datos del pago</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">

                    {/* Unidad */}
                    <div className="space-y-2">
                        <Label>Departamento (ID)</Label>
                        <Input
                            value={formData.apartment_id}
                            onChange={(e) => setFormData({ ...formData, apartment_id: e.target.value })}
                            placeholder="1"
                        />
                    </div>

                    {/* Monto */}
                    <div className="space-y-2">
                        <Label>Monto</Label>
                        <Input
                            type="number"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        />
                    </div>

                    {/* Tipo */}
                    <div className="space-y-2">
                        <Label>Tipo de pago</Label>
                        <Select
                            onValueChange={(value) => {
                                setFormData({ ...formData, payment_type_id: value, payment_reason_id: "" });
                                onTypeChange(Number(value));
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                {types.map(t => (
                                    <SelectItem key={t.id} value={String(t.id)}>
                                        {t.type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Razón */}
                    <div className="space-y-2">
                        <Label>Motivo</Label>
                        <Select
                            onValueChange={(value) =>
                                setFormData({ ...formData, payment_reason_id: value })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona motivo" />
                            </SelectTrigger>
                            <SelectContent>
                                {reasons.map(r => (
                                    <SelectItem key={r.id} value={String(r.id)}>
                                        {r.reason}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Fecha */}
                    <div className="space-y-2">
                        <Label>Fecha</Label>
                        <Input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                    </div>

                    {/* Descripción */}
                    <div className="space-y-2">
                        <Label>Descripción</Label>
                        <Input
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    {/* Receipt */}
                    <div className="space-y-2">
                        <Label>Recibo</Label>
                        <Input
                            value={formData.receipt}
                            onChange={(e) => setFormData({ ...formData, receipt: e.target.value })}
                        />
                    </div>

                    {/* Estado */}
                    <div className="space-y-2">
                        <Label>Estado</Label>
                        <Select
                            onValueChange={(value) =>
                                setFormData({ ...formData, is_paid: value === "paid" })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona estado" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="paid">Pagado</SelectItem>
                                <SelectItem value="pending">Pendiente</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Maintenance (opcional) */}
                    <div className="space-y-2">
                        <Label>Mes (solo mantenimiento)</Label>
                        <Input
                            type="number"
                            value={formData.month}
                            onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Año (solo mantenimiento)</Label>
                        <Input
                            type="number"
                            value={formData.year}
                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        />
                    </div>

                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSave}>
                        Guardar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};