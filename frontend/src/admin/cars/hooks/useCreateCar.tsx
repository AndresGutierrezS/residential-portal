import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createCarAction } from "../actions/cars.actions"
import type { Car } from "../interfaces/car.interface"

export const useCreateCar = () => {

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (car: Partial<Car>) => createCarAction(car),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] })
    }
  })
}