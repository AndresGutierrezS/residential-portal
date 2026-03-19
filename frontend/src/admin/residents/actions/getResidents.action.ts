import { portalGateApi } from "@/api/portalGateApi";
import type { ResidentResponse } from "../interfaces/resident.interface";

export const getResidentsAction = async (): Promise<ResidentResponse[]> => {
    try {
        
        const { data } = await portalGateApi.get<ResidentResponse[]>('/residents');
        return data;

    } catch (error) {
        throw error;
    }
}