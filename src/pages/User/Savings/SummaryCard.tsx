import { ReactNode } from "react";

const SummaryCard = ({ icon, title, value, footerText, classes }: { icon: ReactNode, title: string, value: string | number, footerText: string, classes: string }) => {
    return (
        <main className="bg-white shadow-sm p-6 border border-neutral-200 rounded-xl">
            <div className="flex justify-between items-center mb-2">
                {icon}
                <span className="font-medium text-neutral-500 text-xs xl:text-sm">{title}</span>
            </div>
            <p className={`font-bold ${classes} text-xl md:text-2xl lg:text-3xl outfit xl:text-4xl`}>{value}</p>
            <p className="font-medium text-neutral-500 text-sm xl:text-base">{footerText}</p>
        </main>
    );
}

export default SummaryCard;