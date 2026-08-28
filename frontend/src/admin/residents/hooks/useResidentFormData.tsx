import { useQuery } from "@tanstack/react-query"
import { getPendingResidentsAction } from "../actions/pendingResidents.action"
import { getResidentRolesAction } from "../actions/residentRoles.action";


export const useResidentFormData = () => {
    
    const pendingPeopleQuery = useQuery({
        queryKey: ['pending-people'],
        queryFn: getPendingResidentsAction
    });

    const rolesQuery = useQuery({
        queryKey: ['resident-roles'],
        queryFn: getResidentRolesAction,
    });

    return {
        pendingPeople: pendingPeopleQuery.data ?? [],
        roles: rolesQuery.data ?? [],

        isLoading: pendingPeopleQuery.isLoading || rolesQuery.isLoading,
    }
}