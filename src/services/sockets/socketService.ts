/* eslint-disable @typescript-eslint/no-explicit-any */
import { io, Socket } from 'socket.io-client';
import { ulid } from "ulid";

//Stores
import { useChatStore } from '@/stores/message.store';

//Environment Variable
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, { autoConnect: false });
  }
  return socket;
};

export const connectSocket = (userId: string, isAdmin = false, adminConnect = "") => {
  const s = getSocket();
  if (!s.connected) {
    s.connect();
    s.emit('joinRoom', { userId, isAdmin, adminConnect });
  }
  return s;
};

export const disconnectSocket = () => {
  const s = getSocket();
  if (s.connected) {
    s.removeAllListeners();
    s.disconnect();
  }
};

// ✅ Emitters for chat and user actions

//Send Message
export const sendMessage = (from: string, to: string, text: string, callback?: (res: any) => void) => {

  const id = ulid();
  const timestamp = Date.now();

  const message = {
    id,
    from,
    to,
    text,
    timestamp,
    status: 'pending' as const,
  };

  // Optimistically add message
  useChatStore.getState().addMessage(message);


  getSocket().emit('sendMessage', { id, from, to, text }, (response: any) => {
    if (response.success) {
      // Replace optimistic message data (status, confirmed timestamp, etc.)
      useChatStore.getState().replaceMessage(id, response.data);
    } else {
      useChatStore.getState().updateMessageStatus(id, 'failed');
    }

    callback?.(response);
  });
};

//Resend Message
export const resendMessage = (msg: Message) => {
  useChatStore.getState().deleteMessage(msg.id);
  sendMessage(msg.from, msg.to, msg.text);
};

//Delete Message
export const deleteMessage = (id: string, from: string, to: string, callback?: (res: any) => void) => {
  getSocket().emit("deleteMessage", { id, from, to }, (response: any) => {
    if (response.success) {
      useChatStore.getState().deleteMessage(id);
    }
    callback?.(response)
  })
}

//Start Typing
export const startTyping = (from: string, to: string) => {
  getSocket().emit('typing', { from, to, isTyping: true });
};

//Stop Typing
export const stopTyping = (from: string, to: string) => {
  getSocket().emit('typing', { from, to, isTyping: false });
};

//Mark Messages as Read
export const markMessagesAsRead = (userId: string, otherUserId: string, callback?: (res: any) => void) => {
  getSocket().emit('markAsRead', { userId, otherUserId }, (response: any) => {
    callback?.(response)
  });
};

//Fetch All Conversations
export const fetchAllConversations = (userId: string, isAdmin = false) => {
  getSocket().emit('getAllConversations', { userId, isAdmin });
};

// ADMIN SECTION

//Logout User
export const logoutUser = (userId: string, callback?: (res: any) => void) => {
  getSocket().emit('logoutUser', userId, (response: any) => {
    callback?.(response)
  });
};

//Suspend User
export const suspendUser = (userId: string, email: string, suspended: boolean, callback?: (res: any) => void) => {
  getSocket().emit('suspendUser', { userId, email, suspended }, (response: any) => {
    callback?.(response)
  });
}