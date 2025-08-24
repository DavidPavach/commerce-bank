import { useState } from "react";
import { toast } from "react-fox-toast";

//Utils, Enums, Stores
import { formatCurrency } from "@/utils/format";
import { coinMeta, SubType } from "@/enums";
import { useTransactionStore } from "@/stores/transactionStore";

//Components
import Input from "@/components/Input";
import Button from "@/components/Button";
import Pin from "../Transfer/Pin";

//Icons
import { AlertTriangle, TrendingDown, TrendingUp } from "lucide-react";
import { ArrowUp2, Shield } from "iconsax-react";

const Form = ({ prices, balance }: { prices: Prices, balance: number }) => {

    type PriceInfo = Prices[string];

    const [selectedCoin, setSelectedCoin] = useState<{ coin: string; data: PriceInfo }>({ coin: "bitcoin", data: prices["bitcoin"] });
    const [formData, setFormData] = useState({ amount: '', walletAddress: '', fullName: '', note: '' })
    const { updateTransaction, updateDetails } = useTransactionStore();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [pinPage, setPinPage] = useState<boolean>(false);

    //Functions
    const toggleOpen = () => setIsOpen((prev) => !prev);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.amount || parseFloat(formData.amount) <= 0) {
            newErrors.amount = 'Please enter a valid amount';
        }

        if (!formData.walletAddress.trim()) {
            newErrors.walletAddress = 'Wallet address is required';
        } else if (formData.walletAddress.length < 26) {
            newErrors.walletAddress = 'Please enter a valid wallet address';
        }

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleTransaction = () => {

        setIsSubmitting(true);
        toast("Validating Fields...", { isCloseBtn: true });
        if (!validateForm()) return toast.error("Please review the information you provided for any errors or missing fields.");
        if (parseInt(formData.amount) > (balance)) return toast.error(`Entered amount ${formatCurrency(parseInt(formData.amount))} is bigger than what is available $${balance}.`)


        // Update the Transaction Details
        updateTransaction({ amount: parseInt(formData.amount) })
        updateTransaction({ description: formData.note })
        updateTransaction({ subType: SubType.CRYPTO })
        updateDetails({ accountNumber: formData.walletAddress, fullName: formData.fullName, bankName: selectedCoin.coin, otherDetails: selectedCoin.data.usd.toString() })

        setTimeout(() => {
            setPinPage((prev) => !prev);
            setIsSubmitting(false);
        }, 3000)
    }

    return (
        <>
            {pinPage && <Pin onClose={() => setPinPage((prev) => !prev)} />}
            <main className="bg-neutral-100 text-lightBlack">
                <div className="p-4 md:p-6 border-neutral-200 border-b">
                    <h2 className="font-semibold text-lightBlack text-base md:text-lg xl:text-xl">Cryptocurrency Withdrawal</h2>
                    <p className="text-neutral-600">Withdraw funds to your crypto wallet</p>
                </div>
                <div className="flex md:flex-row flex-col md:justify-between gap-y-5 p-4 md:p-6">
                    <section className="w-full md:w-[60%]">
                        <p className="mb-1 font-semibold text-[11px] text-neutral-500 md:text-xs xl:text-sm">Select Cryptocurrency</p>
                        <div onClick={toggleOpen} className="relative flex justify-between items-center bg-white p-2 border border-neutral-200 rounded-xl cursor-pointer">
                            <div className="flex items-center gap-x-1">
                                <img src={`${coinMeta[selectedCoin.coin].logo}`} alt={`${selectedCoin.coin} logo`} className="size-8 md:size-12 xl:size-14" />
                                <div>
                                    <h3 className="font-semibold text-base sm:text-lg md:text-xl xl:text-2xl">{coinMeta[selectedCoin.coin].symbol}</h3>
                                    <p className="-mt-1 text-neutral-500 md:text-xs xl:text-sm capitalize text[11px]">{selectedCoin.coin}</p>
                                </div>
                            </div>
                            <div>
                                <p className={`text-[11px] md:text-xs xl:text-sm px-2 py-1 rounded-full w-fit font-semibold ${selectedCoin.data.usd_24h_change >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{selectedCoin.data.usd_24h_change >= 0 ? "+" : ""}{selectedCoin.data.usd_24h_change.toFixed(2)}</p>
                                <p className="font-semibold text-primary">{formatCurrency(selectedCoin.data.usd)}</p>
                            </div>
                            <ArrowUp2 variant="Bold" className={`size-4 md:size-5 xl:size-6 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                            {isOpen &&
                                <div className="top-full right-0 left-0 z-50 absolute bg-white shadow-lg mt-2 border border-neutral-200 rounded-lg max-h-80 overflow-y-auto">
                                    {Object.keys(prices).map((coin, index) => {
                                        const data = prices[coin];
                                        const meta = coinMeta[coin];

                                        if (!data || !meta) return null;

                                        return (
                                            <button key={index} onClick={() => setSelectedCoin({ coin, data })} className="flex justify-between items-center space-x-3 hover:bg-neutral-50 px-4 py-3 w-full text-left transition-colors">
                                                <div className="flex items-center">
                                                    <img src={meta.logo} alt={`${coin} logo`} className="size-8 md:size-12 xl:size-14" />
                                                    <div>
                                                        <h3 className="font-semibold text-sm sm:text-base md:text-lg xl:text-xl">{meta.symbol}</h3>
                                                        <p className="-mt-1 text-[11px] text-neutral-500 md:text-xs xl:text-sm capitalize">{coin}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-lightBlack">{formatCurrency(data.usd)}</p>
                                                    <p className="flex justify-end">
                                                        {data.usd_24h_change >= 0 ? (
                                                            <TrendingUp className="size-4 md:size-5 xl:size-6 text-green-600" />
                                                        ) : (
                                                            <TrendingDown className="size-4 md:size-5 xl:size-6 text-red-600" />
                                                        )}
                                                    </p>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            }
                        </div>
                        <div className="flex flex-col gap-y-5">
                            <div className="mt-5">
                                <Input type="number" onChange={(e) => {
                                    setFormData({ ...formData, amount: e.target.value });
                                    if (errors.amount) setErrors({ ...errors, amount: '' });
                                }} min={0} value={formData.amount} label="Amount (USD)" id="amount" placeholder="0.00" otherClass={`${errors.amount ? 'border-red-300' : 'border-neutral-200'}`} required />
                                {errors.amount && <p className="mt-1 text-red-500 text-xs">{errors.amount}</p>}
                            </div>
                            <div>
                                <Input type="text" value={formData.walletAddress}
                                    onChange={(e) => {
                                        setFormData({ ...formData, walletAddress: e.target.value });
                                        if (errors.walletAddress) setErrors({ ...errors, walletAddress: '' });
                                    }} placeholder={`Enter ${selectedCoin.coin} wallet address`} label="Wallet Address" id="amount" otherClass={`${errors.walletAddress ? 'border-red-300' : 'border-neutral-200'}`} required />
                                {errors.walletAddress && <p className="mt-1 text-red-500 text-xs">{errors.walletAddress}</p>}
                                <p className="mt-1 text-neutral-500 text-xs">Double-check the wallet address. Transactions cannot be reversed.</p>
                            </div>
                            <div>
                                <Input label="Full Name" type="text" placeholder="Enter your full name" value={formData.fullName} onChange={(e) => { setFormData({ ...formData, fullName: e.target.value }); if (errors.fullName) setErrors({ ...errors, fullName: '' }); }} otherClass={`${errors.fullName ? 'border-red-300' : 'border-neutral-200'}`} required />
                                {errors.fullName && <p className="mt-1 text-red-500 text-xs">{errors.fullName}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-neutral-700 cursor-pointer">
                                    Note (Optional)
                                </label>
                                <textarea value={formData.note} onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                                    className="bg-inherit px-4 py-3 border focus:border-primary rounded-2xl focus:outline-none w-full placeholder:text-xs text-sm md:placeholder:text-sm md:text-base xl:placeholder:text-base xl:text-lg duration-300 focus:caret-primary resize-none"
                                    placeholder="Add a note for this transaction"
                                />
                            </div>
                            <Button onClick={handleTransaction} text="Create Transaction" loadingText="Processing..." variant='primary' size='lg' disabled={isSubmitting} loading={isSubmitting} />
                        </div>
                    </section>
                    <section className="flex flex-col gap-y-5 mt- w-full md:w-[35%]">
                        <main className="bg-white shadow-sm p-4 md:p-6 border border-neutral-200 rounded-xl">
                            <h3 className="mb-4 font-semibold text-lightBlack">Transaction Summary</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-neutral-600">Amount (USD)</span>
                                    <span className="font-medium text-lightBlack">{formatCurrency(parseInt(formData.amount))}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-neutral-600">Crypto Amount</span>
                                    <span className="font-medium text-lightBlack capitalize">
                                        {coinMeta[selectedCoin.coin].symbol} {(parseInt(formData.amount) / selectedCoin.data.usd).toFixed(5)} {selectedCoin.coin}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-neutral-600 capitalize">1 {coinMeta[selectedCoin.coin].symbol}</span>
                                    <span className="font-medium text-primary">{formatCurrency(selectedCoin.data.usd)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-neutral-600">Network Fee</span>
                                    <span className="font-medium text-lightBlack">Variable</span>
                                </div>
                                <hr className="border-neutral-200" />
                                <div className="flex justify-between">
                                    <span className="text-neutral-600">Processing Time</span>
                                    <span className="font-medium text-lightBlack">1-3 business days</span>
                                </div>
                            </div>
                        </main>
                        <main className="bg-blue-50 p-6 border border-blue-200 rounded-xl">
                            <div className="flex items-start space-x-3">
                                <Shield className="flex-shrink-0 mt-0.5 size-4 md:size-5 xl:size-6 text-blue-600" />
                                <div>
                                    <h4 className="mb-2 font-semibold text-blue-800">Security Notice</h4>
                                    <ul className="space-y-1 text-[11px] text-blue-700 md:text-xs xl:text-sm">
                                        <li>• All transactions are encrypted and secure</li>
                                        <li>• Verify wallet address before submitting</li>
                                        <li>• Transactions cannot be reversed</li>
                                        <li>• Keep your transaction receipt</li>
                                    </ul>
                                </div>
                            </div>
                        </main>
                        <main className="bg-amber-50 p-6 border border-amber-200 rounded-xl">
                            <div className="flex items-start space-x-3">
                                <AlertTriangle className="flex-shrink-0 mt-0.5 size-4 md:size-5 xl:size-6 text-amber-600" />
                                <div>
                                    <h4 className="mb-2 font-semibold text-amber-800">Important Warning</h4>
                                    <p className="text-[11px] text-amber-700 md:text-xs xl:text-sm">
                                        Cryptocurrency transactions are irreversible. Please double-check all details before submitting your withdrawal request.
                                    </p>
                                </div>
                            </div>
                        </main>
                    </section>
                </div>
            </main>
        </>
    );
}

export default Form;