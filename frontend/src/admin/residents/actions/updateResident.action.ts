import { portalGateApi } from "@/api/portalGateApi";
import type { ResidentResponse, UpdateResidentDTO } from "../interfaces/resident.interface";

export const updateResidentAction = async (
    id: number, 
    payload: UpdateResidentDTO
): Promise<ResidentResponse> => {
    try {
        const { data } = await portalGateApi.put<ResidentResponse>(`/residents/${id}`, payload);
        return data;
    } catch (error) {
        throw error;
    }
}