import { useQuery } from "@tanstack/react-query"
import { getCarsAction } from "../actions/cars.actions"
import type { Car } from "../interfaces/car.interface"

export const useCars = () => {

  return useQuery<Car[]>({
    queryKey: ["cars"],
    queryFn: getCarsAction
  })

}