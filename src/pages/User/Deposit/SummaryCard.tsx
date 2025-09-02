import { ReactNode } from "react";

//Components
import { Card, CardContent } from "@/components/ui/card";

const SummaryCard = ({ icon, iconClasses, title, value }: { icon: ReactNode, iconClasses: string, title: string, value: string | number }) => {
    return (
        <Card className="bg-white shadow-lg backdrop-blur-sm border-0">
            <CardContent className="p-2 md:p-4 xl:p-6">
                <div className="flex items-center gap-x-2">
                    <div className={`p-3 rounded-full ${iconClasses}`}>
                        {icon}
                    </div>
                    <div>
                        <p className="text-[11px] text-slate-600 md:text-xs xl:text-sm">{title}</p>
                        <p className="font-bold text-slate-900 text-lg md:text-xl xl:text-2xl">{value}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default SummaryCard;