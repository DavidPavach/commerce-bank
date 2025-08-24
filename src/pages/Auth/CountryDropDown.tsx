import { useState } from "react";

//JSON
import countriesJson from "../../../data/countries.json";

//Icons
import { ArrowDown2 } from "iconsax-react";

type CountryData = {
    name: string;
    phone_code: string;
};

type CountryPhoneInputProps = {
    onChange: (value: { code: string; name: string; phone_code: string; phoneNumber: string }) => void;
};

const CountryPhoneInput = ({ onChange }: CountryPhoneInputProps) => {

    const countries: Record<string, CountryData> = countriesJson;
    const defaultCode = Object.keys(countries)[0];
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCode, setSelectedCode] = useState(defaultCode);
    const [phoneNumber, setPhoneNumber] = useState("");

    const selectedCountry = countries[selectedCode];

    const handleSelect = (code: string) => {
        setSelectedCode(code);
        setIsOpen(false);
        triggerChange(phoneNumber, code);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const number = e.target.value;
        setPhoneNumber(number);
        triggerChange(number, selectedCode);
    };

    const triggerChange = (number: string, code: string) => {
        const { name, phone_code } = countries[code];
        onChange({ code, name, phone_code, phoneNumber: number });
    };

    return (
        <div className="relative w-full">
            <label className="font-medium text-black cursor-pointer">
                Phone Number <span className="text-red-500">*</span>
            </label>

            <div className="flex gap-2 mt-1">
                <div className="relative w-80">
                    <button type="button" onClick={() => setIsOpen((prev) => !prev)} className="flex justify-between items-center bg-[#F8F6F1] px-4 py-3 rounded-3xl focus:outline-none w-full">
                        <div className="flex items-center gap-2">
                            <img src={`/flags/${selectedCode}.png`} alt={selectedCountry.name} className="border rounded w-5 h-4 object-cover" />
                            <span className="text-gray-800">{selectedCountry.phone_code} {selectedCountry.name.substring(0, 4)}.</span>
                        </div>
                        <span className={`ml-auto transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}>
                            <ArrowDown2 size={16} variant="Bold" />
                        </span>
                    </button>

                    {isOpen && (
                        <ul className="z-[2] absolute bg-white shadow-md mt-2 border rounded-2xl w-full max-h-60 overflow-y-auto">
                            {Object.entries(countries).map(([code, data]) => (
                                <li key={code} onClick={() => handleSelect(code)} className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 cursor-pointer">
                                    <img src={`/flags/${code}.png`} alt={data.name} className="border rounded w-5 h-4 object-cover" />
                                    <span className="text-gray-600 text-sm">{data.name}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <input type="tel" required placeholder="000 000 0000" value={phoneNumber} onChange={handlePhoneChange} className="bg-[#F8F6F1] px-4 py-3 rounded-3xl focus:outline-none w-full text-sm md:text-base xl:text-lg duration-300 focus:caret-primary" />
            </div>
        </div>
    );
};

export default CountryPhoneInput;
