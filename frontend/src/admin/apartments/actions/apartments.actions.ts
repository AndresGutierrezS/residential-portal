import { portalGateApi } from "@/api/portalGateApi";
import type { ApartmentDTO, ApartmentResponse } from "../interfaces/apartment.interface";


export const getApartmentsAction = async (): Promise<ApartmentResponse[]> => {
    try {
        const { data } = await portalGateApi.get<ApartmentResponse[]>('apartments');
        return data;
    } catch (error) {
        throw error;
    }
} 

export const createApartmentAction = async (payload: ApartmentDTO): Promise<ApartmentResponse> => {
    try {
        const { data } = await portalGateApi.post<ApartmentResponse>('apartments', payload);
        return data;
    } catch (error) {
        throw error;
    }
}

export const updateApartmentAction = async (id: number, payload: ApartmentDTO): Promise<ApartmentResponse> => {
    try {
        const { data } = await portalGateApi.put<ApartmentResponse>(`apartments/${id}`, payload);
        return data;
    } catch (error) {
        throw error;
    }
}

export const deleteApartmentAction = async (id: number): Promise<void> => {
    try {
        await portalGateApi.delete(`apartments/${id}`);
    } catch (error) {
        throw error;
    }
}