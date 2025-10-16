// Services
import { disconnectSocket } from "./sockets/socketService";

//Libs
import { clearTokens } from "@/lib/token";

// Stores
import { useNotificationStore } from "@/stores/notificationStore";
import { useTransactionStore } from "@/stores/transactionStore";
import { useChatStore } from "@/stores/message.store";
import { useUserStore } from "@/stores/userStore";

export const handleLogout = () => {
  try {

    // Disconnect the socket
    disconnectSocket();

    // Clear your stores (user, notifications, etc.)
    useUserStore.getState().clearUser();
    useTransactionStore.getState().resetTransaction();
    useNotificationStore.getState().clearAllNotifications();
    useChatStore.getState().reset();

    // Clear tokens
    clearTokens()

    // Redirect to login
    window.location.replace('/login');
  } catch (err) {
    console.error('Logout failed', err);
  }
};
