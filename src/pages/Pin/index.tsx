import { Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

//Stores and Services
import { useUserStore } from "@/stores/userStore";
import { GetUserDetails } from "@/services/queries.service";

//Component
import Form from "./Form";
import ErrorDisplay from "@/components/Error";

// Images
import setUp from "/set_up.png";
import Logo from "/logo.png";

//Icons
import { Add } from "iconsax-react";

const Index = () => {

    const { user, setUser } = useUserStore();
    const { data, isLoading, isError, refetch } = GetUserDetails();

    useEffect(() => {
        if (!user && data?.data) {
            setUser(data.data);
        }
    }, [data, user, setUser]);

    return (
        <main className="flex justify-center lg:justify-between items-center bg-brand-gradient min-h-dvh overflow-auto">
            <div className="lg:mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-4 w-full lg:w-[40%]">
                <div className="text-center">
                    <motion.div className="inline-flex justify-center items-center bg-white mb-4 p-2 rounded-xl size-16 md:size-[4.5rem] xl:size-[5.5rem]"
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <img src={Logo} alt="CBSH Bank" />
                    </motion.div>
                </div>
                <div className="mt-4 text-neutral-700 text-center">
                    <h1 className="font-light text-xl md:text-2xl xl:text-3xl">Secure Transfer</h1>
                    <p className="text-sm md:text-base xl:text-lg">Create a new Transfer PIN to secure your account and Transfers.</p>
                </div>
                {isLoading && (
                    <div className="bg-neutral-800 mx-auto mt-2 rounded-2xl w-[90%] h-52 animate-pulse"></div>
                )}

                {isError &&
                    <ErrorDisplay onRetry={refetch} isFullPage={false} title="Transfer Pin Failed" message="We couldn't load your Transfer pin page data. Click below to try again." retryLabel="Reload" />
                }
                {user && <Form email={user.email} />}
            </div>
            <div className="hidden lg:block relative p-2 w-[50%] h-dvh">
                <Link to="/" className="group top-8 right-8 z-[2] absolute place-items-center grid bg-white rounded-[50%] size-10">
                    <Add className="text-black group-hover:text-red-600 rotate-45 duration-300" size={30} />
                </Link>
                <img src={setUp} className="rounded-[2rem] w-full h-full object-center object-cover" />
            </div>
        </main>
    );
};

export default Index;
