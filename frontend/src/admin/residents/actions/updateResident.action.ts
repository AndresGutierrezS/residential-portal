import { portalGateApi } from "@/api/portalGateApi";
import type { ResidentResponse, ResidentDTO } from "../interfaces/resident.interface";

export const updateResidentAction = async (
    id: number, 
    payload: ResidentDTO
): Promise<ResidentResponse> => {
    try {
        const { data } = await portalGateApi.put<ResidentResponse>(`/residents/${id}`, payload);
        return data;
    } catch (error) {
        throw error;
    }
}