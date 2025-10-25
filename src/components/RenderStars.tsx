//Icons
import { Star } from "lucide-react";

const RenderStars = ({ rating }: { rating: number }) => {
    return Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`size-4 ${i < rating ? "text-[#F7B50D] fill-current" : "text-neutral-300"}`} />
    ))
}

export default RenderStars;