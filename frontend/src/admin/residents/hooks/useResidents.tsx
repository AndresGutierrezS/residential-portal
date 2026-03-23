import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getResidentsAction } from "../actions/getResidents.action";
import { mapResident } from "../mappers/resident.mapper";
import type { CreateResidentDTO } from "../interfaces/resident.interface";
import { createResidentAction } from "../actions/createResident.action";


export const useResidents = () => {
    
    const queryClient = useQueryClient();
    
    const residentsQuery = useQuery({
        queryKey: ['residents'],
        queryFn: getResidentsAction,
        select: (data) => data.map(mapResident),
    });

    const createMutation = useMutation({
        mutationFn: (payload: CreateResidentDTO) =>
        createResidentAction(payload),
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["residents"] });
        },
    });

    return {
        residents: residentsQuery.data ?? [],
        isLoading: residentsQuery.isLoading,
        isError: residentsQuery.isError,

        createResident: createMutation.mutate,
    }
}