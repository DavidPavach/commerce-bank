import { useState } from "react";
import { toast } from "react-fox-toast";

//Services
import { useCreateAccount } from "@/services/mutations.service";

//Components
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, Save } from "lucide-react";


const Form = ({ onClose }: { onClose: () => void; }) => {

    const defaultState = {
        fullName: "",
        accountNumber: "",
        bankName: "",
    }

    const [formData, setFormData] = useState(defaultState);

    //Functions
    const createAccount = useCreateAccount();
    const createNewAccount = () => {

        // Handle form submission
        createAccount.mutate(formData, {
            onSuccess: (response) => {
                toast.success(response.data.message || `${formData.fullName} was created successfully!`);
                onClose();
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || `Couldn't create ${formData.fullName} account details, kindly try again.`;
                toast.error(message);
            }
        })
    }

    return (
        <main>
            <Badge onClick={onClose} variant="destructive" className="cursor-pointer">Close</Badge>
            <Card className="shadow-sm mx-auto mt-10 border-neutral-200 max-w-4xl">
                <CardHeader className="bg-neutral-100/50 mb-4 border-neutral-200 border-b font-semibold text-base md:text-lg xl:text-xl">
                    Add a New Account
                </CardHeader>
                <CardContent className="flex flex-col gap-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">New Full Name</Label>
                        <Input id="fullName" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} placeholder="Enter full name" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input id="accountNumber" type="text" value={formData.accountNumber} onChange={(e) => { const value = e.target.value; if (/^\d{0,10}$/.test(value)) { setFormData({ ...formData, accountNumber: value }) } }} placeholder="Enter Account Number" maxLength={10} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="bankName">Bank Name</Label>
                        <Input id="bankName" type="text" value={formData.bankName} onChange={(e) => setFormData({ ...formData, bankName: e.target.value })} placeholder="Enter Bank Name" />
                    </div>
                    <Button onClick={createNewAccount} disabled={createAccount.isPending} className="bg-primary hover:bg-primary/90 py-3 text-white">
                        {createAccount.isPending ? <Loader className="mr-1 size-5 animate-spin" /> : <Save className="mr-1 size-5" />}
                        {createAccount.isPending ? "Creating..." : "Create Account"}
                    </Button>
                </CardContent>
            </Card>
        </main>
    );
}

export default Form;