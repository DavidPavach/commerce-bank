import { useState } from "react";
import { toast } from "react-fox-toast";

//Services
import { useEditAdmin } from "@/services/mutations.service";

//Components
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

//Icons
import { Loader, Save } from "lucide-react";

const Management = ({ admin, onClose }: { admin: Admin, onClose: () => void; }) => {

    const defaultState = {
        adminId: admin._id,
        email: admin.email,
        password: admin.encryptedPassword,
        role: admin.role,
        isSuspended: admin.isSuspended ?? false
    }

    const [formData, setFormData] = useState(defaultState);

    //Functions
    const updateAdmin = useEditAdmin()
    const handleUpdate = () => {

        // Handle form submission
        updateAdmin.mutate(formData, {
            onSuccess: (response) => {
                toast.success(response.data.message || `Admin details was updated successfully!`);
                onClose();
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || `Couldn't update admin details, kindly try again.`;
                toast.error(message);
            }
        })
    }

    return (
        <main className="space-y-6">
            <Badge onClick={onClose} variant="destructive" className="cursor-pointer">Close</Badge>
            <Card className="shadow-sm mx-auto border-neutral-200 max-w-3xl">
                <CardHeader className="font-semibold">Admin Details Details</CardHeader>
                <CardContent className="flex flex-col gap-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="email">New Email</Label>
                        <Input type="email" id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Enter New Email" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">New Password</Label>
                        <Input id="password" type="text" value={formData.password} onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }} placeholder="Enter New Password" />
                    </div>
                    <div className="flex gap-x-5">
                        <label className="flex items-center gap-x-1 accent-accent cursor-pointer">
                            <input type="radio" name="role" value="admin" checked={formData.role === "admin"} onChange={() => { setFormData({ ...formData, role: "admin" }) }} />
                            ADMIN
                        </label>
                        <label className="flex items-center gap-x-1 accent-primary cursor-pointer">
                            <input type="radio" name="role" value="super_admin" checked={formData.role === "super_admin"} onChange={() => { setFormData({ ...formData, role: "super_admin" }) }} />
                            SUPER ADMIN
                        </label>
                        <label className="flex items-center gap-x-1 cursor-pointer">
                            <input type="checkbox"
                                checked={formData.isSuspended}
                                onChange={(e) => setFormData({ ...formData, isSuspended: e.target.checked })} />
                            SUSPENDED
                        </label>
                    </div>
                    <Button onClick={handleUpdate} disabled={updateAdmin.isPending} className="bg-primary hover:bg-primary/90 py-3 text-white">
                        {updateAdmin.isPending ? <Loader className="mr-2 size-5 animate-spin" /> : <Save className="mr-2 size-5" />}
                        {updateAdmin.isPending ? "Updating..." : "Update Admin"}
                    </Button>
                </CardContent>
            </Card>
        </main>
    );
}

export default Management;