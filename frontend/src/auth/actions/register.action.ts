import { portalGateApi } from "@/api/portalGateApi";
import type { RegisterResponse } from "../interfaces/register.response";
import type { RegisterDto } from "../interfaces/register.dto";


export const registerAction = async (payload: RegisterDto): Promise<RegisterResponse> => {

    try {
        const { data } = await portalGateApi.post<RegisterResponse>('auth/register', payload)
        console.log(data);
        return data;

    } catch (error) {
        console.log(error);
        throw error;
    }
    
}