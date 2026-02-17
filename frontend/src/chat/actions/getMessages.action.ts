import { portalGateApi } from "@/api/portalGateApi";
import type { Message } from "../interfaces/message.interface";


export const getMessagesAction = async (): Promise<Message[]> => {

    try {
        const response = await portalGateApi.get<Message[]>('/chat/messages');
        
        return response.data;
    } catch (error) {
        throw error;
    }
}