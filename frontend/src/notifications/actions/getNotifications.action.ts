import { portalGateApi } from "@/api/portalGateApi"


export const getNotificationsAction = async (userId: number) => {

    const response = await portalGateApi.get(`/notifications/${userId}`);

    return response.data;
}