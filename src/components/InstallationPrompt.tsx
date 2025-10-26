import { useEffect, useState } from "react";
import { toast } from "react-fox-toast";

//ICons
import { Mobile, CloseCircle, InfoCircle } from "iconsax-react";

export default function InstallPrompt() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [showFallback, setShowFallback] = useState(false);

    useEffect(() => {
        const dismissed = localStorage.getItem("pwaPromptDismissed");
        if (dismissed === "true") return;

        // Detect if install prompt API exists (Chromium only)
        if (!("BeforeInstallPromptEvent" in window)) {
            setShowFallback(true);
            return;
        }

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
        if (choice.outcome === "accepted") toast.success("✅ Installation started");
        else toast.error("❌ Installation cancelled");
        setDeferredPrompt(null);
        setIsVisible(false);
    };

    const handleDismiss = () => {
        setIsVisible(false);
        setShowFallback(false);
        localStorage.setItem("pwaPromptDismissed", "true");
    };

    if (!isVisible && !showFallback) return null;

    return (
        <div className="right-4 bottom-4 z-50 fixed flex items-center gap-2 bg-blue-600 shadow-lg px-4 py-2 rounded-2xl max-w-xs text-white animate-fade-in">
            {isVisible ? (
                <>
                    <button onClick={handleInstall} className="flex items-center gap-1 hover:bg-blue-700 px-2 py-1 rounded-xl">
                        <Mobile className="size-5" /> Install App
                    </button>
                    <button onClick={handleDismiss} className="hover:bg-blue-700 p-1 rounded-xl" aria-label="Dismiss">
                        <CloseCircle className="size-5" />
                    </button>
                </>
            ) : (
                <>
                    <InfoCircle className="size-5" />
                    <span className="text-sm">
                        Add this app to your home screen via your browser menu.
                    </span>
                    <button onClick={handleDismiss} className="hover:bg-blue-700 p-1 rounded-xl" aria-label="Dismiss fallback">
                        <CloseCircle className="size-5" />
                    </button>
                </>
            )}
        </div>
    );
}
