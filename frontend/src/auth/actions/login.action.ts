import { portalGateApi } from "@/api/portalGateApi"


export const loginAction = async (email: string, password: string) => {

    try {
        const response = await portalGateApi.post('/login', {
            email,
            password
        });
    
        return response.data
    } catch (error) {
        throw error;
    }
}