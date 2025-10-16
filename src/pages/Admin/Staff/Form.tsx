import { useState } from "react";
import { toast } from "react-fox-toast";

//Services
import { useCreateAdmin } from "@/services/mutations.service";

//Components
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, Save } from "lucide-react";


const Form = ({ onClose }: { onClose: () => void; }) => {

    const defaultState = {
        email: "",
        password: "",
        role: "" as "admin" | "super_admin",
    }

    const [formData, setFormData] = useState(defaultState);

    //Functions
    const createAccount = useCreateAdmin();
    const createNewAccount = () => {

        // Handle form submission
        createAccount.mutate(formData, {
            onSuccess: (response) => {
                toast.success(response.data.message || `Admin was created successfully!`);
                onClose();
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || `Couldn't create new admin account, kindly try again.`;
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
                        <Label htmlFor="email">New Full Name</Label>
                        <Input type="email" id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Enter Email Address" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Account Number</Label>
                        <Input id="password" type="text" value={formData.password} onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }} placeholder="Enter Password" />
                    </div>
                    <div className="flex gap-x-5">
                        <label className="flex items-center gap-x-1 accent-accent cursor-pointer">
                            <input type="radio" name="role" value="admin" checked={formData.role === "admin"} onChange={() => { setFormData({ ...formData, role: "admin" }) }} />
                            ADMIN
                        </label>
                        <label className="flex items-center gap-x-1 accent-primary cursor-pointer">
                            <input type="radio" name="roles" value="super_admin" checked={formData.role === "super_admin"} onChange={() => { setFormData({ ...formData, role: "super_admin" }) }} />
                            SUPER ADMIN
                        </label>
                    </div>
                    <Button onClick={createNewAccount} disabled={createAccount.isPending} className="bg-primary hover:bg-primary/90 py-3 text-white">
                        {createAccount.isPending ? <Loader className="mr-1 size-5 animate-spin" /> : <Save className="mr-1 size-5" />}
                        {createAccount.isPending ? "Creating..." : "Create Admin"}
                    </Button>
                </CardContent>
            </Card>
        </main>
    );
}

export default Form;