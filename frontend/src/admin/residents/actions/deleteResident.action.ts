import { portalGateApi } from "@/api/portalGateApi";

export const deleteResidentAction = async (id: number): Promise<void> => {
    try {
        await portalGateApi.delete(`residents/${id}`);
    } catch (error) {
        throw error;
    }
}