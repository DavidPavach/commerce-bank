import { useState } from "react";

//Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

//Icons
import { Shield, ShieldAlert, Mail, Key, Lock, UserX, CheckCircle, AlertTriangle, Copy, Eye, EyeOff } from "lucide-react";
import { TagUser } from "iconsax-react";

export default function Profile({ admin }: { admin: Admin }) {

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [copiedField, setCopiedField] = useState<string | null>(null)

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text)
        setCopiedField(field)
        setTimeout(() => setCopiedField(null), 2000)
    }

    const getInitials = (email: string) => {
        return email.substring(0, 2).toUpperCase()
    }

    const getRoleBadge = (role: string) => {
        if (role === "super_admin") {
            return (
                <Badge className="flex items-center gap-2 bg-primary/20 hover:bg-primary/20 px-3 py-1 text-primary">
                    <ShieldAlert className="size-4 md:size-5 xl:size-6" />
                    Super Administrator
                </Badge>
            )
        }
        return (
            <Badge className="flex items-center gap-2 bg-neutral-200 hover:bg-neutral-200 px-3 py-1 text-neutral-700">
                <Shield className="size-4 md:size-5 xl:size-6" />
                Administrator
            </Badge>
        )
    }

    const getStatusBadge = (isSuspended: boolean) => {
        if (isSuspended) {
            return (
                <Badge className="flex items-center gap-2 bg-red-100 hover:bg-red-100 px-3 py-1 text-red-800">
                    <UserX className="size-4 md:size-5 xl:size-6" />
                    Suspended
                </Badge>
            )
        }
        return (
            <Badge className="flex items-center gap-2 bg-green-100 hover:bg-green-100 px-3 py-1 text-green-800">
                <CheckCircle className="size-4 md:size-5 xl:size-6" />
                Active
            </Badge>
        )
    }

    const maskPassword = (password: string) => {
        return "•".repeat(password.length)
    }

    const ADMIN_FUNCTIONS = ["User Management", "Transaction Monitoring", "Card Request Management", "Savings Management"]
    const SUPER_ADMIN_FUNCTIONS = ["Full System Access", "User Management", "Transaction Monitoring", "Notifications", "Staff Management", "Card Request Management", "Savings Management", "Activities Management"]

    return (
        <div className="space-y-6">
            <div className="mb-6">
                <h1 className="font-bold text-neutral-100 text-xl md:text-2xl xl:text-3xl">Admin Profile</h1>
            </div>

            <Card className="shadow-sm border-neutral-200">
                <CardHeader className="bg-neutral-100/50 border-neutral-200 border-b">
                    <div className="flex md:flex-row flex-col md:items-center gap-6">
                        <Avatar className="border-2 border-neutral-200 size-12 md:size-16 xl:size-20">
                            <AvatarFallback className="bg-primary/20 font-bold text-primary text-xl">
                                {getInitials(admin.email)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex md:flex-row flex-col md:justify-between md:items-start gap-4">
                                <div>
                                    <h2 className="font-bold text-lightBlack text-base md:text-lg xl:text-xl">{admin.email}</h2>
                                    <p className="font-mono text-neutral-500">ID: {admin.adminId}</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {getRoleBadge(admin.role)}
                                    {getStatusBadge(admin.isSuspended)}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
                <Card className="shadow-sm border-neutral-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lightBlack">
                            <TagUser className="size-5 md:size-6 xl:size-7 text-primary" />
                            Account Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <label className="font-medium text-neutral-500">Email Address</label>
                            <div className="flex justify-between items-center bg-neutral-50 p-3 border border-neutral-200 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Mail className="size-4 md:size-5 xl:size-6 text-neutral-500" />
                                    <span className="font-medium text-lightBlack">{admin.email}</span>
                                </div>
                                <Button variant="ghost" size="icon" className="size-8 text-neutral-500" onClick={() => copyToClipboard(admin.email, "email")}>
                                    {copiedField === "email" ? <CheckCircle className="size-4 md:size-5 xl:size-6" /> : <Copy className="size-4 md:size-5 xl:size-6" />}
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="font-medium text-neutral-500">Admin ID</label>
                            <div className="flex justify-between items-center bg-neutral-50 p-3 border border-neutral-200 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Key className="size-4 md:size-5 xl:size-6 text-neutral-500" />
                                    <span className="font-mono font-medium text-lightBlack">{admin.adminId}</span>
                                </div>
                                <Button variant="ghost" size="icon" className="size-8 text-neutral-500" onClick={() => copyToClipboard(admin.adminId, "adminId")}>
                                    {copiedField === "adminId" ? <CheckCircle className="size-4 md:size-5 xl:size-6" /> : <Copy className="size-4 md:size-5 xl:size-6" />}
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="font-medium text-neutral-500">Account Status</label>
                            <div className="bg-neutral-50 p-3 border border-neutral-200 rounded-lg">
                                <div className="flex items-center gap-2">
                                    {admin.isSuspended ? (
                                        <>
                                            <AlertTriangle className="size-4 md:size-5 xl:size-6 text-red-500" />
                                            <span className="font-medium text-red-700">Account Suspended</span>
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="size-4 md:size-5 xl:size-6 text-green-500" />
                                            <span className="font-medium text-green-700">Account Active</span>
                                        </>
                                    )}
                                </div>
                                {admin.isSuspended && (
                                    <p className="mt-1 text-red-600">
                                        This account is currently suspended and cannot access the system.
                                    </p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border-neutral-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lightBlack">
                            <Lock className="size-5 md:size-6 xl:size-7 text-primary" />
                            Security Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <label className="font-medium text-neutral-500 text-sm">Password</label>
                            <div className="flex justify-between items-center bg-neutral-50 p-3 border border-neutral-200 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Key className="size-4 md:size-5 xl:size-6 text-neutral-500" />
                                    <span className="font-mono text-lightBlack">
                                        {showPassword ? admin.encryptedPassword : maskPassword(admin.encryptedPassword)}
                                    </span>
                                </div>
                                <Button variant="ghost" size="icon" className="w-8 h-8 text-neutral-500" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff className="size-4 md:size-5 xl:size-6" /> : <Eye className="size-4 md:size-5 xl:size-6" />}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Role & Permissions */}
            <Card className="shadow-sm border-neutral-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lightBlack">
                        <Shield className="size-5 md:size-6 xl:size-7 text-primary" />
                        Role & Permissions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-5">
                            <div>
                                <h3 className="font-medium text-lightBlack">Current Role</h3>
                                <p className="text-neutral-500 text-sm">
                                    {admin.role === "super_admin"
                                        ? "Full system access with all administrative privileges"
                                        : "Standard administrative access with limited privileges"}
                                </p>
                            </div>
                            {getRoleBadge(admin.role)}
                        </div>

                        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 pt-4 border-neutral-200 border-t">
                            <div className="space-y-3">
                                <h4 className="font-medium text-lightBlack">Permissions</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 space-y-2">
                                    {admin.role === "super_admin" ? (
                                        <>
                                            {SUPER_ADMIN_FUNCTIONS.map((items, index) => (
                                                <div key={`superadmin${index}`} className="flex items-center gap-2 text-green-700">
                                                    <CheckCircle className="size-4 md:size-5 xl:size-6" />
                                                    <span className="text-sm">{items}</span>
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        <>
                                            {ADMIN_FUNCTIONS.map((items, index) => (
                                                <div key={`admin_${index}`} className="flex items-center gap-2 text-green-700">
                                                    <CheckCircle className="size-4 md:size-5 xl:size-6" />
                                                    <span className="text-sm">{items}</span>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h4 className="font-medium text-lightBlack">Access Level</h4>
                                <div className="bg-primary/10 p-3 border border-primary/20 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        {admin.role === "super_admin" ? (
                                            <ShieldAlert className="size-5 md:size-6 xl:size-7 text-primary" />
                                        ) : (
                                            <Shield className="size-5 md:size-6 xl:size-7 text-neutral-600" />
                                        )}
                                        <div>
                                            <p className="font-medium text-lightBlack">
                                                {admin.role === "super_admin" ? "Maximum Security Clearance" : "Standard Security Clearance"}
                                            </p>
                                            <p className="text-neutral-600 text-xs">
                                                {admin.role === "super_admin"
                                                    ? "Can perform all administrative actions"
                                                    : "Limited to user and transaction management"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div >
    )
}
