import { useState } from "react";

//Components
import SavingsForm from "./SavingsForm";

//Icons
import { CirclePlus } from "lucide-react";

const Header = () => {

    const [newSavings, setNewSavings] = useState<boolean>(false);

    //Functions
    const toggleNew = () => setNewSavings((prev) => !prev);

    return (
        <>
            {newSavings && <SavingsForm onClose={toggleNew} />}
            <header className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-y-3">
                <div>
                    <h1 className="font-bold text-xl sm:text-2xl md:text-3xl xl:text-4xl">Savings Goals</h1>
                    <p className="text-neutral-400">Build your financial future with high-yield savings</p>
                </div>
                <button className="flex items-center gap-x-1 bg-goldenYellow hover:bg-accent px-8 md:px-10 py-3 rounded-2xl font-medium text-black hover:text-white duration-300" onClick={toggleNew}>
                    <CirclePlus className="size-4 md:size-5 xl:size-6" />Create New Goal
                </button>
            </header>
        </>
    );
}

export default Header;