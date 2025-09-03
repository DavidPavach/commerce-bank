//Hooks, Utils and Stores
import { GetCardRequest } from '@/services/queries.service';
import { formatCardNumber, formatCurrency, maskNumber } from '@/utils/format';
import { useUserStore } from "@/stores/userStore";

//Components
import { SkeletonLoader } from '@/components/LoadingScreen';
import { ErrorScreen } from '@/components/ErrorComponents';

//Icons
import { Gift } from 'iconsax-react';
import { CreditCard, Lock, Eye } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Card = () => {

    const { balance } = useUserStore();
    const { data, isFetching, isError, isLoading, refetch } = GetCardRequest();

    if (isFetching || isLoading) return <SkeletonLoader lines={3} />
    if (isError) return <ErrorScreen variant="card" type="500" size="sm" title='Error' message="Failed to fetch your card, kindly try again." onRetry={refetch} />

    return (
        <main className="bg-white shadow-sm p-4 border border-neutral-200 rounded-3xl w-full">
            <h2 className="mb-4 font-semibold text-lightBlack text-sm md:text-base xl:text-lg">Credit Cards</h2>

            <div className="bg-gradient-to-r from-lightBlack to-neutral-700 mb-4 p-6 rounded-xl text-white">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-white/80 text-sm">Commerce Credit Card</p>
                        <p className="text-white/60 text-xs">{data && data.data && formatCardNumber(maskNumber(data.data.cardNumber))}</p>
                    </div>
                    <CreditCard size={24} className="text-goldenYellow" />
                </div>

                <div className="flex justify-between items-end">
                    <div>
                        <p className="mb-1 text-white/80 text-xs">Available Credit</p>
                        <p className="font-bold text-xl">{formatCurrency(balance ?? 0)}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-white/80 text-xs">Expires</p>
                        <p className="font-medium text-sm">{data && data.data && data.data.cardExpiryDate}</p>
                    </div>
                </div>
            </div>

            <div className="gap-4 grid grid-cols-2">
                <div className="bg-neutral-100 p-4 rounded-lg text-center">
                    <p className="font-bold text-primary text-2xl">2.5%</p>
                    <p className="text-neutral-600 text-xs">Cashback Rate</p>
                </div>
                <div className="bg-neutral-100 p-4 rounded-lg text-center">
                    <Gift variant='Bold' className='mx-auto size-5 xl:size-6 text-primary' />
                    <p className="text-neutral-600 text-xs">Exclusive Gifts & Rewards</p>
                </div>
            </div>

            <div className="flex space-x-2 my-2.5 xl:my-5">
                <NavLink to="/user/cards" className="flex flex-1 justify-center items-center space-x-2 bg-primary hover:bg-primary/90 disabled:bg-gray-600 px-4 py-2 rounded-lg text-white disabled:text-gray-300 transition-colors disabled:cursor-not-allowed">
                    <Eye size={16} />
                    <span>View Details</span>
                </NavLink>
                <button disabled={data && data.data === null} className="flex flex-1 justify-center items-center space-x-2 hover:bg-neutral-50 px-4 py-2 border border-neutral-200 rounded-lg text-lightBlack disabled:text-gray-300 transition-colors disabled:cursor-not-allowed">
                    <Lock size={16} />
                    <span>Freeze Card</span>
                </button>
            </div>
        </main>
    );
}

export default Card;