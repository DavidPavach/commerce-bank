import type React from "react";
import { toast } from "react-fox-toast";
import { useState } from "react";

//Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

//Icons
import { Lock } from "lucide-react";

//Constants
const CORRECT_PASSWORD = import.meta.env.VITE_PIN

export default function Pin({ authorize }: { authorize: () => void; }) {

    const [password, setPassword] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate a brief loading state for better UX
        await new Promise((resolve) => setTimeout(resolve, 500))

        if (password === CORRECT_PASSWORD) {
            toast.success("Access granted! Welcome back.")
            setPassword("")
            authorize()
        } else {
            toast.error("Incorrect password. Please try again.")
            setPassword("")
        }

        setIsLoading(false)
    }

    return (
        <div className="flex justify-center items-center bg-gradient-to-br from-muted/30 to-background p-4">
            <Card className="shadow-lg mt-20 w-full max-w-md">
                <CardHeader className="space-y-3 text-center">
                    <div className="flex justify-center items-center bg-primary/10 mx-auto rounded-full size-12">
                        <Lock className="size-6 text-primary" />
                    </div>
                    <CardTitle className="font-bold text-lg md:text-xl xl:text-2xl">Secure Access</CardTitle>
                    <CardDescription className="text-pretty">Enter your PIN to continue</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="pin">Pin</Label>
                            <Input id="pin" type="text" placeholder="Enter Pin" value={password} onChange={(e) => { const digits = e.target.value.replace(/\D/g, '').slice(0, 6); setPassword(digits); }} required className="h-9 md:h-10 xl:h-11" maxLength={6} pattern="\d{6}$" inputMode="numeric" autoFocus />
                        </div>
                        <Button type="submit" className="w-full h-9 md:h-10 xl:h-11 text-white" disabled={isLoading || !password}>
                            {isLoading ? "Verifying..." : "Continue"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
