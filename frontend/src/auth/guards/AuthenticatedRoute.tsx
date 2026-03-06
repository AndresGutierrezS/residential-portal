import { Navigate } from "react-router";
import { useAuthStore } from "../store/auth.store";

export const AuthenticatedRoute = ({ children }: any) => {

    const status = useAuthStore(state => state.authStatus);

    if (status !== 'authenticated') {
        return <Navigate to="/auth" replace />;
    }

    return children;
};