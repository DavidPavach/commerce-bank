import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//Icons
import { Shield, ArrowLeft, Lock } from "lucide-react";
import { Home2 } from "iconsax-react";


export default function Unauthorised() {

    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate(-1)
    }

    return (
        <div className="flex flex-col justify-center items-center p-4 h-[80vh]">
            <div className="w-full max-w-xl">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-[#fdfbfb] shadow-xl rounded-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-center">
                        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex justify-center items-center bg-white/20 mx-auto mb-4 rounded-full size-14">
                            <Shield size={24} className="text-white" />
                        </motion.div>
                        <h1 className="mb-2 font-bold text-white text-lg md:text-xl xl:text-2xl">Access Denied</h1>
                        <div className="flex justify-center items-center gap-2 text-red-100">
                            <Lock size={16} />
                            <span>Error 403 - Forbidden</span>
                        </div>
                    </div>

                    <div className="p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="mb-6 text-center">
                            <p className="text-slate-600 leading-relaxed">You don't have permission to access this resource. Please contact your super administrator if you think this was a mistake.</p>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="space-y-3">
                            <div className="flex gap-3">
                                    <Link to="/admin/transactions" className="flex flex-1 justify-center items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-3 rounded-lg font-medium text-slate-700 transition-colors">
                                        <Home2 size={18} />
                                        <span>Transactions</span>
                                    </Link>

                                    <button onClick={handleGoBack} className="flex flex-1 justify-center items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-3 rounded-lg font-medium text-slate-700 transition-colors">
                                        <ArrowLeft size={18} />
                                        <span>Go Back</span>
                                    </button>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
