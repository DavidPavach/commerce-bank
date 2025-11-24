import { useState } from "react";

// JSON and Stores
import countriesJson from "../../../../data/countries.json";
import { useTransactionStore } from "@/stores/transactionStore";

// Icons
import { ArrowDown2, SearchNormal1 } from "iconsax-react";

type CountryData = {
    name: string;
    phone_code: string;
};

const CountrySelector = () => {

    const countries: Record<string, CountryData> = countriesJson;
    const defaultCode = Object.keys(countries)[0];
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCode, setSelectedCode] = useState(defaultCode);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const { updateTransaction } = useTransactionStore();
    const selectedCountry = countries[selectedCode];

    const handleSelect = (code: string) => {
        setSelectedCode(code);
        setIsOpen(false);
        updateTransaction({country: countries[code].name})
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const filteredCountries = Object.entries(countries).filter(([_, data]) =>
        data.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative w-full">
            <label className="text-black cursor-pointer">
                Country (Optional)
            </label>

            <div className="relative mt-1">
                <button type="button" onClick={() => setIsOpen((prev) => !prev)} className="flex justify-between items-center bg-inherit px-4 py-4 border focus:border-primary rounded-2xl focus:outline-none w-full duration-300">
                    <div className="flex items-center gap-2">
                        <img src={`/flags/${selectedCode}.png`} alt={selectedCountry.name} className="border rounded w-5 h-4 object-cover" />
                        <span className="text-gray-800">{selectedCountry.name}</span>
                    </div>
                    <span className={`ml-auto transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}>
                        <ArrowDown2 size={16} variant="Bold" />
                    </span>
                </button>

                {isOpen && (
                    <div className="z-[2] absolute bg-white shadow-md mt-2 border rounded-2xl w-full max-h-72 overflow-hidden">
                        <div className="flex items-center gap-2 p-2 border-b">
                            <SearchNormal1 size={16} className="text-gray-400" />
                            <input type="text" placeholder="Search country..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="px-2 py-1 focus:outline-none w-full text-sm" />
                        </div>
                        <ul className="max-h-60 overflow-y-auto">
                            {filteredCountries.length > 0 ? (
                                filteredCountries.map(([code, data]) => (
                                    <li key={code} onClick={() => handleSelect(code)} className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 cursor-pointer">
                                        <img src={`/flags/${code}.png`} alt={data.name} className="border rounded w-5 h-4 object-cover" />
                                        <span className="text-gray-600 text-sm">{data.name}</span>
                                    </li>
                                ))
                            ) : (
                                <li className="px-4 py-3 text-gray-400 text-sm text-center">
                                    No results found
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CountrySelector;
