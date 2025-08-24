import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

// Stores and Utils
import { useNotificationStore } from '@/stores/notificationStore';
import NotificationBox from '@/components/Notification';

let socket: Socket;
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const useSocket = (user: string) => {
    const { addAllNotifications, addNotification } = useNotificationStore();

    useEffect(() => {
        if (!user) return;

        socket = io(SOCKET_URL);

        socket.on('connect', () => {
            socket.emit('joinRoom', user);
        });

        socket.on('allNotifications', (notifications) => {
            addAllNotifications(notifications);
        });

        socket.on('notification', (notification) => {
            addNotification(notification);

            NotificationBox({
                type: notification.type,
                title: notification.title,
                message: notification.message,
                createdAt: new Date(notification.createdAt),
            });
        });

        return () => {
            socket.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);
};
