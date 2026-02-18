import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Message } from "../interfaces/message.interface";

interface Props {
    msg: Message,
    isCurrentUser: boolean
}

export const MessageItem = ({msg, isCurrentUser}: Props) => {
    
    const formatTime = (date: Date) => {
        return new Date(date).toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        });
    };

    const getInitials = (name?: string) => {
        if (!name) return "?";

        return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    };
    
    return (
        <div
            className={`flex gap-3 ${
                isCurrentUser ? "flex-row-reverse" : "flex-row"
            }`}
            >
            <Avatar>
                <AvatarFallback>{getInitials(msg.sender?.name)}</AvatarFallback>
            </Avatar>
            <div
                className={`flex flex-col ${
                isCurrentUser ? "items-end" : "items-start"
                } flex-1 max-w-[70%]`}
            >
                <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-900">
                    {msg.sender?.name}
                </span>
                <span className="text-xs text-gray-500">
                    {formatTime(msg.sent_at)}
                </span>
                </div>
                <div
                className={`px-4 py-2 rounded-lg max-w-full wrap-break-word whitespace-pre-wrap ${
                    isCurrentUser
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
                >
                <p className="text-sm wrap-break-word whitespace-pre-wrap">{msg.message}</p>
                </div>
            </div>
        </div>
    )
}
