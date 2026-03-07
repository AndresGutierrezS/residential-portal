import { useCars } from "./useCars"
import { useCreateCar } from "./useCreateCar"
import { useDeleteCar } from "./useDeleteCar"
import { useUpdateCar } from "./useUpdateCar"

export const useCarsApi = () => {

  const carsQuery = useCars()
  const createMutation = useCreateCar()
  const updateMutation = useUpdateCar()
  const deleteMutation = useDeleteCar()

  return {
    carsQuery,
    createMutation,
    updateMutation,
    deleteMutation
  }
}