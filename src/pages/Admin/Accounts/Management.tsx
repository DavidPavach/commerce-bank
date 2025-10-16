import { useState } from "react";
import { toast } from "react-fox-toast";

//Services
import { useUpdateAccount } from "@/services/mutations.service";

//Components
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

//Icons
import { Loader, Save } from "lucide-react";

const Management = ({ account, onClose }: { account: AccountDetails, onClose: () => void; }) => {

    const defaultState = {
        accountId: account._id,
        fullName: account.fullName,
        accountNumber: account.accountNumber,
        bankName: account.bankName,
    }

    const [formData, setFormData] = useState(defaultState);

    const patchAccount = useUpdateAccount();
    const handleSubmit = () => {

        // Handle form submission
        patchAccount.mutate(formData, {
            onSuccess: (response) => {
                toast.success(response.data.message || `${account.fullName} account details was updated successfully!`);
                onClose();
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || `Couldn't update ${account.fullName} account details, kindly try again.`;
                toast.error(message);
            }
        })
    }


    return (
        <main className="space-y-6">
            <Badge onClick={onClose} variant="destructive" className="cursor-pointer">Close</Badge>
            <Card className="shadow-sm mx-auto border-neutral-200 max-w-3xl">
                <CardHeader className="font-semibold">{account.fullName} Details</CardHeader>
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
                    <Button onClick={handleSubmit} disabled={patchAccount.isPending} className="bg-primary hover:bg-primary/90 py-3 text-white">
                        {patchAccount.isPending ? <Loader className="mr-2 size-5 animate-spin" /> : <Save className="mr-2 size-4" />}
                        {patchAccount.isPending ? "Updating..." : "Update Details"}
                    </Button>
                </CardContent>
            </Card>
        </main>
    );
}

export default Management;