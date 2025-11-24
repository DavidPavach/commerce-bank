import { useState } from "react";
import { useNavigate, } from "react-router-dom";

//Utils
import { handleLogout } from "@/services/logOut";

//Components
import { Button } from "@/components/ui/button";

//Icons
import { LogOutIcon, ArrowLeft } from "lucide-react";

export default function LogoutModal() {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate();

    const logout = async () => {
        setIsLoading(true)
        // Simulate logout process with set timeout
        setTimeout(handleLogout, 5000);
        // Redirect to login or home page
        navigate("/auth");
    }

    return (
        <main className="flex justify-center items-center p-4 h-[80dvh]">
            <div className="w-full max-w-lg">
                <div className="p-4 md:p-6 xl:p-8 border border-neutral-800 rounded-2xl">

                    <div className="flex justify-center mb-6">
                        <div className="flex justify-center items-center bg-red-100 rounded-full size-12 md:size-14 xl:size-16">
                            <LogOutIcon className="size-6 md:size-7 xl:size-8 text-red-600" />
                        </div>
                    </div>

                    <h1 className="mb-2 font-semibold text-foreground text-xl md:text-2xl xl:text-3xl text-center">Ready to leave?</h1>

                    <p className="mb-8 text-neutral-400 text-center">
                        Are you sure you want to log out? You'll need to sign in again to access your account.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3">
                        <Button onClick={logout} disabled={isLoading} className="bg-red-600 hover:bg-red-600/90 w-full text-red-100">
                            {isLoading ? "Logging out..." : "Yes, Log Out"}
                        </Button>
                        <Button onClick={() => window.history.back()} variant="outline" className="bg-transparent hover:bg-primary border border-neutral-700 w-full" disabled={isLoading}>
                            <ArrowLeft className="mr-2 size-4" />
                            Cancel
                        </Button>
                    </div>

                    {/* Footer note */}
                    <p className="mt-6 text-neutral-400 text-xs text-center">
                        Your session will be ended and you'll be redirected to the home page.
                    </p>
                </div>
            </div>
        </main>
    )
}
