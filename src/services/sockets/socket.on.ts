import { useEffect } from 'react';

//Services
import { connectSocket } from '@/services/sockets/socketService';
import { handleLogout } from '../logOut';

//Stores and Components
import { useNotificationStore } from '@/stores/notificationStore';
import { useChatStore } from '@/stores/message.store';
import NotificationBox from '@/components/Notification';

export const useSocket = (userId: string, isAdmin = false, adminConnect = "") => {

  const { addAllNotifications, addNotification } = useNotificationStore();
  const { addMessage, setTyping, setConversations, setSelfId, deleteMessage } = useChatStore();

  useEffect(() => {
    if (!userId) return;

    const socket = connectSocket(userId, isAdmin, adminConnect);
    if (isAdmin) {
      setSelfId(adminConnect);
    } else {
      setSelfId(userId);
    }

    //Log socket entries
    socket.onAny((eventName, ...args) => {
      console.log('Socket event:', eventName, ...args);
    });


    //Notifications
    socket.on('allNotifications', addAllNotifications);
    socket.on('notification', (notification) => {
      addNotification(notification);
      NotificationBox({
        type: notification.type,
        title: notification.title,
        message: notification.message,
        createdAt: new Date(notification.createdAt),
      });
    });

    //Conversations data
    socket.on('userConversations', ({ conversations }) => {
      setConversations(conversations);
    });

    //Messaging
    socket.on('newMessage', addMessage);

    //Saving of sent message
    socket.on('messageSent', addMessage);

    //Deleting of Message
    socket.on("messageDeleted", ({ id }) => {
      deleteMessage(id)
    })

    //Typing indicator
    socket.on('typing', ({ from, isTyping }) => {
      setTyping(from, isTyping);
    });

    //User suspended
    socket.on('suspended', () => {
      NotificationBox({
        type: 'alert',
        title: 'Account Suspended',
        message: 'Your account has been suspended. Please contact support.',
        createdAt: new Date(),
      });

      //Redirect to the suspend page
    });

    //Logout user
    socket.on('offline', () => {
      handleLogout()
    })

    return () => {
      socket.off('allNotifications');
      socket.off('notification');
      socket.off('userConversations');
      socket.off('newMessage');
      socket.off('messageSent');
      socket.off('messageDeleted');
      socket.off('typing');
      socket.off('suspended');
      socket.off('offline')
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);
};