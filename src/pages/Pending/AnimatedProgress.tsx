import { motion } from "framer-motion";

const AnimatedProgress = ({ value }: { value: number }) => {
    return (
        <div className="relative bg-neutral-200 rounded-full w-full h-3 overflow-hidden">
            <motion.div className="relative bg-primary h-full overflow-hidden" initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 1.2, ease: "easeOut" }}>
                <motion.div className="absolute inset-0 bg-[length:40px_40px] bg-[linear-gradient(135deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] opacity-80" animate={{ backgroundPositionX: ["0%", "100%"] }} transition={{ repeat: Infinity, duration: 6, ease: "linear" }} />
            </motion.div>
        </div>
    );
};

export default AnimatedProgress;
