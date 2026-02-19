import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import { useNotifications } from "../hooks/useNotifications"
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { NotificationModal } from "./NotificationModal";

export const NotificationBell = () => {
    
    const {unreadCount, notifications} = useNotifications();
    const [isOpen, setIsOpen] = useState(false);


    return (
        <div>
            <Button
                variant="ghost"
                size="icon"
                className="relative cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
                >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                    <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                    {unreadCount}
                    </Badge>
                )}
            </Button>

            { isOpen && (
                <NotificationModal notifications={notifications}/>
            )}
        </div>
    )
}
