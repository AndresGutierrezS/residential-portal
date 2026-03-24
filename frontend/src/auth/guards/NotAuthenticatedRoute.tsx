import { Navigate } from "react-router";
import { useAuthStore } from "../store/auth.store"
import { LoadingSpinner } from "@/components/custom/LoadingSpinner";


export const NotAuthenticatedRoute = ({ children }: any) => {
    
    const status = useAuthStore(state => state.authStatus);
    const isAdmin = useAuthStore(state => state.isAdmin());

    if(status === 'checking') return <LoadingSpinner show/>;

    if(status === 'authenticated') {
        if(isAdmin) return <Navigate to='/admin' />
        
        return <Navigate to='/' />
    }

    return children;
}