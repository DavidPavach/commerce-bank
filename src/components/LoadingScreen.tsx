import { motion } from "framer-motion"
import { Shield } from "lucide-react"

interface LoadingScreenProps {
    variant?: "fullscreen" | "overlay" | "inline" | "minimal"
    size?: "sm" | "md" | "lg"
    message?: string
    showLogo?: boolean
    showProgress?: boolean
    progress?: number
    className?: string
}

export function LoadingScreen({ variant = "fullscreen", size = "md", message = "Loading...", showLogo = true, showProgress = false, progress = 0, className = "" }: LoadingScreenProps) {

    const sizeClasses = {
        sm: "w-6 h-6",
        md: "w-8 h-8",
        lg: "w-12 h-12",
    }

    const logoSizes = {
        sm: "w-8 h-8",
        md: "w-12 h-12",
        lg: "w-16 h-16",
    }

    const textSizes = {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.3,
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    }

    const spinnerVariants = {
        animate: {
            rotate: 360,
            transition: {
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear" as const,
            },
        },
    }

    const pulseVariants = {
        animate: {
            scale: [1, 1.05, 1],
            transition: {
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut" as const,
            },
        },
    }

    const dotVariants = {
        animate: {
            y: [0, -10, 0],
            transition: {
                duration: 0.6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut" as const,
            },
        },
    }

    // Fullscreen Loading
    if (variant === "fullscreen") {
        return (
            <motion.div variants={containerVariants} initial="hidden" animate="visible"
                className={`fixed inset-0 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center z-50 ${className}`}>
                <div className="text-center">
                    {showLogo && (
                        <motion.div variants={itemVariants} className="mb-8">
                            <motion.div className={`inline-flex items-center justify-center ${logoSizes[size]} rounded-full mb-4`} style={{ backgroundColor: "#1D9B5E" }}
                                variants={pulseVariants} animate="animate">
                                <Shield className={`${sizeClasses[size]} text-white`} />
                            </motion.div>
                            <h2 className="font-bold text-slate-900 text-xl">Commerce Bank USA</h2>
                        </motion.div>
                    )}

                    <motion.div variants={itemVariants} className="mb-6">
                        <motion.div className={`${sizeClasses[size]} border-4 border-[#1D9B5E] border-t-transparent rounded-full mx-auto`}
                            variants={spinnerVariants} animate="animate" />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <p className={`${textSizes[size]} text-slate-600 mb-4`}>{message}</p>
                        {showProgress && (
                            <div className="mx-auto w-64">
                                <div className="flex justify-between mb-2 text-slate-500 text-sm">
                                    <span>Progress</span>
                                    <span>{progress}%</span>
                                </div>
                                <div className="bg-slate-200 rounded-full w-full h-2">
                                    <motion.div
                                        className="rounded-full h-2"
                                        style={{ backgroundColor: "#1D9B5E" }}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>
                            </div>
                        )}
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex justify-center space-x-1 mt-6">
                        {[0, 1, 2].map((index) => (
                            <motion.div key={index} className="rounded-full w-2 h-2" style={{ backgroundColor: "#1D9B5E" }} variants={dotVariants} animate="animate" transition={{ delay: index * 0.2 }} />
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        )
    }

    // Overlay Loading
    if (variant === "overlay") {
        return (
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className={`absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-40 rounded-lg ${className}`}>
                <div className="p-8 text-center">
                    <motion.div variants={itemVariants} className="mb-4">
                        <motion.div className={`${sizeClasses[size]} border-4 border-[#1D9B5E] border-t-transparent rounded-full mx-auto`} variants={spinnerVariants} animate="animate" />
                    </motion.div>
                    <motion.p variants={itemVariants} className={`${textSizes[size]} text-slate-600`}>
                        {message}
                    </motion.p>
                </div>
            </motion.div>
        )
    }

    // Inline Loading
    if (variant === "inline") {
        return (
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className={`flex items-center justify-center space-x-3 p-4 ${className}`}>
                <motion.div className={`${sizeClasses[size]} border-4 border-[#1D9B5E] border-t-transparent rounded-full`} variants={spinnerVariants} animate="animate" />
                <motion.span variants={itemVariants} className={`${textSizes[size]} text-slate-600`}>
                    {message}
                </motion.span>
            </motion.div>
        )
    }

    // Minimal Loading
    if (variant === "minimal") {
        return (
            <motion.div className={`flex items-center justify-center ${className}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <motion.div className={`${sizeClasses[size]} border-4 border-[#1D9B5E] border-t-transparent rounded-full`} variants={spinnerVariants} animate="animate" />
            </motion.div>
        )
    }

    return null
}

// Skeleton Loading Component
export function SkeletonLoader({ className = "", lines = 3 }: { className?: string; lines?: number }) {
    return (
        <div className={`animate-pulse space-y-3 ${className}`}>
            {Array.from({ length: lines }).map((_, index) => (
                <div key={index} className="flex space-x-4">
                    <div className="bg-slate-300 rounded-full w-10 h-10"></div>
                    <div className="flex-1 space-y-2 py-1">
                        <div className="bg-slate-300 rounded w-3/4 min-w-64 h-4"></div>
                        <div className="bg-slate-300 rounded w-1/2 min-w-64 h-4"></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

//Skeleton Column Component
export function ColumnLoader() {
    return (
        <div className="flex flex-col space-y-3 my-4 p-4 animate-pulse">
            <div className="bg-slate-300 rounded-2xl w-full h-[250px]"></div>
            <div className="space-y-2">
                <div className="bg-slate-300 rounded-2xl w-[70%] h-4"></div>
                <div className="bg-slate-300 rounded-2xl w-[60%] h-4"></div>
            </div>
        </div>
    )
}


// Dots Loading Component
export function DotsLoader({ size = "md", className = "" }: { size?: "sm" | "md" | "lg"; className?: string }) {
    const dotSizes = {
        sm: "w-1 h-1",
        md: "w-2 h-2",
        lg: "w-3 h-3",
    }

    return (
        <div className={`flex space-x-1 ${className}`}>
            {[0, 1, 2].map((index) => (
                <motion.div
                    key={index}
                    className={`${dotSizes[size]} rounded-full`}
                    style={{ backgroundColor: "#1D9B5E" }}
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: index * 0.2,
                    }}
                />
            ))}
        </div>
    )
}

// Pulse Loading Component
export function PulseLoader({ className = "" }: { className?: string }) {
    return (
        <div className={`flex space-x-2 ${className}`}>
            {[0, 1, 2].map((index) => (
                <motion.div
                    key={index}
                    className="rounded-full w-4 h-4"
                    style={{ backgroundColor: "#1D9B5E" }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                        duration: 0.8,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: index * 0.1,
                    }}
                />
            ))}
        </div>
    )
}
