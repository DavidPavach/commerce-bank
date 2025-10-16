import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-fox-toast";

//Utils and Hooks
import { formatDate } from "@/utils/format";
import { useUpdateProfilePicture, useUpdateUserProfile } from "@/services/mutations.service";

//Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

//Icons
import { UserIcon, Mail, Phone, MapPin, Globe, Shield, Edit3, Camera, Eye, EyeOff, Check, X, AlertTriangle, Clock, Save, Lock, Unlock, CreditCard, Loader } from "lucide-react";

const Profile = ({ user }: { user: User }) => {

    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [editingField, setEditingField] = useState<string | null>(null);
    const [showTransferPin, setShowTransferPin] = useState<boolean>(false)

    //Form States
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [address, setAddress] = useState(user.address);
    const [oldPin, setOldPin] = useState<string>("");
    const [newPin, setNewPin] = useState<string>("");
    const [confirmPin, setConfirmPin] = useState<string>("");

    const getVerificationStatus = () => {
        if (user.isFullyVerified) {
            return (
                <Badge className="flex items-center space-x-1 bg-green-100 hover:bg-green-100 text-green-800">
                    <Shield className="size-3" />
                    <span>Fully Verified</span>
                </Badge>
            )
        } else if (user.isVerified) {
            return (
                <Badge className="flex items-center space-x-1 bg-yellow-100 hover:bg-yellow-100 text-yellow-800">
                    <Shield className="size-3" />
                    <span>Partially Verified</span>
                </Badge>
            )
        } else {
            return (
                <Badge className="flex items-center space-x-1 bg-red-100 hover:bg-red-100 text-red-800">
                    <AlertTriangle className="size-3" />
                    <span>Unverified</span>
                </Badge>
            )
        }
    }

    const getKYCStatusBadge = () => {
        if (!user.kyc) {
            return <Badge className="bg-gray-100 hover:bg-gray-100 text-gray-800">Not Submitted</Badge>
        }

        switch (user.kyc.status) {
            case "accepted":
                return (
                    <Badge className="flex items-center space-x-1 bg-green-100 hover:bg-green-100 text-green-800">
                        <Check className="size-3" />
                        <span>Verified</span>
                    </Badge>
                )
            case "pending":
                return (
                    <Badge className="flex items-center space-x-1 bg-yellow-100 hover:bg-yellow-100 text-yellow-800">
                        <Clock className="size-3" />
                        <span>Under Review</span>
                    </Badge>
                )
            case "rejected":
                return (
                    <Badge className="flex items-center space-x-1 bg-red-100 hover:bg-red-100 text-red-800">
                        <X className="size-3" />
                        <span>Rejected</span>
                    </Badge>
                )
            default:
                return <Badge variant="secondary">Unknown</Badge>
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    }

    //Functions
    const updateProfilePicture = useUpdateProfilePicture();
    const handleProfilePictureUpdate = () => {
        if (!profilePicture) return toast.error("Kindly Select a New Profile Picture")

        const formData = new FormData();
        formData.append("profilePicture", profilePicture)

        toast("Updating Profile Picture...", { isCloseBtn: true });
        updateProfilePicture.mutate(formData, {
            onSuccess: () => {
                toast.success(`Successful 🎉, Your profile picture was updated successfully.`);
                setProfilePicture(null)
                setEditingField(null)
            },
            onError: () => {
                toast.error(`Failed to update profile picture, please try again later.`);
                setProfilePicture(null)
            },
        })

    }

    const updateProfile = useUpdateUserProfile();
    const handleProfileUpdate = () => {

        if (!newPin && !phoneNumber && !address) return toast.error("Kindly update a field to proceed.")

        const payload: { email: string, transferPin?: string, address?: string, phoneNumber?: string } = { email: user.email };
        if (newPin) payload.transferPin = newPin;
        if (address) payload.address = address;
        if (phoneNumber) payload.phoneNumber = phoneNumber;

        updateProfile.mutate(payload, {
            onSuccess: () => {
                toast.success(`Successful 🎉, Your profile details was updated successfully.`);
                setEditingField(null)
            },
            onError: () => {
                toast.error(`Failed to update profile details, please try again later.`);
            },
        })
    }

    return (
        <main className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6 min-h-dvh text-lightBlack">
            <section className="mx-auto max-w-4xl">
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                    <motion.div variants={itemVariants} className="mb-8 text-center">
                        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl">User Profile</h1>
                        <p className="text-slate-600">Manage your CBSH Bank account information</p>
                    </motion.div>
                    <motion.div variants={itemVariants} className="mb-8">
                        <Card className="bg-white/90 shadow-xl backdrop-blur-sm border-0">
                            <CardHeader className="pb-4 text-center">
                                <div className="inline-block relative mb-4">
                                    <div className="flex justify-center items-center bg-gradient-to-br from-[#1D9B5E] to-[#16a085] mx-auto rounded-full size-16 md:size-20 xl:size-24 font-bold text-white text-2xl md:text-3xl xl:text-4xl">
                                        {user.profilePicture ? (
                                            <img src={user.profilePicture} alt="Profile" className="rounded-full size-16 md:size-20 xl:size-24 object-cover" />
                                        ) : (
                                            user.fullName.charAt(0).toUpperCase()
                                        )}
                                    </div>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button size="sm" className="-right-2 -bottom-2 absolute p-1 rounded-full size-6 md:size-7 xl:size-8 text-white" style={{ backgroundColor: "#1D9B5E" }}>
                                                <Camera className="size-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Update Profile Picture</DialogTitle>
                                                <DialogDescription>Choose a new profile picture for your account.</DialogDescription>
                                            </DialogHeader>
                                            <div className="space-y-4">
                                                <div>
                                                    <Label htmlFor="profile-picture">Profile Picture</Label>
                                                    <Input id="profile-picture" type="file" accept="image/*" onChange={(e) => setProfilePicture(e.target.files?.[0] || null)} className="mt-1" />
                                                </div>
                                                <Button onClick={handleProfilePictureUpdate} disabled={!profilePicture || updateProfilePicture.isPending} className="w-full text-white" style={{ backgroundColor: "#1D9B5E" }}>
                                                    <Save className="mr-2 size-4" />
                                                    Update Picture
                                                </Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                <CardTitle className="mb-2 font-bold text-slate-900 text-lg md:text-xl xl:text-2xl">{user.fullName}</CardTitle>
                                <div className="flex justify-center items-center space-x-4">
                                    {getVerificationStatus()}
                                    <div className="flex items-center space-x-1">
                                        <div className={`w-2 h-2 rounded-full ${user.isOnline ? "bg-green-500" : "bg-gray-400"}`} />
                                        <span className="text-slate-600 text-sm">{user.isOnline ? "Online" : "Offline"}</span>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    </motion.div>

                    <section className="gap-5 grid lg:grid-cols-2">
                        {/* Personal Information */}
                        <motion.div variants={itemVariants}>
                            <Card className="bg-white/90 shadow-lg backdrop-blur-sm border-0">
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <UserIcon className="size-5 text-[#1D9B5E]" />
                                        <span>Personal Information</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Email (Read-only) */}
                                    <div className="space-y-2">
                                        <Label className="flex items-center space-x-2">
                                            <Mail className="size-4 text-slate-500" />
                                            <span>Email Address</span>
                                        </Label>
                                        <Input value={user.email} disabled className="bg-slate-50" />
                                        <p className="text-slate-500 text-xs">Email cannot be changed for security reasons</p>
                                    </div>

                                    {/* Phone Number (Editable) */}
                                    <div className="space-y-2">
                                        <Label className="flex items-center space-x-2">
                                            <Phone className="size-4 text-slate-500" />
                                            <span>Phone Number</span>
                                        </Label>
                                        <div className="flex space-x-2">
                                            <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} disabled={editingField !== "phone"} className={editingField === "phone" ? "h-fit" : "bg-slate-50"} />
                                            {editingField === "phone" ? (
                                                <div className="flex sm:flex-row flex-col gap-2">
                                                    <Button size="sm" onClick={handleProfileUpdate} disabled={updateProfile.isPending} className="text-white" style={{ backgroundColor: "#1D9B5E" }}>
                                                        {updateProfile.isPending ? <Loader className="size-4 animate-spin" /> : <Save className="size-4" />}
                                                    </Button>
                                                    <Button size="sm" variant="outline" onClick={() => setEditingField(null)}>
                                                        <X className="size-4" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <Button size="sm" variant="outline" onClick={() => setEditingField("phone")}>
                                                    <Edit3 className="size-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Country (Read-only) */}
                                    <div className="space-y-2">
                                        <Label className="flex items-center space-x-2">
                                            <Globe className="size-4 text-slate-500" />
                                            <span>Country</span>
                                        </Label>
                                        <Input value={user.country} disabled className="bg-slate-50" />
                                    </div>

                                    {/* Address */}
                                    <div className="space-y-2">
                                        <Label className="flex items-center space-x-2">
                                            <MapPin className="size-4 text-slate-500" />
                                            <span>Address</span>
                                        </Label>
                                        <div className="flex space-x-2">
                                            <Textarea value={address} onChange={(e) => setAddress(e.target.value)} disabled={editingField !== "address"} className={editingField === "address" ? "" : "bg-slate-50"} rows={3} />
                                            {editingField === "address" ? (
                                                <div className="flex sm:flex-row flex-col gap-2">
                                                    <Button size="sm" onClick={handleProfileUpdate} disabled={updateProfile.isPending} className="text-white" style={{ backgroundColor: "#1D9B5E" }}>
                                                        {updateProfile.isPending ? <Loader className="size-4 animate-spin" /> : <Save className="size-4" />}
                                                    </Button>
                                                    <Button size="sm" variant="outline" onClick={() => setEditingField(null)}>
                                                        <X className="size-4" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <Button size="sm" variant="outline" onClick={() => setEditingField("address")}>
                                                    <Edit3 className="size-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Gender (Read-only) */}
                                    <div className="space-y-2">
                                        <Label>Gender</Label>
                                        <Input value={user.gender} disabled className="bg-slate-50 capitalize" />
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Account & Security */}
                        <motion.div variants={itemVariants} className="space-y-6">
                            {/* Account Information */}
                            <Card className="bg-white/90 shadow-lg backdrop-blur-sm border-0">
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <CreditCard className="size-5 text-[#1D9B5E]" />
                                        <span>Account Information</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 text-[11px] md:text-xs xl:text-sm">
                                    <div className="gap-4 grid grid-cols-2">
                                        <div>
                                            <Label className="text-slate-600">Account ID</Label>
                                            <p className="font-mono font-medium">{user.accountId}</p>
                                        </div>
                                        <div>
                                            <Label className="text-slate-600">Account Number</Label>
                                            <p className="font-mono font-medium">****{user.accountNumber.slice(-4)}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <Label className="text-slate-600">Member Since</Label>
                                        <p className="font-medium">{formatDate(user.createdAt)}</p>
                                    </div>
                                    {user.lastSession && (
                                        <div>
                                            <Label className="text-slate-600">Last Session</Label>
                                            <p className="font-medium">{formatDate(user.lastSession)}</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Security Settings */}
                            <Card className="bg-white/90 shadow-lg backdrop-blur-sm border-0">
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <Shield className="size-5 text-[#1D9B5E]" />
                                        <span>Security Settings</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Transfer PIN */}
                                    <div className="space-y-2">
                                        <Label>Transfer PIN</Label>
                                        <div className="flex space-x-2">
                                            <Input type={showTransferPin ? "text" : "password"} value={user.transferPin ? user.transferPin : "Not Set"} disabled className="bg-slate-50" />
                                            <Button size="sm" variant="outline" onClick={() => setShowTransferPin(!showTransferPin)}>
                                                {showTransferPin ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                            </Button>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button size="sm" variant="outline">
                                                        <Edit3 className="size-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Change Transfer PIN</DialogTitle>
                                                        <DialogDescription>
                                                            Enter your current PIN and choose a new 4-digit PIN for transfers.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <Label htmlFor="old-pin">Current PIN</Label>
                                                            <Input id="old-pin" type="password" maxLength={6} value={oldPin} onChange={(e) => setOldPin(e.target.value)} className="mt-1" />
                                                        </div>
                                                        <div>
                                                            <Label htmlFor="new-pin">New PIN</Label>
                                                            <Input id="new-pin" type="password" maxLength={6} value={newPin} onChange={(e) => setNewPin(e.target.value)} className="mt-1" />
                                                        </div>
                                                        <div>
                                                            <Label htmlFor="confirm-pin">Confirm New PIN</Label>
                                                            <Input id="confirm-pin" type="password" maxLength={6} value={confirmPin} onChange={(e) => setConfirmPin(e.target.value)} className="mt-1" />
                                                        </div>
                                                        <Button onClick={handleProfileUpdate} disabled={updateProfile.isPending || !oldPin || !newPin || newPin !== confirmPin} className="w-full text-white" style={{ backgroundColor: "#1D9B5E" }}>
                                                            {updateProfile.isPending ? (
                                                                <>
                                                                    <div className="mr-2 border-2 border-white border-t-transparent rounded-full size-4 animate-spin" />
                                                                    Updating...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Lock className="mr-2 size-4" />
                                                                    Update PIN
                                                                </>
                                                            )}
                                                        </Button>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </div>

                                    {/* Account Status */}
                                    <div className="space-y-2">
                                        <Label>Account Status</Label>
                                        <div className="flex items-center space-x-2">
                                            {user.isSuspended ? (
                                                <Badge className="flex items-center space-x-1 bg-red-100 hover:bg-red-100 text-red-800">
                                                    <Lock className="size-3" />
                                                    <span>Suspended</span>
                                                </Badge>
                                            ) : (
                                                <Badge className="flex items-center space-x-1 bg-green-100 hover:bg-green-100 text-green-800">
                                                    <Unlock className="size-3" />
                                                    <span>Active</span>
                                                </Badge>
                                            )}
                                        </div>
                                        {user.isSuspended && user.suspendedDate && (
                                            <p className="text-red-600 text-xs">Suspended on {formatDate(user.suspendedDate)}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </section>

                    {/* KYC Section */}
                    <motion.div variants={itemVariants} className="mt-8">
                        <Card className="bg-white/90 shadow-lg backdrop-blur-sm border-0">
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center">
                                    <div className="flex items-center space-x-2">
                                        <Shield className="size-5 text-[#1D9B5E]" />
                                        <span>Know Your Customer (KYC)</span>
                                    </div>
                                    {getKYCStatusBadge()}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="gap-4 grid md:grid-cols-2">
                                        <div>
                                            <Label className="text-slate-600 text-sm">ID Type</Label>
                                            <p className="font-medium capitalize">{user && user.kyc && user.kyc.idType.replace("_", " ")}</p>
                                        </div>
                                        <div>
                                            <Label className="text-slate-600 text-sm">Submission Date</Label>
                                            <p className="font-medium">{user && user.kyc && formatDate(user.kyc.lastSubmissionDate)}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <Label className="text-slate-600 text-sm">Documents</Label>
                                        <p className="font-medium">{user && user.kyc && user.kyc.images.length} document(s) uploaded</p>
                                    </div>
                                </div>
                                {user && user.kyc && user.kyc.status === "pending" && (
                                    <div className="bg-yellow-50 mt-4 p-4 border border-yellow-200 rounded-lg">
                                        <div className="flex items-start space-x-3">
                                            <Clock className="mt-0.5 size-5 text-yellow-600" />
                                            <div>
                                                <h4 className="font-semibold text-yellow-800">Under Review</h4>
                                                <p className="mt-1 text-[11px] text-yellow-700 md:text-xs xl:text-sm">
                                                    Your KYC documents are currently being reviewed. This process typically takes 1-3 business
                                                    days.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {user && user.kyc && user.kyc.status === "accepted" && (
                                    <div className="bg-green-50 mt-4 p-4 border border-green-200 rounded-lg">
                                        <div className="flex items-start space-x-3">
                                            <Check className="mt-0.5 size-5 text-green-600" />
                                            <div>
                                                <h4 className="font-semibold text-green-800">Verification Complete</h4>
                                                <p className="mt-1 text-[11px] text-green-700 md:text-xs xl:text-sm">
                                                    Your identity has been successfully verified. You now have access to all banking features.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>
            </section >
        </main >
    );
}

export default Profile;