import { Navigate } from "react-router";
import { useAuthStore } from "../store/auth.store";

export const AdminRoute = ({ children }: any) => {

    const status = useAuthStore(state => state.authStatus);
    const isAdmin = useAuthStore(state => state.isAdmin());

    if (status !== "authenticated") {
        return <Navigate to="/auth" />;
    }

    if (!isAdmin) {
        return <Navigate to="/" />;
    }

    return children;
};