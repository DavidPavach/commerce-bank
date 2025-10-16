import { useState } from "react";
import { toast } from "react-fox-toast";

//Services and Utils
import { usePinUpdate, useUpdateUser } from "@/services/mutations.service";
import { suspendUser } from "@/services/sockets/socketService";
import { randomSix } from "@/utils/format";
import { buildPayload } from "@/utils";

//Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

//Icons
import { Save, Eye, EyeClosed, BadgeCheck, BadgeX, CircleCheckBig, CircleX, Loader } from "lucide-react";
import { CardSlash, CardTick1, MoneyRemove, MoneyTick } from "iconsax-react";


export function UserSettings({ user }: { user: User }) {

    const defaultState = {
        fullName: user.fullName,
        password: user.encryptedPassword,
        country: user.country,
        address: user.address,
        phoneNumber: user.phoneNumber,
        accountNumber: user.accountNumber,
        gender: user.gender,
        transferPin: user.transferPin || "",
        freezeCard: user.freezeCard,
        isFullyVerified: user.isFullyVerified,
        transactionSuspended: user.transactionSuspended
    }

    const [formData, setFormData] = useState(defaultState);
    const [updatedFields, setUpdatedFields] = useState<Set<keyof typeof formData>>(new Set());
    const [see, setSee] = useState<boolean>(false);
    const [pinType, setPinType] = useState<"taxPin" | "tacPin" | "insurancePin" | "default">("default");


    //Functions
    const toggleSee = () => setSee((prev) => !prev);

    const handleChange = <K extends keyof typeof formData>(field: K, value: typeof formData[K]) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Add to set of updated fields
        setUpdatedFields(prev => {
            const next = new Set(prev);
            next.add(field);
            return next;
        });
    };

    const resetForm = () => {
        setFormData(defaultState)
    }

    const patchUser = useUpdateUser();
    const handleSubmit = async () => {

        const proceed = confirm(`Update ${user.fullName.toUpperCase()}'s Details?`);
        if (!proceed) return toast.error("Update was cancelled");

        // Build Payload
        const payload = buildPayload(formData, updatedFields);

        // Handle form submission
        patchUser.mutate({ email: user.email, ...payload }, {
            onSuccess: (response) => {
                toast.success(response.data.message || `${user.fullName.toUpperCase()}'s profile was updated successfully!`);
                resetForm();
                setUpdatedFields(new Set());
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || `Couldn't update ${user.fullName}'s profile, kindly try again.`;
                toast.error(message);
                resetForm();
            }
        })
    }

    const pinUpdate = usePinUpdate();
    const handlePinUpdate = () => {

        const proceed = confirm(`Update ${user.fullName.toUpperCase()}'s Pin?`);
        if (!proceed) return toast.error("Pin update was cancelled");

        if (pinType === "default") return toast.error("Kindly select a Pin to continue")

        //Build Payload
        const payload = { email: user.email, [pinType]: randomSix().toString() };

        // Handle form submission
        pinUpdate.mutate(payload, {
            onSuccess: (response) => {
                toast.success(response.data.message || `${user.fullName.toUpperCase()}'s pin was updated successfully!`);
                setPinType("default");
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || `Couldn't update ${user.fullName}'s pin, kindly try again.`;
                toast.error(message);
                setPinType("default");
            }

        })
    }

    const handleSuspension = () => {

        const proceed = confirm(`${user.isSuspended ? "Restore User?" : "Suspend User?"}`);
        if (!proceed) return toast.error("Action was cancelled");

        suspendUser(user._id, user.email, !user.isSuspended, (res) => {
            if (!res.success) {
                toast.error("Failed to suspend user");
            } else {
                toast.success("User was suspended successfully");
                window.location.reload()
            }
        })
    }

    return (
        <Card className="shadow-sm border-neutral-200">
            <CardHeader>
                <CardTitle className="font-medium text-lightBlack text-sm md:text-base xl:text-lg">User Settings</CardTitle>
            </CardHeader>
            <CardContent>
                <section className="space-y-6">

                    <div className="space-y-4">
                        <h3 className="font-medium text-lightBlack text-sm md:text-base xl:text-lg">Password and Transfer Pin Settings</h3>
                        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                            <div className="relative space-y-2">
                                <Label htmlFor="password">New Password</Label>
                                <Input id="password" type={see ? "text" : "password"} value={formData.password} onChange={e => handleChange("password", e.target.value)} placeholder="Enter new password" />
                                {see ? <Eye onClick={toggleSee} className="top-6 md:top-7 xl:top-8 right-2 absolute size-4 md:size-5 xl:size-6 cursor-pointer" /> : <EyeClosed onClick={toggleSee} className="top-6 md:top-7 xl:top-8 right-2 absolute size-4 md:size-5 xl:size-6 cursor-pointer" />}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="transferPin">New Transfer PIN</Label>
                                <Input id="transferPin" type="text" maxLength={6} value={formData.transferPin} onChange={(e) => { const value = e.target.value; if (/^\d{0,10}$/.test(value)) { handleChange("transferPin", value) } }} placeholder="Enter 6 digit Transfer PIN" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-medium text-lightBlack text-sm md:text-base xl:text-lg">Account Settings</h3>
                        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">New Full Name</Label>
                                <Input id="fullName" value={formData.fullName} onChange={e => handleChange("fullName", e.target.value)} placeholder="Enter full name" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="country">New Country</Label>
                                <Input id="country" type="text" value={formData.country} onChange={e => handleChange("country", e.target.value)} placeholder="Enter country" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phoneNumber">New Phone Number</Label>
                                <Input id="phoneNumber" type="tel" value={formData.phoneNumber} onChange={e => handleChange("phoneNumber", e.target.value)} placeholder="Enter Phone Number" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="accountNumber">Account Number</Label>
                                <Input id="accountNumber" type="text" value={formData.accountNumber} onChange={(e) => { const value = e.target.value; if (/^\d{0,10}$/.test(value)) { handleChange("accountNumber", value) } }} placeholder="Enter Account Number" maxLength={10} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="gender">Gender</Label>
                                <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value as "male" | "female" | "prefer not to say")}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a Gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Gender</SelectLabel>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                            <SelectItem value="prefer not to say">Prefer not to Say</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Textarea id="address" value={formData.address} onChange={(e) => handleChange("address", e.target.value)} placeholder="Enter user address" rows={3} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-medium text-lightBlack text-sm md:text-base xl:text-lg">Restrictions Settings</h3>
                        <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                            <div className="space-y-2">
                                <Toggle aria-label="Toggle Card" onPressedChange={(pressed) => setFormData({ ...formData, freezeCard: pressed })} defaultPressed={formData.freezeCard} className="bg-accent text-white">
                                    {formData.freezeCard ? (
                                        <CardTick1 className="size-4 md:size-5 xl:size-6" />
                                    ) : (
                                        <CardSlash className="size-4 md:size-5 xl:size-6" />
                                    )}
                                    {formData.freezeCard ? "Unfreeze" : "Freeze Card"}
                                </Toggle>
                            </div>
                            <div className="space-y-2">
                                <Toggle aria-label="Toggle Transaction" onPressedChange={(pressed) => setFormData({ ...formData, transactionSuspended: pressed })} defaultPressed={formData.transactionSuspended} className={`${user.transactionSuspended ? "bg-green-600" : "bg-red-600"} text-white`}>
                                    {formData.transactionSuspended ? (
                                        <MoneyTick className="size-4 md:size-5 xl:size-6" />
                                    ) : (
                                        <MoneyRemove className="size-4 md:size-5 xl:size-6" />
                                    )}
                                    {formData.transactionSuspended ? "Restore Trans." : "Pause Trans."}
                                </Toggle>
                            </div>
                            <div className="space-y-2">
                                <Toggle aria-label="Toggle Verification" onPressedChange={(pressed) => setFormData({ ...formData, isFullyVerified: pressed })} defaultPressed={formData.isFullyVerified} className="bg-primary text-white">
                                    {formData.isFullyVerified ? (
                                        <BadgeX className="size-4 md:size-5 xl:size-6" />
                                    ) : (
                                        <BadgeCheck className="size-4 md:size-5 xl:size-6" />
                                    )}
                                    {formData.isFullyVerified ? "Invalidate Fully" : "Verify Fully"}
                                </Toggle>
                            </div>
                            <div className="space-y-2" onClick={handleSuspension}>
                                <Toggle aria-label="Toggle Suspension" className="bg-blue-600 text-white">
                                    {user.isSuspended ? (
                                        <CircleCheckBig className="size-4 md:size-5 xl:size-6" />
                                    ) : (
                                        <CircleX className="size-4 md:size-5 xl:size-6" />
                                    )}
                                    {user.isSuspended ? "Unsuspend" : "Suspend"}
                                </Toggle>
                            </div>
                        </div>
                    </div>
                    <div className="pt-6">
                        <Button onClick={handleSubmit} disabled={patchUser.isPending} className="bg-primary hover:bg-primary/90 text-white">
                            {patchUser.isPending ? <Loader className="mr-2 size-5 animate-spin" /> : <Save className="mr-2 size-5" />}
                            {patchUser.isPending ? "Updating..." : "Update Details"}
                        </Button>
                    </div>
                </section>
                <div className="space-y-4 mt-10 py-6 border-neutral-100 border-t">
                    <h3 className="font-medium text-lightBlack text-sm md:text-base xl:text-lg">Transaction Pin Update</h3>
                    <div className="gap-4 grid grid-cols-2 sm:grid-cols-3">
                        <label className="flex items-center gap-x-1 cursor-pointer">
                            <input type="radio" name="pinType" value="taxPin" checked={pinType === "taxPin"} onChange={() => setPinType("taxPin")} />
                            Tax PIN
                        </label>
                        <label className="flex items-center gap-x-1 cursor-pointer">
                            <input type="radio" name="pinType" value="tacPin" checked={pinType === "tacPin"} onChange={() => setPinType("tacPin")} />
                            Tac PIN
                        </label>
                        <label className="flex items-center gap-x-1 cursor-pointer">
                            <input type="radio" name="pinType" value="insurancePin" checked={pinType === "insurancePin"} onChange={() => setPinType("insurancePin")} />
                            Insurance PIN
                        </label>
                    </div>
                    <Button onClick={handlePinUpdate} disabled={pinUpdate.isPending} className="bg-primary hover:bg-primary/90 text-white">
                        {pinUpdate.isPending ? <Loader className="mr-2 size-5 animate-spin" /> : <Save className="mr-2 size-5" />}
                        {pinUpdate.isPending ? "Updating..." : "Update Pin"}
                    </Button>
                </div>
            </CardContent >
        </Card >
    )
}
