// Components
import Nav from "@/pages/HomePage/Nav";
import Footer from "@/pages/HomePage/Footer";

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <main className="bg-white min-h-dvh overflow-y-auto text-blueBlack">
            <Nav />
                <div className="px-[1rem] sm:px-12 md:px-[4rem] lg:px-[5rem] 2xl:px-[7rem] xl:px-[6rem] py-4">
                    {children}
                </div>
            <Footer />
        </main>
    );
};

export default HomePageLayout;
