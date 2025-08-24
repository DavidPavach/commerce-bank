import { create } from 'zustand';

//APIs
import { deleteNotificationFn } from '@/services/api.service';

export type Notification = {
  _id: string;
  user: string;
  type: string;
  subtype?: string;
  title: string;
  message: string;
  data: {
    transactionId?: string;
    amount?: number;
    balance?: number;
    data?: Date;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
  createdAt: Date;
  updatedAt: Date;
};

type Store = {
  notifications: Notification[];
  addAllNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  clearNotification: (id: string) => Promise<void>;
};

export const useNotificationStore = create<Store>((set) => ({
  notifications: [],

  addAllNotifications: (notifications) =>
    set(() => ({
      notifications: [...notifications],
    })),

  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),

  clearNotification: async (id) => {
    await deleteNotificationFn(id);
    set((state) => ({
      notifications: state.notifications.filter((n) => n._id !== id),
    }));
  },
}));
