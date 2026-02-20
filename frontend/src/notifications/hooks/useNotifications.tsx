import echo from "@/lib/echo";
import { useEffect, useState } from "react"
import type { Notification } from "../interfaces/notification.interface";
import { getNotificationsAction } from "../actions/getNotifications.action";
import { markAllAsReadAction } from "../actions/markAllAsRead.action";


export const useNotifications = () => {

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const userId = Number(localStorage.getItem('userId') ?? 1);

    useEffect(() => {
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

    useEffect(() => {
        loadNotifications();
    }, [userId]);

    const loadNotifications = async () => {
        const data = await getNotificationsAction(userId);
        setNotifications(data);
        const unread = data.filter((n: Notification) => !n.read_at).length;
        setUnreadCount(unread);
    }
    

    const markAllAsRead = async () => {
        await markAllAsReadAction(userId);
        setNotifications(prev => 
            prev.map(n => ({
                ...n,
                read_at: n.read_at ?? new Date().toISOString(),
            }))
        );
        setUnreadCount(0);
    }

    return {
        notifications,
        unreadCount,
        markAllAsRead,
        reload: loadNotifications,
    };
}