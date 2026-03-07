import { portalGateApi } from "@/api/portalGateApi"
import type { Car, CarsResponse } from "../interfaces/car.interface"

export const getCarsAction = async (): Promise<Car[]> => {
    try {
        const { data } = await portalGateApi.get<CarsResponse>('cars');
        return data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const createCarAction = async (car: Partial<Car>): Promise<CarsResponse> => {
    try {
        const { data } = await portalGateApi.post<CarsResponse>('cars', car);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateCarAction = async (id: number, car: Partial<Car>): Promise<CarsResponse> => {
    try {
        const { data } = await portalGateApi.put<CarsResponse>(`cars/${id}`, car);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const DeleteCarAction = async (id: number): Promise<string> => {
    try {
        const { data } = await portalGateApi.delete<CarsResponse>(`cars/${id}`);
        return data.message + ` ${id}`;
    } catch (error) {
        console.log(error);
        throw error;
    }
}