import { portalGateApi } from "@/api/portalGateApi";
import type { Message } from "../interfaces/message.interface";

export const sendMessagesAction = async (message: string): Promise<Message> => {

    try {
        const response = await portalGateApi.post<Message>('/chat/messages', {
            message,
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}