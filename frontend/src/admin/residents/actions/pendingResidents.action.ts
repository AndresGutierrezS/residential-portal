import { portalGateApi } from "@/api/portalGateApi"
import type { Person } from "../interfaces/person.interface";


export const getPendingResidentsAction = async (): Promise<Person[]> => {
    const { data } = await portalGateApi.get<Person[]>('residents/pending');
    return data;
}