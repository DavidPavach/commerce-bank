import { create } from "zustand";
import axios from "axios";

type CurrencyStore = {
    currencies: Currencies | null;
    fetchCurrencies: () => Promise<void>;
};

export const useCurrencyStore = create<CurrencyStore>((set, get) => ({
    currencies: null,
    fetchCurrencies: async () => {
        if (get().currencies) return;

        try {
            const response = await axios.get("https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_IGUEXIKmzwNPftMzVcc5ENYlcqIdTIVTSgDPecWR");
            const data = response.data?.data;
            set({ currencies: data });
        } catch (error) {
            console.error("Failed to fetch currencies:", error);
        }
    }
}));

// Create a selector to access currencies and fetch them if necessary
export const useCurrencies = () => {
    const { currencies, fetchCurrencies } = useCurrencyStore();

    // Automatically fetch currencies if they are not available
    if (!currencies) {
        fetchCurrencies();
    }

    return currencies;
};