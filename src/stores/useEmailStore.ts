import { create } from 'zustand';

type UserEmailState = {
    email: string | null;
    setEmail: (email: string) => void;
    clearEmail: () => void;
};

export const useUserEmailStore = create<UserEmailState>((set) => ({
    email: null,
    setEmail: (email) => set({ email }),
    clearEmail: () => set({ email: null }),
}));
