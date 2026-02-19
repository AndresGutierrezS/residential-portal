import type { Notification } from "../interfaces/notification.interface"

interface Props {
    notifications: Notification[]
}

export const NotificationModal = ({notifications}: Props) => {
    return (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg border z-50">

            {notifications.length === 0 && (
                <div className="p-4 text-gray-500">
                    No hay notificaciones
                </div>
            )}

            {notifications.map(notification => (

                <div
                    key={notification.id}
                    className="p-4 border-b hover:bg-gray-50 cursor-pointer"
                >
                    <div className="font-semibold">
                        {notification.title}
                    </div>

                    <div className="text-sm text-gray-600">
                        {notification.message}
                    </div>

                </div>

            ))}

        </div>
    )
}
