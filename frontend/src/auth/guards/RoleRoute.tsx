import { Navigate } from "react-router";
import { useAuthStore } from "../store/auth.store";

export const RoleRoute = ({ children }: any) => {

    const isAdmin =
        useAuthStore(state => state.isAdmin());

    if (!isAdmin) {
        return <Navigate to="/resident" />;
    }

    return children;
};