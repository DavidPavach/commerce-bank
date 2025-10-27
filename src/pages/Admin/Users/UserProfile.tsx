//Component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { formatDate } from "@/utils/format";

export function UserProfile({ user }: { user: User }) {

  const DETAILS = [
    { label: "Full name", value: user.fullName },
    { label: "Email", value: user.email },
    { label: "Password", value: user.encryptedPassword },
    { label: "Address", value: user.address },
    { label: "Country", value: user.country },
    { label: "Phone Number", value: user.phoneNumber },
    { label: "Gender", value: user.gender },
    { label: "Transfer Pin", value: user.transferPin },
    { label: "Card Frozen", value: user.freezeCard ? "True" : "False" },
    { label: "Account Number", value: user.accountNumber },
    { label: "Is User Suspended", value: user.isSuspended ? "Yes" : "No" },
    { label: "Suspension Date", value: user.suspendedDate ? formatDate(user.suspendedDate) : "No Date" },
    { label: "Tax Pin", value: user.taxPin ? user.taxPin : "No Tax Pin" },
    { label: "Tac Pin", value: user.tacPin ? user.tacPin : "No Tac Pin" },
    { label: "Insurance Pin", value: user.taxPin ? user.insurancePin : "No Insurance Pin" },
    { label: "Transaction Suspended", value: user.transactionSuspended ? "Yes" : "No" },
    { label: "Created On", value: formatDate(user.createdAt) },
  ]
  return (
    <Card className="shadow-sm border-neutral-200">
      <CardHeader>
        <CardTitle className="text-lightBlack text-xl md:text-2xl xl:text-3xl">Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

          {DETAILS.map((detail, index) => (
            <div key={`${detail.label} ${index}`} className="space-y-0.5">
              <Label className="text-neutral-600">{detail.label}</Label>
              <p className="font-medium text-lightBlack text-sm md:text-base xl:text-lg first-letter:uppercase">{detail.value}</p>
            </div>
          ))}

        </div>
      </CardContent>
    </Card>
  );
}
