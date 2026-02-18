import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef } from "react";
import type { Message } from "../interfaces/message.interface";
import { MessageItem } from "./MessageItem";

interface Props {
    messages: Message[],
    currentUserId: number,
    isLoading: boolean,
}

export const MessageList = ({messages, currentUserId, isLoading}: Props) => {
  
    const scrollRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <span className="text-gray-500 text-sm">
                    Cargando mensajes...
                </span>
            </div>
        );
    }

    return (
        <ScrollArea className="flex-1 pr-4 overflow-y-auto">
            <div ref={scrollRef} className="space-y-4 min-h-0">
                {messages.map((msg) => {
                const isCurrentUser = msg.sender_id === currentUserId;
                return (
                    <MessageItem key={msg.id} isCurrentUser={isCurrentUser} msg={msg}/>
                );
                })}
            </div>
        </ScrollArea>  
    )
}
