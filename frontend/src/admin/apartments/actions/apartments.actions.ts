import { portalGateApi } from "@/api/portalGateApi";
import type { ApartmentResponse } from "../interfaces/apartment.interface";


export const getApartmentsAction = async (): Promise<ApartmentResponse[]> => {
    try {
        const {data} = await portalGateApi.get<ApartmentResponse[]>('apartments');
        return data;
    } catch (error) {
        throw error;
    }
} 

export const createApartmentAction = async () => {
    try {
        const {} = await portalGateApi.post('apartments', )
    } catch (error) {
        throw error;
    }
}