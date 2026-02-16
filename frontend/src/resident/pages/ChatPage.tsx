import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import echo from '@/lib/echo';

interface Message {
  id: string;
  user: string;
  message: string;
  timestamp: Date;
}

export const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      user: "Administración",
      message: "Recordatorio: Mañana habrá mantenimiento del elevador de 9am a 12pm",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "2",
      user: "Juan Pérez",
      message: "¿A qué hora es la reunión de copropietarios?",
      timestamp: new Date(Date.now() - 1800000),
    },
    {
      id: "3",
      user: "María González",
      message: "La reunión es el viernes a las 6pm en el salón comunal",
      timestamp: new Date(Date.now() - 900000),
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentUser = localStorage.getItem("currentUser") || "Usuario";

  useEffect(() => {

  echo.channel("chat")
    .listen(".message.sent", (e: any) => {

      const message: Message = {
        id: Date.now().toString(),
        user: "Usuario " + e.userId,
        message: e.message,
        timestamp: new Date(),
      };
      console.log({message});

      // setMessages(prev => [...prev, message]);

    });

    return () => {
      echo.leave("chat");
    };

  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      user: currentUser,
      message: newMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Chat Comunitario</h1>
        <p className="text-gray-600 mt-1">
          Comunicación en tiempo real con los residentes
        </p>
      </div>

      <Card className="h-[calc(100vh-16rem)]">
        <CardHeader>
          <CardTitle>Anuncios y Mensajes</CardTitle>
          <CardDescription>
            Todos los residentes pueden ver y enviar mensajes
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[calc(100%-5rem)] flex flex-col">
          {/* Messages Area */}
          <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((msg) => {
                const isCurrentUser = msg.user === currentUser;
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${
                      isCurrentUser ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <Avatar>
                      <AvatarFallback>{getInitials(msg.user)}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`flex flex-col ${
                        isCurrentUser ? "items-end" : "items-start"
                      } flex-1 max-w-[70%]`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          {msg.user}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatTime(msg.timestamp)}
                        </span>
                      </div>
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          isCurrentUser
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          {/* Input Area */}
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
        </CardContent>
      </Card>
    </div>
  );
}
