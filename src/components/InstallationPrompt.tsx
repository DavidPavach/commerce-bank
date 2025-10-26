import { useEffect, useState } from "react";
import { toast } from "react-fox-toast";

//Icons
import { Mobile, CloseCircle } from "iconsax-react";

export default function InstallPrompt() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const dismissed = localStorage.getItem("pwaPromptDismissed");
        if (dismissed === "true") return;

        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setIsVisible(true);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === "accepted") {
            toast.success("✅ Installation has started...");
        } else {
            toast.error("❌ Installation was cancelled.");
        }
        setDeferredPrompt(null);
        setIsVisible(false);
    };

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem("pwaPromptDismissed", "true");
    };

    if (!isVisible) return null;

    return (
        <div className="right-4 bottom-4 z-50 fixed flex items-center gap-2 bg-blue-600 shadow-lg px-4 py-2 rounded-2xl text-white animate-fade-in">
            <button onClick={handleInstall} className="flex items-center gap-1 hover:bg-blue-700 px-2 py-1 rounded-xl">
                <Mobile className="size-5" /> Install App
            </button>
            <button onClick={handleDismiss} className="hover:bg-blue-700 p-1 rounded-xl" aria-label="Dismiss install prompt">
                <CloseCircle className="size-5" />
            </button>
        </div>
    );
}
