import { useEffect } from "react";
import { z } from "zod";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import type { Expense } from "../interfaces/expense.interface";

const expenseSchema = z.object({
  description: z
    .string()
    .min(3, "La descripción debe tener al menos 3 caracteres")
    .max(255, "La descripción no puede exceder 255 caracteres"),

  category: z
    .string()
    .min(1, "La categoría es obligatoria")
    .max(255, "La categoría no puede exceder 255 caracteres"),

  amount: z.coerce
    .number()
    .min(0.01, "El monto debe ser mayor a 0")
    .max(999999.99, "El monto excede el límite permitido"),

  date: z.string().min(1, "La fecha es obligatoria"),

  supplier: z
    .string()
    .min(2, "El proveedor es obligatorio")
    .max(255, "El proveedor no puede exceder 255 caracteres"),

  metod: z
    .string()
    .min(1, "El método de pago es obligatorio")
    .max(255, "El método no puede exceder 255 caracteres"),

  state: z.boolean(),

  notes: z.string().optional(),
});

export type ExpenseFormValues = z.infer<typeof expenseSchema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  expense?: Expense | null;
  onSubmit: (data: ExpenseFormValues) => void | Promise<void>;
  isSubmitting?: boolean;
}

export const ExpensesFormDialog = ({
  open,
  onOpenChange,
  mode,
  expense,
  onSubmit,
  isSubmitting = false,
}: Props) => {
  const isEditMode = mode === "edit";

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema) as any,
    defaultValues: {
      description: "",
      category: "Mantenimiento",
      amount: 0,
      date: "",
      supplier: "",
      metod: "Transferencia",
      state: true,
      notes: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        description: expense?.description ?? "",
        category: expense?.category ?? "Mantenimiento",
        amount: expense?.amount ?? 0,
        date: expense?.date ?? "",
        supplier: expense?.supplier ?? "",
        metod: expense?.metod ?? "Transferencia",
        state: expense?.state ?? true,
        notes: "",
      });
    }
  }, [open, expense, reset]);

  const submitHandler: SubmitHandler<ExpenseFormValues> = async (data) => {
    await onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Editar Gasto" : "Registrar Nuevo Gasto"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Modifica la información del gasto"
              : "Ingresa la información del gasto"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Descripción *</Label>
            <Input id="description" {...register("description")} />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Categoría *</Label>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
                      <SelectItem value="Reparaciones">Reparaciones</SelectItem>
                      <SelectItem value="Servicios">Servicios</SelectItem>
                      <SelectItem value="Suministros">Suministros</SelectItem>
                      <SelectItem value="Seguridad">Seguridad</SelectItem>
                      <SelectItem value="Limpieza">Limpieza</SelectItem>
                      <SelectItem value="Otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <p className="text-sm text-red-500">{errors.category.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Monto *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                {...register("amount")}
              />
              {errors.amount && (
                <p className="text-sm text-red-500">{errors.amount.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Fecha *</Label>
              <Input id="date" type="date" {...register("date")} />
              {errors.date && (
                <p className="text-sm text-red-500">{errors.date.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="supplier">Proveedor *</Label>
              <Input id="supplier" {...register("supplier")} />
              {errors.supplier && (
                <p className="text-sm text-red-500">{errors.supplier.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="metod">Método de Pago *</Label>
              <Controller
                control={control}
                name="metod"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Transferencia">Transferencia</SelectItem>
                      <SelectItem value="Efectivo">Efectivo</SelectItem>
                      <SelectItem value="Cheque">Cheque</SelectItem>
                      <SelectItem value="Tarjeta">Tarjeta</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.metod && (
                <p className="text-sm text-red-500">{errors.metod.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">Estado *</Label>
              <Controller
                control={control}
                name="state"
                render={({ field }) => (
                  <Select
                    value={field.value ? "true" : "false"}
                    onValueChange={(value) => field.onChange(value === "true")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Pagado</SelectItem>
                      <SelectItem value="false">Pendiente</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.state && (
                <p className="text-sm text-red-500">{errors.state.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notas</Label>
            <Textarea id="notes" rows={3} {...register("notes")} />
            {errors.notes && (
              <p className="text-sm text-red-500">{errors.notes.message}</p>
            )}
          </div>

          <DialogFooter className="flex-col-reverse gap-2 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting
                ? "Guardando..."
                : isEditMode
                ? "Guardar Cambios"
                : "Registrar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};