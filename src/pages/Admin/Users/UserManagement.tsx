//Utils
import { formatDate } from "@/utils/format";

//Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getColor } from "@/components/Utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfile } from "./UserProfile";
import Savings from "./Savings";
import Transactions from "./Transactions";
import { KYCSection } from "./KycSection";
import { UserSettings } from "./UserSettings";


const UserManagement = ({ user, onClose }: { user: User, onClose: () => void }) => {

    const getStatusBadge = (isVerified: boolean, fully = false) => {
        if (isVerified) {
            return <Badge className="bg-green-100 text-green-800">{fully ? "Verified Fully" : "Verified"}</Badge>
        }
        return <Badge className="bg-accent/20 text-accent">{fully ? "Not Verified" : "Unverified"}</Badge>
    }


    return (
        <main className="space-y-6">
            <Badge onClick={onClose} variant="destructive" className="cursor-pointer">Close</Badge>
            <Card className="shadow-sm border-neutral-200">
                <CardHeader className="bg-neutral-100/50 border-neutral-200 border-b">
                    <div className="flex md:flex-row flex-col md:items-center gap-4">
                        <Avatar className="border border-neutral-200 size-16">
                            <AvatarImage src={user?.profilePicture || "/profile.jpeg"} alt={user.fullName} />
                            <AvatarFallback className="bg-primary/20 text-primary text-lg">
                                {user.fullName.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-2">
                                <div>
                                    <h2 className="font-bold text-lightBlack text-base md:text-lg xl:text-xl capitalize">{user.fullName}</h2>
                                    <p className="text-neutral-500 first-letter:uppercase">{user.email}</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {getStatusBadge(user.isVerified)}
                                    {user.kyc && (<Badge className={`${getColor(user.kyc.status)} capitalize`}>{user.kyc.status}</Badge>)}
                                    {getStatusBadge(user.isFullyVerified, true)}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-4">
                    <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 text-sm">
                        <div>
                            <p className="text-neutral-500">Member Since</p>
                            <p className="font-medium text-lightBlack text-sm md:text-base xl:text-lg">{formatDate(user.createdAt)}</p>
                        </div>
                        <div>
                            <p className="text-neutral-500">Last Session</p>
                            <p className="font-medium text-lightBlack text-sm md:text-base xl:text-lg">
                                {user.lastSession ? formatDate(user.lastSession) : "Date Unavailable"}
                            </p>
                        </div>
                        <div>
                            <p className="text-neutral-500">Country</p>
                            <p className="font-medium text-lightBlack text-sm md:text-base xl:text-lg">{user.country}</p>
                        </div>
                        <div>
                            <p className="text-neutral-500">Phone</p>
                            <p className="font-medium text-lightBlack text-sm md:text-base xl:text-lg">{user.phoneNumber}</p>
                        </div>
                        <div>
                            <p className="text-neutral-500">Is Online?</p>
                            <div className="font-medium text-lightBlack text-sm md:text-base xl:text-lg">{user.isOnline ? <main className="flex items-center gap-x-1"><div className="bg-green-400 rounded-[50%] size-3" />Online</main> : <main className="flex items-center gap-x-1"><div className="bg-red-400 rounded-[50%] size-3" />Offline</main>}</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid grid-cols-5 bg-neutral-100 w-full">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="savings">Savings</TabsTrigger>
                    <TabsTrigger value="transactions">Trans.</TabsTrigger>
                    <TabsTrigger value="kyc">KYC</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="mt-6">
                    <UserProfile user={user} />
                </TabsContent>

                <TabsContent value="savings" className="mt-6">
                    <Savings userId={user._id} />
                </TabsContent>

                <TabsContent value="transactions" className="mt-6">
                    <Transactions userId={user._id} />
                </TabsContent>

                <TabsContent value="kyc" className="mt-6">
                    <KYCSection kyc={user.kyc} />
                </TabsContent>

                <TabsContent value="settings" className="mt-6">
                    <UserSettings user={user} />
                </TabsContent>
            </Tabs>
        </main>
    );
}

export default UserManagement; 