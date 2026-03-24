import { useQuery } from "@tanstack/react-query"
import { useAuthStore } from "../store/auth.store"
import { LoadingSpinner } from "@/components/custom/LoadingSpinner";

export const CheckAuthProvider = ({children}: any) => {
    
    const { checkAuthStatus } = useAuthStore();

    const { isLoading } = useQuery({
        queryKey: ['auth'],
        queryFn: checkAuthStatus,
        retry: false,
        staleTime: 1000 * 60 * 5,
    }) 

    if(isLoading) return <LoadingSpinner show/>

    return children;
}