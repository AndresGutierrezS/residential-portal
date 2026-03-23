import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import type { Resident } from '../interfaces/resident.interface'


interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    resident: Resident | null;
    onConfirm: () => void;
}

export const DeleteResidentDialog = ({onOpenChange, open, resident, onConfirm}: Props) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                Esta acción no se puede deshacer. Se eliminará permanentemente el residente{" "}
                <strong>{resident?.fullName}</strong> de la unidad{" "}
                <strong>{resident?.code}</strong>.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={onConfirm}>Eliminar</AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
