//Utils, Stores and Libs
import { useNotificationStore } from "@/stores/notificationStore";
import { disconnectSocket } from "./sockets/socketService";
import { useUserStore } from "@/stores/userStore";
import { clearTokens } from "@/lib/token";

export const handleLogout = async () => {
  try {
    // 1️⃣ Disconnect the socket
    disconnectSocket();

    // 2️⃣ Clear your stores (user, notifications, etc.)
    useUserStore.getState().clearUser();
    // useNotificationStore.getState().clearNotifications();
    clearTokens()

    // 3️⃣ Redirect to login
    window.location.replace('/login');
  } catch (err) {
    console.error('Logout failed', err);
  }
};
