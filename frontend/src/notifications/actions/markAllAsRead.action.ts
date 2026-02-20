import { portalGateApi } from "@/api/portalGateApi"


export const markAllAsReadAction = async (userId: number) => {

    const response = await portalGateApi.patch(`/notifications/${userId}/read-all`);

    return response.data;
}