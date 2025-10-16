import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

//Components
import VerifyEmail from "./VerifyEmail";
import ResetPassword from "./ResetPassword";
import SendEmail from "./SendEmail";

//Images
import Logo from "/logo.png";
import passwordResetImg from "/reset_password.png";

//Icons
import { Add } from "iconsax-react";

const Index = () => {

    const [searchParams] = useSearchParams();
    const page = searchParams.get("page");


    return (
        <main className="flex justify-center lg:justify-between items-center bg-brand-gradient min-h-dvh overflow-auto">
            <div className="lg:mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-4 w-full lg:w-[40%]">
                <div className="text-center">
                    <motion.div className="inline-flex justify-center items-center bg-white mb-4 p-2 rounded-xl size-16 md:size-[4.5rem] xl:size-[5.5rem]"
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <img src={Logo} alt="CBSH Bank" />
                    </motion.div>
                </div>
                <div className="text-neutral-700 text-center">
                    <h1 className="font-semibold text-xl md:text-2xl xl:text-3xl">Reset Your Password</h1>
                    <p className="text-sm md:text-base xl:text-lg">Please follow through the process to reset your password.</p>
                </div>
                {page === "verify" ? <VerifyEmail /> : page === "reset" ? <ResetPassword /> : <SendEmail />}
            </div>
            <div className="hidden lg:block relative p-2 w-[50%] h-dvh">
                <Link to="/" className="group top-8 right-8 z-[2] absolute place-items-center grid bg-white rounded-[50%] size-10">
                    <Add className="text-black group-hover:text-red-600 rotate-45 duration-300" size={30} />
                </Link>
                <img src={passwordResetImg} className="rounded-[2rem] w-full h-full object-center object-cover" />
            </div>
        </main>
    );
}

export default Index;