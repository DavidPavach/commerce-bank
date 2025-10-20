import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Utils, Stores and Services
import { getAccessToken } from "@/lib/token";
import { useUserStore } from "@/stores/userStore";
import { useSocket } from "@/services/sockets/socket.on";

// Components
import Navbar from "@/components/Navbar";
import BottomNavBar from "@/components/BottomNav";

const UserLayout = ({ children }: { children: React.ReactNode }) => {

    //Hooks
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useUserStore();

    // Socket Connection
    useSocket(user?._id ?? '');

    useEffect(() => {
        const accessToken = getAccessToken();
        const tokensPresent = accessToken !== null && accessToken !== undefined;

        if (!tokensPresent) {
            navigate(`/auth`);
            return;
        }

        if (user?.isSuspended) {
            navigate("/user/suspend");
            return;
        }

        if (user?.kyc?.status !== "accepted" || !user.isFullyVerified) {
            navigate("/pending");
            return;
        }

    }, [navigate, location, user?.isSuspended, user?.kyc?.status, user?.isFullyVerified]);


    return (
        <main className="bg-lightBlack min-h-dvh overflow-y-auto text-neutral-100">
            <Navbar />
            <main className="mb-20 lg:mb-0 px-2 md:px-4 py-4">
                {children}
            </main>
            <BottomNavBar />
        </main>
    );
};

export default UserLayout;
