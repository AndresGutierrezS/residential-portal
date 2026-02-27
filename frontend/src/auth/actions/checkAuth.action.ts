import { portalGateApi } from "@/api/portalGateApi";
import type { AuthResponse } from "../interfaces/auth.response";


export const checkAuthAction = async (): Promise<AuthResponse> => {

    try {
        const token = localStorage.getItem('token');
        if(!token) throw new Error();
        const { data } = await portalGateApi.get('/me');
        return {
            user: data,
            token
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}