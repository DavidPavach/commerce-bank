import { Link } from "react-router-dom";

//Component
import Form from "./Form";

// Images
import auth from "/auth.jpg";

//Icons
import { Add } from "iconsax-react";

const Index = () => {
    return (
        <main className="flex justify-center lg:justify-between items-center bg-brand-gradient min-h-dvh overflow-auto">
            <div className="lg:mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-4 w-full lg:w-[45%]">
                <Form />
            </div>
            <div className="hidden lg:block relative p-2 w-[50%] h-dvh">
                <Link to="/" className="group top-8 right-8 z-[2] absolute place-items-center grid bg-white rounded-[50%] size-10">
                    <Add className="text-black group-hover:text-red-600 rotate-45 duration-300" size={30} />
                </Link>
                <img src={auth} className="rounded-[2rem] w-full h-full object-center object-cover" />
            </div>
        </main>
    );
}

export default Index;