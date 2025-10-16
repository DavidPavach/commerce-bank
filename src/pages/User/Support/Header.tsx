//Components
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogDescription, DialogHeader } from "@/components/ui/dialog";

//Images
import supportImg from "/support.jpg";

//Icons
import { Information } from "iconsax-react";

const Header = () => {
    return (
        <main className="flex justify-between items-center bg-white p-2 md:p-5 xl:p-6 rounded-2xl text-black">
            <section className="flex items-center gap-x-5">
                <img src={supportImg} alt="/Banking Buddy Image" className="rounded-[50%] size-12 md:size-14 xl:size-16" />
                <div className="flex flex-col">
                    <p className="font-semibold text-sm md:text-base xl:text-lg">Banking Buddy</p>
                    <div className="flex items-center gap-x-1 font-semibold text-green-500">
                        <div className="bg-green-500 rounded-[50%] size-2.5 md:size-3 xl:size-3.5" />
                        <p>Online</p>
                    </div>
                </div>
            </section>
            <Dialog>
                <DialogTrigger asChild>
                    <Information className="size-5 md:size-6 xl:size-7 cursor-pointer" />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <img src={supportImg} alt="/Banking Buddy Image" className="mx-auto rounded-[50%] size-16 md:size-20 xl:size-24" />
                        <DialogTitle className="text-primary">Banking Buddy</DialogTitle>
                        <DialogDescription>Your personalized support assistant! You can chat with it anytime to receive guidance and assistance for any banking issues you encounter.</DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </main >
    );
}

export default Header;