import { useEffect, useState } from "react";
import { toast } from "react-fox-toast";

//Icons
import { Mobile, CloseCircle, InfoCircle } from "iconsax-react";

export default function InstallPrompt() {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [showFallback, setShowFallback] = useState(false);
    const [platform, setPlatform] = useState<"ios" | "android" | "desktop" | null>(null);

    useEffect(() => {
        const dismissed = localStorage.getItem("pwaPromptDismissed");
        if (dismissed === "true") return;

        const ua = window.navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(ua)) setPlatform("ios");
        else if (/android/.test(ua)) setPlatform("android");
        else setPlatform("desktop");

        // Check if browser supports beforeinstallprompt (Chromium)
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

    // No prompt, no fallback → don't render
    if (!isVisible && !showFallback) return null;

    const renderFallbackMessage = () => {
        if (platform === "ios") {
            return (
                <span className="text-[11px] md:text-xs xl:text-sm leading-tight">
                    On iPhone/iPad: Tap <strong>Share</strong> (<span className="text-yellow-300">⬆️</span>) then select{" "}
                    <strong>Add to Home Screen</strong>.
                </span>
            );
        }
        if (platform === "android") {
            return (
                <span className="text-[11px] md:text-xs xl:text-sm leading-tight">
                    On Android: Tap the <strong>menu ⋮</strong> in your browser and choose{" "}
                    <strong>Install App</strong> or <strong>Add to Home Screen</strong>.
                </span>
            );
        }
        return (
            <span className="text-[11px] md:text-xs xl:text-sm leading-tight">
                Use your browser's <strong>Install App</strong> or <strong>Add to Home Screen</strong> option.
            </span>
        );
    };

    return (
        <div className="right-4 bottom-20 z-50 fixed flex items-center gap-2 bg-blue-600 shadow-lg px-4 py-2 rounded-2xl max-w-sm text-[11px] text-white md:text-xs xl:text-sm animate-fade-in">
            {isVisible ? (
                <>
                    <button onClick={handleInstall} className="flex items-center gap-1 hover:bg-blue-700 px-2 py-1 rounded-xl">
                        <Mobile className="size-4 md:size-5 xl:size-6" /> Install App
                    </button>
                    <button onClick={handleDismiss} className="hover:bg-blue-700 p-1 rounded-xl" aria-label="Dismiss">
                        <CloseCircle className="size-4 md:size-5 xl:size-6" />
                    </button>
                </>
            ) : (
                <>
                    <InfoCircle className="size-4 md:size-5 xl:size-6" />
                    {renderFallbackMessage()}
                    <button onClick={handleDismiss} className="hover:bg-blue-700 p-1 rounded-xl" aria-label="Dismiss fallback">
                        <CloseCircle className="size-4 md:size-5 xl:size-6" />
                    </button>
                </>
            )}
        </div>
    );
}
