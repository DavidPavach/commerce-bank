import { create } from 'zustand';

//Enums, Libs and Hooks
import { getAccessToken } from '@/lib/token';
import { getPrices, getUserBalanceFn, getUserDetailsFn } from '@/services/api.service';


export const useUserStore = create<UserStore>((set) => ({
    user: null,
    balance: null,
    prices: null,
    setUser: (user) => set({ user }),
    setBalance: (balance) => set({ balance }),
    setPrices: (prices) => set({ prices }),
    clearUser: () => set({ user: null, balance: null, prices: null }),
    refetchUserData: async () => {
        const accessToken = getAccessToken();
        if (!accessToken) return;

        try {
            const [user, balanceRes, pricesRes] = await Promise.all([
                getUserDetailsFn(),
                getUserBalanceFn(),
                getPrices(),
            ]);

            const balance = balanceRes.data;
            const prices = pricesRes.data;

            set({
                user: user.data,
                balance,
                prices,
            });
        } catch (error) {
            console.error('Refetch failed:', error);
        }
    },
    refetchPrices: async () => {
        const pricesData = await getPrices();
        set({ prices: pricesData.data })
    }
}));