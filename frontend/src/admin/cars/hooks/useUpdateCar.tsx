import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateCarAction } from "../actions/cars.actions"
import type { Car } from "../interfaces/car.interface"

export const useUpdateCar = () => {

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, car }: { id: number; car: Partial<Car> }) =>
      updateCarAction(id, car),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] })
    }
  })
}