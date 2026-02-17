import { useEffect, useState } from "react"
import type { Message } from "../interfaces/message.interface";
import { getMessagesAction } from "../actions/getMessages.action";
import echo from "@/lib/echo";
import { sendMessageAction } from "../actions/sendMessage.action";


export const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        loadMessages();
        connectSocket();

        return () => {
            echo.leave('chat');
        }
    }, []);

    const loadMessages = async () => {
        try {
            const data = await getMessagesAction();
            setMessages(data); 
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    }   

    const connectSocket = () => {
        
        echo.channel('chat').listen(".message.sent", (event: Message) => {
            setMessages(prev => [...prev, event]);
        });
    }

    const sendMessage = async (message: string) => {
        try {
            await sendMessageAction(message);
        } catch (error) {
            throw error;
        }
    }

    return {
        messages,
        isLoading,
        sendMessage,
    }

}