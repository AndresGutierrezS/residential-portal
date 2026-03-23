import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getResidentsAction } from "../actions/getResidents.action";
import { mapResident } from "../mappers/resident.mapper";
import type { ResidentDTO } from "../interfaces/resident.interface";
import { createResidentAction } from "../actions/createResident.action";
import { updateResidentAction } from "../actions/updateResident.action";
import { deleteResidentAction } from "../actions/deleteResident.action";


export const useResidents = () => {
    
    const queryClient = useQueryClient();
    
    const residentsQuery = useQuery({
        queryKey: ['residents'],
        queryFn: getResidentsAction,
        select: (data) => data.map(mapResident),
    });

    const createMutation = useMutation({
        mutationFn: (payload: ResidentDTO) =>
        createResidentAction(payload),
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["residents"] });
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: ResidentDTO }) =>
            updateResidentAction(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["residents"] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => deleteResidentAction(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["residents"] });
        },
    });

    return {
        residents: residentsQuery.data ?? [],
        isLoading: residentsQuery.isLoading,
        isError: residentsQuery.isError,

        createResident: createMutation.mutate,
        updateResident: updateMutation.mutate,
        deleteResident: deleteMutation.mutate,
    }
}