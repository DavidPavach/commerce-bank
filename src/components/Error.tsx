import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

//Icons
import { Refresh } from "iconsax-react";


export default function ErrorDisplay({ title = "Something went wrong", message = "We encountered an error while processing your request.", retryLabel = "Try again", isFullPage = false, onRetry,
}: ErrorDisplayProps) {

    const [isRetrying, setIsRetrying] = useState<boolean>(false)

    const handleRetry = async () => {
        if (!onRetry || isRetrying) return

        setIsRetrying(true)
        try {
            await onRetry()
        } catch (error) {
            console.error("Retry failed:", error)
        } finally {
            setIsRetrying(false)
        }
    }

    const Container = isFullPage ? "div" : motion.div

    return (
        <Container className={`${isFullPage ? "min-h-screen flex items-center justify-center p-4" : ""} bg-black text-white`}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className={`w-full ${isFullPage ? "max-w-md" : ""} rounded-xl overflow-hidden`}>
                <div className="flex flex-col items-center p-6">

                    <div className="flex justify-center items-center bg-red-500/40 mb-4 p-3 rounded-full size-16">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                            <line x1="12" y1="9" x2="12" y2="13"></line>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                    </div>

                    <h3 className="mb-2 font-medium text-white text-sm md:text-base xl:text-lg">{title}</h3>
                    <p className="mb-6 max-w-md text-neutral-400 text-center">{message}</p>

                    <button onClick={handleRetry} disabled={isRetrying}
                        className="relative flex justify-center items-center space-x-2 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-70 px-6 py-3 rounded-lg text-white transition-colors disabled:cursor-not-allowed">
                        <AnimatePresence mode="wait">
                            {isRetrying ? (
                                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex justify-center items-center">
                                    <svg className="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </motion.div>
                            ) : (
                                <motion.div key="retry" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-center items-center space-x-2">
                                    <Refresh />
                                    <span>{retryLabel}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </motion.div>
        </Container>
    )
}
