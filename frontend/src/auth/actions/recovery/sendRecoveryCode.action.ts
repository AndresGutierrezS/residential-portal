import { portalGateApi } from "@/api/portalGateApi"

interface SendCodeResponse {
    message: string;
}

export const sendRecoveryCodeAction = async (email: string): Promise<SendCodeResponse> => {
    try {
        const { data } = await portalGateApi.post('/forgot-password', {
            email
        });
        return data;
    } catch (error: any) {
        throw error.response?.data || { message: "Error al enviar código" };
    }
}