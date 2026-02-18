import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useChat } from "../hooks/useChat"
import { MessageInput } from "./MessageInput"
import { MessageList } from "./MessageList"

export const ChatContainer = () => {
  
    const {isLoading, messages, sendMessage} = useChat();
    const currentUserId = localStorage.getItem("currentUser") || "Usuario";


    return (
        <>
            <Card className="h-[calc(100vh-16rem)] flex flex-col">
                <CardHeader>
                <CardTitle>Anuncios y Mensajes</CardTitle>
                <CardDescription>
                    Todos los residentes pueden ver y enviar mensajes
                </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col h-full overflow-hidden min-h-0">
                    <MessageList 
                        messages={messages} 
                        currentUserId={currentUserId}
                    />
                    <MessageInput onSendMessage={sendMessage}/>
                </CardContent>
            </Card>
        </>
    )
}
