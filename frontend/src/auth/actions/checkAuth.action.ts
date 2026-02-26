import { portalGateApi } from "@/api/portalGateApi";


export const checkAuthAction = async () => {

    try {
        const token = localStorage.getItem('token');
        if(!token) throw new Error();
        const { data } = await portalGateApi.get('/me');
        return {
            user: data,
            token
        }
    } catch (error) {
        throw error;
    }
}