import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createApartmentAction, deleteApartmentAction, getApartmentsAction, updateApartmentAction } from "../actions/apartments.actions";
import { apartmentMap } from "../mappers/apartment.mapper";
import type { ApartmentDTO } from "../interfaces/apartment.interface";


export const useApartments = () => {

    const queryClient = useQueryClient();

    const apartmentsQuery = useQuery({
        queryKey: ['apartments'],
        queryFn: getApartmentsAction,
        select: (data) => data.map(apartmentMap),
    });

    const createMutation = useMutation({
        mutationFn: createApartmentAction,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['apartments']});
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({id, data}: {id: number, data: ApartmentDTO}) => updateApartmentAction(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['apartments']});
        }
    });

    const deleteMutation = useMutation({
        mutationFn: deleteApartmentAction,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['apartments']});
        }
    });

    return {
        apartments: apartmentsQuery.data ?? [],
        
        isLoading: apartmentsQuery.isLoading,
        isError: apartmentsQuery.isError,

        createApartment: createMutation.mutate,
        updateApartment: updateMutation.mutate,
        deleteApartment: deleteMutation.mutate,
    }
}