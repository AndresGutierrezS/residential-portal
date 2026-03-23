import { portalGateApi } from "@/api/portalGateApi";

interface ResetPasswordResponse {
    message: string;
}

interface ResetPasswordDTO {
    email: string;
    code: string;
    password: string;
    password_confirmation: string;
}

export const resetPasswordAction = async (payload: ResetPasswordDTO): Promise<ResetPasswordResponse> => {
    try {
        const { data } = await portalGateApi.post('reset-password', payload);
        return data;
    } catch (error: any) {
        throw error.response?.data || { message: "Error al cambiar contraseña" };
    }
}