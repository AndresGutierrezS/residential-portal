import { Navigate } from "react-router";
import { useAuthStore } from "../store/auth.store"


export const NotAuthenticatedRoute = ({ children }: any) => {
    
    const status = useAuthStore(state => state.authStatus);
    const isAdmin = useAuthStore(state => state.isAdmin());

    if(status === 'checking') return null;

    if(status === 'authenticated') {
        if(isAdmin) return <Navigate to='/admin' />
        
        return <Navigate to='/' />
    }

    return children;
}