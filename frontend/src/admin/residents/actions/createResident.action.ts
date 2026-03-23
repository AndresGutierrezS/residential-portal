import { portalGateApi } from "@/api/portalGateApi"
import type { CreateResidentDTO, ResidentResponse } from "../interfaces/resident.interface"

export const createResidentAction = async (payload: CreateResidentDTO): Promise<ResidentResponse> => {
    try {
        const { data } = await portalGateApi.post<ResidentResponse>('/residents', payload);
        return data;
        
    } catch (error) {
        console.log(payload);
        console.log(error);
        throw error;
    }
}