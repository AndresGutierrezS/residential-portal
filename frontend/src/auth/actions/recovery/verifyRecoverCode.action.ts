import { portalGateApi } from "@/api/portalGateApi";

interface VerifyCodeResponse {
    message: string;
}

export const verifyRecoveryCodeAction = async (email: string, code: string): Promise<VerifyCodeResponse> => {
    try {
        const { data } = await portalGateApi.post('verify-code', {
            email,
            code
        })
        return data;
    } catch (error: any) {
        throw error.response?.data || { message: "Código inválido" };
    }
}