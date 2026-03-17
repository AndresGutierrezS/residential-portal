import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

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
    open: boolean;
    onOpenChange: (open: boolean) => void;
    resident: {
        name: string;
        unit: string;
    } | null;
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
                <strong>{resident?.name}</strong> de la unidad{" "}
                <strong>{resident?.unit}</strong>.
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
