import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//Icons
import { Home, ArrowLeft, RefreshCw, HelpCircle } from "lucide-react";

export default function NotFound() {

  const navigate = useNavigate()

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }


  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-br from-green-200 via-yellow-200 to-green-300 p-4 min-h-dvh">
      <div className="w-full">
        <motion.div className="text-center" initial="hidden" animate="visible" variants={containerVariants}>

          <motion.div className="relative mb-8" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, type: "spring" }}>
            <div className="opacity-20 font-bold text-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl select-none">404</div>
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="flex justify-center items-center bg-gradient-to-br from-primary to-yellow-800 shadow-2xl rounded-full w-24 h-24 animate-pulse">
                <HelpCircle size={48} className="text-white" />
              </div>
            </div>
          </motion.div>

          <motion.h1 className="mb-4 font-bold text-black text-2xl md:text-3xl xl:text-4xl" variants={itemVariants}>
            Page Not Found
          </motion.h1>

          <motion.p className="mx-auto mb-8 max-w-md text-gray-700" variants={itemVariants}>
            The page you're looking for doesn't exist or has been moved. Please check the URL or navigate back to the
            homepage.
          </motion.p>

          <motion.div className="flex sm:flex-row flex-col justify-center items-center gap-4 mb-8" variants={itemVariants}>
            <Link to="/" className="flex justify-center items-center gap-2 bg-black/10 hover:bg-black/20 px-6 py-3 rounded-lg w-full sm:w-auto font-semibold text-black transition-colors">
              <Home size={18} />
              <span>Back to Home</span>
            </Link>

            <button onClick={() => navigate(-1)} className="flex justify-center items-center gap-2 bg-black/5 hover:bg-black/10 px-6 py-3 rounded-lg w-full sm:w-auto font-semibold text-black transition-colors">
              <ArrowLeft size={18} />
              <span>Go Back</span>
            </button>

            <button onClick={() => window.location.reload()} className="flex justify-center items-center gap-2 bg-black/5 hover:bg-black/10 px-6 py-3 rounded-lg w-full sm:w-auto font-semibold text-black transition-colors">
              <RefreshCw size={18} />
              <span>Refresh</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
