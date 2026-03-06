import { portalGateApi } from "@/api/portalGateApi"
import type { AuthResponse } from "../interfaces/auth.response";


export const loginAction = async (email: string, password: string): Promise<AuthResponse> => {

    try {
        const { data } = await portalGateApi.post<AuthResponse>('/login', {
            email,
            password
        });
        //console.log(data.user);
        return data
    } catch (error) {
        console.log(error);
        throw error;
    }
}