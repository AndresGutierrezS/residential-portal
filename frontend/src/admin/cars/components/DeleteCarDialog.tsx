import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog"

interface Props {

  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void

}

export const DeleteCarDialog = ({
  open,
  onOpenChange,
  onConfirm
}: Props) => {

  return (

    <AlertDialog open={open} onOpenChange={onOpenChange}>
      
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Eliminar vehículo?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. El vehículo será eliminado permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>

    </AlertDialog>

  )
}