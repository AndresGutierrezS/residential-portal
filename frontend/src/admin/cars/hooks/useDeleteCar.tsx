import { useMutation, useQueryClient } from "@tanstack/react-query"
import { DeleteCarAction } from "../actions/cars.actions"

export const useDeleteCar = () => {

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: DeleteCarAction,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] })
    }
  })
}