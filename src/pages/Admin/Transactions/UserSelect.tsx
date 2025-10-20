import { useState } from "react";

//Hooks
import { useSearchUser } from "@/services/queries.service";

//Component
import { Input } from "@/components/ui/input";

//Icons
import { Refresh2, TagUser } from "iconsax-react";


const UserSelect = ({ isUser, handleChange }: { isUser: boolean, handleChange: (key: string, value: string) => void }) => {

    const [selectedId, setSelectedId] = useState<string>("")
    const [searchValue, setSearchValue] = useState<string>("");
    const { data, isLoading, isError, refetch } = useSearchUser(searchValue);


    return !isUser ? (
        <>
            <div className="flex flex-col gap-y-1 mt-4">
                <label htmlFor="search">Search User by Email or FullName <span className="text-red-600">*</span></label>
                <Input type="search" id="search" className="bg-inherit px-4 py-2 border border-neutral-200 rounded-lg focus:outline-1 focus:outline-none focus:outline-primary w-full text-black duration-300 focus:caret-primary"
                    value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search User by Email or FullName" />
            </div>
            {isLoading && <p>Searching...</p>}
            {searchValue.length > 5 && isError && <p onClick={() => refetch()} className="text-red-500 cursor-pointer">Retry Search</p>}
            {
                !isError && searchValue.length > 5 && data && (
                    <ul className="space-y-2">
                        {(Array.isArray(data.data) ? data.data : [data.data]).map((user: User) => (
                            <li key={user.accountId}
                                onClick={() => { handleChange("user", user._id); setSearchValue(''); setSelectedId(user._id) }} className="hover:bg-neutral-200 p-2 rounded-md cursor-pointer">
                                <p className="capitalize"><TagUser className="inline mr-2 size-4" />{user.fullName}</p>
                            </li>
                        ))}
                    </ul>
                )
            }
        </>
    ) : (
        <div className="flex justify-between items-center bg-accent/80 mt-4 p-3 rounded-md text-black">
            {(() => {
                const users = Array.isArray(data?.data) ? data.data : data?.data ? [data.data] : [];
                const selectedUser = users.find((user: User) => user._id === selectedId);
                return (<p className="capitalize"><TagUser className="inline mr-2 size-5" variant="Bold" /> {selectedUser ? `${selectedUser.fullName}` : 'Unknown'} </p>);
            })()}
            <button className="hover:-rotate-90 duration-300" onClick={() => { handleChange("user", ""); setSearchValue('') }}> <Refresh2 variant="Bold" size={18} /> </button>
        </div>
    )
}

export default UserSelect;