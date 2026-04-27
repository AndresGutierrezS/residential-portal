import { useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SelectTrigger, SelectValue, SelectContent, SelectItem, Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import type { PaymentType, PaymentReason, CreatePaymentDTO } from "../interfaces/payment.interface";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreatePaymentDTO) => void;

    types: PaymentType[];
    reasons: PaymentReason[];

    onTypeChange: (typeId: number) => void;
}

const formSchema = z.object({
    apartment_id: z.string().min(1, "El departamento es requerido"),
    amount: z.string().min(1, "El monto es requerido"),
    payment_type_id: z.string().min(1, "Selecciona un tipo"),
    payment_reason_id: z.string().min(1, "Selecciona un motivo"),
    date: z.string().min(1, "La fecha es requerida"),
    description: z.string().optional(),
    receipt: z.string().optional(),
    is_paid: z.boolean(),

    month: z.string().optional(),
    year: z.string().optional(),
}).refine((data) => {
    if (data.payment_type_id === "1") {
        return data.month && data.year;
    }
    return true;
}, {
    message: "Mes y año son requeridos para mantenimiento",
    path: ["month"]
});

export const PaymentFormDialog = ({
    isOpen,
    onClose,
    onSubmit,
    types,
    reasons,
    onTypeChange
}: Props) => {

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            is_paid: false
        }
    });

    const selectedType = watch("payment_type_id");

    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen, reset]);

    const onSubmitForm = (data: any) => {
        const payload: CreatePaymentDTO = {
            apartment_id: Number(data.apartment_id),
            amount: Number(data.amount),
            payment_type_id: Number(data.payment_type_id),
            payment_reason_id: Number(data.payment_reason_id),
            date: data.date,
            description: data.description,
            receipt: data.receipt,
            is_paid: data.is_paid,
            month: data.month ? Number(data.month) : undefined,
            year: data.year ? Number(data.year) : undefined,
        };

        onSubmit(payload);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Registrar Pago</DialogTitle>
                    <DialogDescription>
                        Complete los datos del pago
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">

                    <div className="space-y-2">
                        <Label>Departamento (ID)</Label>
                        <Input {...register("apartment_id")} />
                        {errors.apartment_id && (
                            <p className="text-red-500 text-sm">
                                {errors.apartment_id.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Monto</Label>
                        <Input type="number" {...register("amount")} />
                        {errors.amount && (
                            <p className="text-red-500 text-sm">
                                {errors.amount.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Tipo de pago</Label>
                        <Select
                            onValueChange={(value) => {
                                setValue("payment_type_id", value);
                                setValue("payment_reason_id", "");
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
                        {errors.payment_type_id && (
                            <p className="text-red-500 text-sm">
                                {errors.payment_type_id.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Motivo</Label>
                        <Select
                            onValueChange={(value) =>
                                setValue("payment_reason_id", value)
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
                        {errors.payment_reason_id && (
                            <p className="text-red-500 text-sm">
                                {errors.payment_reason_id.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Fecha</Label>
                        <Input type="date" {...register("date")} />
                        {errors.date && (
                            <p className="text-red-500 text-sm">
                                {errors.date.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Descripción</Label>
                        <Input {...register("description")} />
                    </div>

                    <div className="space-y-2">
                        <Label>Recibo</Label>
                        <Input {...register("receipt")} />
                    </div>

                    <div className="space-y-2">
                        <Label>Estado</Label>
                        <Select
                            onValueChange={(value) =>
                                setValue("is_paid", value === "paid")
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

                    {selectedType === "1" && (
                        <>
                            <div className="space-y-2">
                                <Label>Mes</Label>
                                <Input type="number" {...register("month")} />
                                {errors.month && (
                                    <p className="text-red-500 text-sm">
                                        {errors.month.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Año</Label>
                                <Input type="number" {...register("year")} />
                            </div>
                        </>
                    )}

                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit(onSubmitForm)}>
                        Guardar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};