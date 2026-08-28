import { portalGateApi } from "@/api/portalGateApi"
import type { Role } from "../interfaces/role.interface";


export const getResidentRolesAction = async (): Promise<Role[]> => {
    const { data } = await portalGateApi.get<Role[]>('residents/roles');
    return data;
}