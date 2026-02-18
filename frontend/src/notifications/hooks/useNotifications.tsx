import echo from "@/lib/echo";
import { useEffect, useState } from "react"
import type { Notification } from "../interfaces/notification.interface";


export const useNotifications = () => {

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const userId = localStorage.getItem('userId') ?? 1;
        if(!userId) return;

        const channel = echo.private(`notifications.${userId}`)
            .listen(".notification.created", (e: any) => {
                const notification = e.notification;
                setNotifications(prev => [notification, ...prev]);
                setUnreadCount(prev => prev + 1);
                console.log({notification});
            });

            return () => {
                echo.leave(`notifications.${userId}`);
            }
    }, []);

    return {
        notifications,
        unreadCount
    };
}