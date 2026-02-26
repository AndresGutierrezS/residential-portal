import { portalGateApi } from "@/api/portalGateApi"

export const logoutAction = async () => {
    try {
        await portalGateApi.post('/logout');
    } catch (error) {
        throw error;
    }
}