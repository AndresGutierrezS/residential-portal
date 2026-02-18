import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { useState } from "react";

interface Props {
    onSendMessage: (message: string) => Promise<void>,
}

export const MessageInput = ({onSendMessage: sendMessage}: Props) => {
    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        await sendMessage(newMessage);
        setNewMessage("");
    };
  
    return (
        <form onSubmit={handleSendMessage} className="mt-4 border-t pt-4">
            <div className="flex gap-2">
                <Input
                placeholder="Escribe tu mensaje..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1"
                />
                <Button type="submit" disabled={!newMessage.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Enviar
                </Button>
            </div>
        </form>
    )
}
