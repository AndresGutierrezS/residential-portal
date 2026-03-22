import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getResidentsAction } from "../actions/getResidents.action";
import { mapResident } from "../mappers/resident.mapper";


export const useResidents = () => {
    
    const queryClient = useQueryClient();
    
    const residentsQuery = useQuery({
        queryKey: ['residents'],
        queryFn: getResidentsAction,
        select: (data) => data.map(mapResident),
    });

    return {
        residents: residentsQuery.data ?? [],
    }
}