import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import type { Apartment } from "../interfaces/apartment.interface";

interface Props {
  apartment: Apartment | null;
  onClose: () => void;
  onConfirm: (id: number) => void;
}

export const DeleteApartmentDialog = ({apartment, onClose, onConfirm}: Props) => {
    return (
      <AlertDialog open={!!apartment} onOpenChange={() => onClose()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente la unidad{" "}
              <strong>{apartment?.code}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => apartment && onConfirm(apartment.id)}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
}
