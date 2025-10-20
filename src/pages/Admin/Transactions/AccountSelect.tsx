import { useMemo, useState } from "react";

//Services
import { useAllAccounts } from "@/services/queries.service";

//Components
import { ErrorScreen } from "@/components/ErrorComponents";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

//Icons
import { Check, Search } from "lucide-react";

const AccountSelect = ({ linkAccount, setLinkAccount, recipient, handleSelect }: { linkAccount: boolean, setLinkAccount: () => void, recipient: string, handleSelect: (bankDetails: BankAccount) => void }) => {

    const [searchQuery, setSearchQuery] = useState<string>("");
    const { data, isError, refetch } = useAllAccounts("1", "10000");

    const filteredAccounts = useMemo(() => {
        const accounts: BankAccount[] = data?.data?.data || []
        return accounts.filter((account) => {
            const query = searchQuery.toLowerCase()
            return (
                account.accountNumber.toLowerCase().includes(query) ||
                account.bankName.toLowerCase().includes(query) ||
                account.fullName.toLowerCase().includes(query)
            )
        })
    }, [data?.data?.data, searchQuery])

    return (
        <Dialog open={linkAccount} onOpenChange={setLinkAccount}>
            {linkAccount && (isError ?
                <ErrorScreen variant="card" type="500" size="sm" onRetry={refetch} />
                :
                <DialogContent className="rounded-2xl max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Select Account</DialogTitle>
                        <DialogDescription>Choose the account you wish to use.</DialogDescription>
                    </DialogHeader>
                    <div className="relative">
                        <Search className="top-1/2 left-3 absolute size-4 text-muted-foreground -translate-y-1/2" />
                        <Input placeholder="Search by account number, bank name, or full name..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 text-xs md:text-sm xl:text-base" />
                    </div>
                    <ScrollArea className="border rounded-lg h-[400px]">
                        <div className="space-y-2 p-4">
                            {filteredAccounts.length === 0 ? (
                                <div className="flex justify-center items-center h-32 text-muted-foreground">No accounts found</div>
                            ) : (
                                filteredAccounts.map((account) => (
                                    <Card key={account._id} className={`p-4 cursor-pointer transition-all hover:shadow-md ${recipient === account._id ? "border-primary bg-primary/5" : "hover:border-primary/50"}`} onClick={() => handleSelect(account)}>
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="font-semibold text-sm truncate">{account.fullName}</h3>
                                                    {recipient === account._id && <Check className="flex-shrink-0 size-4 text-primary" />}
                                                </div>
                                                <div className="space-y-1 text-muted-foreground text-xs">
                                                    <p><span className="font-medium">Account:</span> {account.accountNumber}</p>
                                                    <p><span className="font-medium">Bank:</span> {account.bankName}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                ))
                            )}
                        </div>
                    </ScrollArea>
                </DialogContent>
            )}
        </Dialog>
    );
}

export default AccountSelect;