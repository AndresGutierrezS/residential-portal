import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useChat } from "../hooks/useChat"
import { MessageInput } from "./MessageInput"
import { MessageList } from "./MessageList"

export const ChatContainer = () => {
  
    const {isLoading, messages, sendMessage} = useChat();

    return (
        <>
            <Card className="h-[calc(100vh-16rem)]">
                <CardHeader>
                <CardTitle>Anuncios y Mensajes</CardTitle>
                <CardDescription>
                    Todos los residentes pueden ver y enviar mensajes
                </CardDescription>
                </CardHeader>
                <CardContent className="h-[calc(100%-5rem)] flex flex-col">
                    <MessageList messages={messages}/>
                    <MessageInput sendMessage={sendMessage}/>
                </CardContent>
            </Card>
        </>
    )
}
