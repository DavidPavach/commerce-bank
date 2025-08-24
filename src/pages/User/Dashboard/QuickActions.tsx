import { Link } from 'react-router-dom';

//Icons
import { MoneyRecive } from 'iconsax-react';
import { ArrowUpRight, BookUser, Replace, PiggyBank, FileText } from 'lucide-react';

const actions = [
    { icon: ArrowUpRight, label: 'Transfer', color: 'bg-primary', href: "/user/transfer" },
    { icon: MoneyRecive, label: 'Deposit', color: 'bg-purple-500', href: "/user/deposit" },
    { icon: Replace, label: 'Exchange', color: 'bg-blue-500', href: "/user/exchange" },
    { icon: PiggyBank, label: 'Save', color: 'bg-green-500', href: "/user/savings" },
    { icon: FileText, label: 'History', color: 'bg-gray-500', href: "/user/history" },
    { icon: BookUser, label: 'Beneficiaries', color: 'bg-accent', href: "/user/beneficiaries" },
];

const QuickActions = () => {
    return (
        <main className="bg-white shadow-sm mt-4 p-4 border border-neutral-200 rounded-3xl">
            <h2 className="mb-4 font-semibold text-lightBlack text-sm md:text-base xl:text-lg">Quick Actions</h2>
            <div className="grid grid-cols-3 md:grid-cols-6">
                {actions.map((action, index) => (
                    <Link to={action.href} key={index} className="group flex flex-col items-center hover:bg-neutral-50 p-4 rounded-lg transition-colors">
                        <div className={`${action.color} size-12 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                            <action.icon size={20} className="text-white" />
                        </div>
                        <span className="font-medium text-neutral-600 text-xs">{action.label}</span>
                    </Link>
                ))}
            </div>
        </main>
    );
}

export default QuickActions;
