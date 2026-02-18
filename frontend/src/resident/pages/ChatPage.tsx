import { ChatContainer } from "@/chat/components/ChatContainer";


export const ChatPage = () => {

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Chat Comunitario</h1>
        <p className="text-gray-600 mt-1">
          Comunicación en tiempo real con los residentes
        </p>
      </div>

      <ChatContainer />
    </div>
  );
}
