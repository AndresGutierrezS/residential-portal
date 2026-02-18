import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef } from "react";
import type { Message } from "../interfaces/message.interface";
import { MessageItem } from "./MessageItem";

interface Props {
    messages: Message[]
}

export const MessageList = ({messages}: Props) => {
  
    const scrollRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
            <div className="space-y-4">
                {messages.map((msg) => {
                const isCurrentUser = msg.sender_id === Number(localStorage.getItem("userId"));
                return (
                    <MessageItem key={msg.id} isCurrentUser={isCurrentUser} msg={msg}/>
                );
                })}
            </div>
        </ScrollArea>  
    )
}
