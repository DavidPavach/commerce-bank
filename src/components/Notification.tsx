import { toast } from "react-fox-toast";

//Utils
import { formatDate } from "@/utils/format";

const NotificationBox = ({ type, title, message, createdAt }: { type: string, title: string, message: string, createdAt: Date }) => {
    
    return (
        toast.drawer(
            <div className="flex flex-col pl-4">
                <p className="font-semibold capitalize">
                    New {type}
                </p>
                <p className="text-gray-600 text-sm">{title}</p>
            </div>,
            {
                position: 'top-center',
                expandedContent: (
                    <div className="bg-black p-4 rounded-lg max-w-md text-neutral-100">
                        <p className="mb-2 font-bold">{message}</p>
                        <p className="text-gray-600">{formatDate(createdAt)}</p>
                    </div>
                ),
            }
        )
    );
}

export default NotificationBox;