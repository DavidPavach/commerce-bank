import { motion } from "framer-motion";

//Components
import { Button } from "@/components/ui/button";

//Icons
import { AlertTriangle, Wifi, Lock, Settings, RefreshCw, ArrowLeft, Search, Server, Clock } from "lucide-react"

interface ErrorScreenProps {
    variant?: "fullscreen" | "overlay" | "inline" | "card"
    type?: "404" | "500" | "network" | "permission" | "maintenance" | "generic" | "timeout"
    size?: "sm" | "md" | "lg"
    title?: string
    message?: string
    showActions?: boolean
    onRetry?: () => void
    onGoBack?: () => void
    className?: string
}

export function ErrorScreen({ variant = "fullscreen", type = "generic", size = "md", title, message, showActions = true, onRetry, onGoBack, className = "" }: ErrorScreenProps) {
    const errorConfig = {
        "404": {
            icon: Search,
            title: title || "Page Not Found",
            message: message || "The page you're looking for doesn't exist or has been moved.",
            color: "#ef4444",
        },
        "500": {
            icon: Server,
            title: title || "Server Error",
            message: message || "We're experiencing technical difficulties. Please try again later.",
            color: "#dc2626",
        },
        network: {
            icon: Wifi,
            title: title || "Connection Error",
            message: message || "Please check your internet connection and try again.",
            color: "#f59e0b",
        },
        permission: {
            icon: Lock,
            title: title || "Access Denied",
            message: message || "You don't have permission to access this resource.",
            color: "#7c3aed",
        },
        maintenance: {
            icon: Settings,
            title: title || "Under Maintenance",
            message: message || "We're performing scheduled maintenance. Please check back soon.",
            color: "#0ea5e9",
        },
        timeout: {
            icon: Clock,
            title: title || "Request Timeout",
            message: message || "The request took too long to complete. Please try again.",
            color: "#f59e0b",
        },
        generic: {
            icon: AlertTriangle,
            title: title || "Something Went Wrong",
            message: message || "An unexpected error occurred. Please try again.",
            color: "#ef4444",
        },
    }

    const config = errorConfig[type]
    const IconComponent = config.icon

    const sizeClasses = {
        sm: {
            icon: "size-12",
            title: "text-lg",
            message: "text-sm",
            button: "text-sm px-4 py-2",
        },
        md: {
            icon: "size-16",
            title: "text-2xl",
            message: "text-base",
            button: "text-base px-6 py-3",
        },
        lg: {
            icon: "size-20",
            title: "text-3xl",
            message: "text-lg",
            button: "text-lg px-8 py-4",
        },
    }

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    }

    const iconVariants = {
        hidden: { scale: 0, rotate: -180 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring" as const,
                stiffness: 200,
                damping: 15,
            },
        },
    }

    const shakeVariants = {
        shake: {
            x: [0, -10, 10, -10, 10, 0],
            transition: { duration: 0.5 },
        },
    }

    const MotionButton = motion.create(Button);

    // Fullscreen Error
    if (variant === "fullscreen") {
        return (
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className={`min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4 ${className}`}>
                <div className="mx-auto max-w-md text-center">
                    <motion.div variants={iconVariants} className="mb-6">
                        <motion.div className={`inline-flex items-center justify-center ${sizeClasses[size].icon} rounded-full p-4 mb-4`} style={{ backgroundColor: `${config.color}15`, color: config.color }} variants={shakeVariants}
                            animate={type === "network" ? "shake" : ""}>
                            <IconComponent className={sizeClasses[size].icon} />
                        </motion.div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mb-8">
                        <h1 className={`${sizeClasses[size].title} font-bold text-slate-900 mb-4`}>{config.title}</h1>
                        <p className={`${sizeClasses[size].message} text-slate-600 leading-relaxed`}>{config.message}</p>
                    </motion.div>

                    {showActions && (
                        <motion.div variants={itemVariants} className="space-y-4">
                            <div className="flex sm:flex-row flex-col justify-center gap-3">
                                {onRetry && (
                                    <MotionButton onClick={onRetry} className={`${sizeClasses[size].button} text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center space-x-2`} style={{ backgroundColor: "#1D9B5E" }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <RefreshCw className="size-4" />
                                        <span>Try Again</span>
                                    </MotionButton>
                                )}

                                {onGoBack && (
                                    <MotionButton onClick={onGoBack} variant="outline" className={`${sizeClasses[size].button} border-slate-300 text-slate-700 font-medium rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 hover:border-[#1D9B5E] hover:text-[#1D9B5E]`} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                    >
                                        <ArrowLeft className="size-4" />
                                        <span>Go Back</span>
                                    </MotionButton>
                                )}
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        )
    }

    // Overlay Error
    if (variant === "overlay") {
        return (
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className={`absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-40 rounded-lg ${className}`}>
                <div className="p-8 max-w-sm text-center">
                    <motion.div variants={iconVariants} className="mb-4">
                        <div className={`inline-flex items-center justify-center ${sizeClasses[size].icon} rounded-full p-3 mb-4`} style={{ backgroundColor: `${config.color}15`, color: config.color }}>
                            <IconComponent className={sizeClasses[size].icon} />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h3 className={`${sizeClasses[size].title} font-semibold text-slate-900 mb-2`}>{config.title}</h3>
                        <p className={`${sizeClasses[size].message} text-slate-600 mb-4`}>{config.message}</p>
                    </motion.div>

                    {showActions && onRetry && (
                        <motion.div variants={itemVariants}>
                            <MotionButton onClick={onRetry} className={`${sizeClasses[size].button} text-white font-medium rounded-lg`} style={{ backgroundColor: "#1D9B5E" }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <RefreshCw className="mr-2 size-4" />
                                Retry
                            </MotionButton>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        )
    }

    // Card Error
    if (variant === "card") {
        return (
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className={`bg-white border mt-4 border-slate-200 rounded-lg shadow-lg p-6 ${className}`}>
                <div className="text-center">
                    <motion.div variants={iconVariants} className="mb-4">
                        <div className={`inline-flex items-center justify-center ${sizeClasses[size].icon} rounded-full p-3`} style={{ backgroundColor: `${config.color}15`, color: config.color }}>
                            <IconComponent className={sizeClasses[size].icon} />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mb-4">
                        <h3 className={`${sizeClasses[size].title} font-semibold text-slate-900 mb-2`}>{config.title}</h3>
                        <p className={`${sizeClasses[size].message} text-slate-600`}>{config.message}</p>
                    </motion.div>

                    {showActions && (
                        <motion.div variants={itemVariants} className="flex justify-center space-x-3">
                            {onRetry && (
                                <MotionButton onClick={onRetry} size="sm" className="text-white" style={{ backgroundColor: "#1D9B5E" }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <RefreshCw className="mr-2 size-4" />
                                    Retry
                                </MotionButton>
                            )}
                            {onGoBack && (
                                <MotionButton onClick={onGoBack} size="sm" variant="outline" className="bg-transparent hover:border-[#1D9B5E] hover:text-[#1D9B5E]" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <ArrowLeft className="mr-2 size-4" />
                                    Back
                                </MotionButton>
                            )}
                        </motion.div>
                    )}
                </div>
            </motion.div>
        )
    }

    // Inline Error
    if (variant === "inline") {
        return (
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className={`flex items-center space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg ${className}`}>
                <motion.div variants={iconVariants}>
                    <IconComponent className="w-5 h-5" style={{ color: config.color }} />
                </motion.div>
                <motion.div variants={itemVariants} className="flex-1">
                    <p className="font-medium text-slate-900 text-sm">{config.title}</p>
                    <p className="text-slate-600 text-xs">{config.message}</p>
                </motion.div>
                {showActions && onRetry && (
                    <motion.div variants={itemVariants}>
                        <MotionButton onClick={onRetry} size="sm" variant="ghost" className="hover:text-[#1D9B5E] text-xs" whileHover={{ scale: 1.05 }}>
                            Retry
                        </MotionButton>
                    </motion.div>
                )}
            </motion.div>
        )
    }

    return null
}

// Quick Error Components
export function NotFoundError({ onGoHome }: { onGoHome?: () => void }) {
    return (
        <ErrorScreen type="404" onRetry={onGoHome} onGoBack={() => window.history.back()} />
    )
}

export function ServerError({ onRetry }: { onRetry?: () => void }) {
    return <ErrorScreen type="500" onRetry={onRetry} />
}

export function NetworkError({ onRetry }: { onRetry?: () => void }) {
    return <ErrorScreen type="network" onRetry={onRetry} onGoBack={() => window.history.back()} />
}

export function MaintenanceError() {
    return (
        <ErrorScreen type="maintenance" showActions={false} message="We're performing scheduled maintenance to improve your banking experience. Please check back in a few minutes." />
    )
}
