import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getApartmentsAction } from "../actions/apartments.actions";
import { apartmentMap } from "../mappers/apartment.mapper";


export const useApartments = () => {

    const queryClient = useQueryClient();

    const apartmentsQuery = useQuery({
        queryKey: ['apartments'],
        queryFn: getApartmentsAction,
        select: (data) => data.map(apartmentMap),
    })

    return {
        apartments: apartmentsQuery.data ?? [],
    }
}