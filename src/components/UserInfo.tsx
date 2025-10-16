//Component
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserInfoProps {
    user: {
        fullName: string
        email: string
        profilePicture: string
    }
}

export default function UserInfo({ user }: UserInfoProps) {
    return (
        <main className="bg-neutral-100 shadow-sm mx-auto border border-neutral-300 rounded-lg w-full">
            <section className="bg-neutral-100/50 p-4 border-neutral-300 border-b">
                <h1 className="font-semibold text-lightBlack text-base md:text-lg xl:text-xl">User Information</h1>
            </section>
            <div className="p-4 md:p-6 xl:p-8">
                <div className="flex md:flex-row flex-col items-start gap-6">
                    <Avatar className="border border-neutral-200 size-12 md:size-14 xl:size-16">
                        <AvatarImage src={user.profilePicture || "/profile.jpeg"} alt={user.fullName} />
                        <AvatarFallback className="bg-primary/20 text-primary text-sm md:text-base xl:text-lg">
                            {user.fullName.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 gap-x-8 gap-y-4 grid grid-cols-1 md:grid-cols-2">
                        <div className="space-y-1">
                            <p className="font-medium text-neutral-500">Full Name</p>
                            <p className="font-medium text-lightBlack capitalize">{user.fullName}</p>
                        </div>

                        <div className="space-y-1">
                            <p className="font-medium text-neutral-500">Email</p>
                            <p className="font-medium text-lightBlack first-letter:uppercase">{user.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
