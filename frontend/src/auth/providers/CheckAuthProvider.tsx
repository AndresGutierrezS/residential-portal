import { useQuery } from "@tanstack/react-query"
import { useAuthStore } from "../store/auth.store"

export const CheckAuthProvider = ({children}: any) => {
    
    const { checkAuthStatus } = useAuthStore();

    const { isLoading } = useQuery({
        queryKey: ['auth'],
        queryFn: checkAuthStatus,
        retry: false,
        staleTime: 1000 * 60 * 5,
    }) 

    if(isLoading) return <div>Loading...</div>;

    return children;
}