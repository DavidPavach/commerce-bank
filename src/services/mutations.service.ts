import { useMutation, useQueryClient } from "@tanstack/react-query";

//API Services
import { adminKycUser, adminPatch, authAdminFn, createAccount, createAdmin, createAdminTransaction, createBeneficiaryFn, createCardRequestFn, createDepositRequestFn, createSampleAdminFn, createSavingsFn, createTransactionFn, createUserFn, deleteAccount, deleteActivity, deleteBeneficiary, deleteCardRequest, deleteDepositRequest, deleteSavings, deleteSavingsFn, deleteTransactionFn, editAccounts, editDepositRequest, editTransactionFn, getPrices, getUserBalanceFn, getUserDetailsFn, loginUserFn, passwordResetVerification, patchUser, resendVerificationFn, resetPassword, topUpSavingsFn, updateCardRequest, updateDepositRequestFn, updateDetailsFn, updatePins, updateProfilePictureFn, updateTransaction, userKycFn, validateLoginFn, verifyPasswordResetOtp, verifyUserFn, withdrawSavingsFn } from "./api.service";

//Utils, Store and Types
import { setAdminTokens, setTokens } from "@/lib/token";
import { useUserStore } from "@/stores/userStore";
import { CreateTransaction } from "@/types";

//Authenticate Users
export function useAuthUser() {

    return useMutation({
        mutationFn: (data: { email: string, password: string }) => loginUserFn(data),
        onError: (error) => {
            console.error("Login failed:", error);
        },
    })
}

//Validate Logged In User
export function useValidateUser() {

    const queryClient = useQueryClient();
    const { setUser, setBalance, setPrices } = useUserStore();

    return useMutation({
        mutationFn: (data: { email: string, otp: string }) => validateLoginFn(data),
        onError: (error) => {
            console.error("Validate Login failed:", error);
        },
        onSuccess: async (response) => {
            setTokens(response.data.accessToken);
            const [user, balanceRes, pricesRes] = await Promise.all([
                getUserDetailsFn(),
                getUserBalanceFn(),
                getPrices(),
            ]);

            const balance = balanceRes.data;
            const prices = pricesRes.data;

            setUser(user.data);
            setBalance(balance);
            setPrices(prices);

            queryClient.invalidateQueries();
        }
    })
}

//Create New Users
export function useRegisterUser() {

    return useMutation({
        mutationFn: (data: UserCreation) => createUserFn(data),
        onError: (error) => {
            console.error("Registration failed:", error);
        }
    })
}

//Resend Verification Email
export function useResendVerification() {

    return useMutation({
        mutationFn: () => resendVerificationFn(),
        onError: (error) => {
            console.error("Resend Verification Code failed:", error);
        }
    })
}

//Verify User
export function useVerifyUser() {

    return useMutation({
        mutationFn: (data: { verificationCode: string }) => verifyUserFn(data),
        onError: (error) => {
            console.error("User Verification failed:", error);
        }
    })
}

//Kyc
export function useUserKyc() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: FormData) => userKycFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userDetails'] });
        },
        onError: (error) => {
            console.error("User Kyc failed:", error);
        }
    })
}

//Update User Profile
export function useUpdateUserProfile() {

    const queryClient = useQueryClient();
    return useMutation({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mutationFn: (data: any) => updateDetailsFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userDetails'] });
        },
        onError: (error) => {
            console.error("User Profile Update failed:", error);
        }
    })
}

//Update Profile Picture
export function useUpdateProfilePicture() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: FormData) => updateProfilePictureFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userDetails'] });
        },
        onError: (error) => {
            console.error("User Profile Picture Update failed:", error);
        }
    })
}

//Create Transaction
export function useCreateTransaction() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateTransaction) => createTransactionFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lastFive'] });
            queryClient.invalidateQueries({ queryKey: ['allTransactions'] });
            queryClient.invalidateQueries({ queryKey: ['userBalance'] });
        },
        onError: (error) => {
            console.error("Creating Transaction Failed:", error);
        }
    })
}

//Edit Transaction
export function useEditTransaction() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { transactionId: string, level: string }) => editTransactionFn(data),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: [`transactionDetails:${response.data.data.transactionId}`] });
        },
        onError: (error) => {
            console.error("Editing Transaction:", error);
        }
    })
}

//Create Beneficiary
export function useCreateBeneficiary() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { fullName: string, accountNumber: string, bankName: string, note?: string }) => createBeneficiaryFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`beneficiaries`] });
        },
        onError: (error) => {
            console.error("Creating Beneficiary Failed:", error);
        }
    })
}

//Delete Beneficiary
export function useDeleteBeneficiary() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteBeneficiary(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`beneficiaries`] });
        },
        onError: (error) => {
            console.error(`Deleting Beneficiary Failed:`, error);
        }
    })
}

//Create Savings
export function useCreateSavings() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { title: string, targetAmount: number, savedAmount: number, startDate: string, endDate?: string }) => createSavingsFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userSavings"] });
            queryClient.invalidateQueries({ queryKey: ["userBalance"] });
        },
        onError: (error) => {
            console.error(`Savings Creation Failed:`, error);
        }
    })
}

//Withdraw Savings
export function useWithdrawSavings() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { savingsId: string, amount: number }) => withdrawSavingsFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userSavings"] });
            queryClient.invalidateQueries({ queryKey: ["userBalance"] });
        },
        onError: (error) => {
            console.error(`Savings Withdrawal Failed:`, error);
        }
    })
}

//TopUp Savings
export function useTopUpSavings() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { savingsId: string, amount: number }) => topUpSavingsFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`userSavings`] });
            queryClient.invalidateQueries({ queryKey: ["userBalance"] });
        },
        onError: (error) => {
            console.error(`Savings TopUp Failed:`, error);
        }
    })
}

//Delete Savings
export function useDeleteSavings() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (savingsId: string) => deleteSavingsFn(savingsId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`userSavings`] });
        },
        onError: (error) => {
            console.error(`Delete Savings Failed:`, error);
        }
    })
}

//New Deposit Request
export function useDepositRequest() {

    return useMutation({
        mutationFn: (data: { amount: number }) => createDepositRequestFn(data),
        onError: (error) => {
            console.error("Create Deposit Request Failed:", error);
        }
    })
}

//Update Deposit Request
export function useDepositUpdateRequest() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: UpdateDeposit) => updateDepositRequestFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`depositRequests`] });
        },
        onError: (error) => {
            console.error(`Deposit Request Update Failed:`, error);
        }
    })
}

//New Card Request
export function useCardRequest() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => createCardRequestFn(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`cardRequest`] });
        },
        onError: (error) => {
            console.error(`Card Request Creation Failed:`, error);
        }
    })
}


// Admin

//Create Admin Without Login
export function useCreateAdminSample() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { email: string, password: string, role: "admin" | "super_admin" }) => createSampleAdminFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`admins`] });
        },
        onError: (error) => {
            console.error(`Admin Creation Failed:`, error);
        }
    })
}

//Admin Login
export function useLoginAdmin() {

    return useMutation({
        mutationFn: (data: { email: string, password: string }) => authAdminFn(data),
        onSuccess: async (response) => {
            setAdminTokens(response.data.accessToken);
        },
        onError: (error) => {
            console.error("Admin Login failed:", error);
        }
    })
}

// Transactions

// Delete Transactions
export function useDeleteTransaction() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (transactionId: string) => deleteTransactionFn(transactionId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`transactions`] });
        },
        onError: (error) => {
            console.error(`Deleting Transaction Failed:`, error);
        }
    })
}

//Update Transaction
export function useUpdateTransaction() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { status?: string, transactionId: string, createdAt?: string }) => updateTransaction(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
        },
        onError: (error) => {
            console.error("Couldn't update transaction:", error);
        }
    })
}

//Update User KYC
export function useAdminUserKyc() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { email: string, kyc: { status: "accepted" | "pending" | "rejected" } }) => adminKycUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allUsers'] });
        },
        onError: (error) => {
            console.error(`Couldn't update user kyc:`, error);
        }
    })
}

//Update User
export function useUpdateUser() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: PatchUser) => patchUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allUsers'] });
        },
        onError: (error) => {
            console.error(`Couldn't update user details:`, error);
        }
    })
}

//Update Account
export function useUpdateAccount() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: EditAccount) => editAccounts(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allAccounts'] });
        },
        onError: (error) => {
            console.error(`Couldn't update account details:`, error);
        }
    })
}

//Delete Account
export function useDeleteAccount() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (accountId: string) => deleteAccount(accountId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allAccounts'] });
        },
        onError: (error) => {
            console.error(`Couldn't delete account details:`, error);
        }
    })
}

//Create Account
export function useCreateAccount() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { fullName: string, accountNumber: string, bankName: string }) => createAccount(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allAccounts'] });
        },
        onError: (error) => {
            console.error(`Couldn't create account details:`, error);
        }
    })
}

//Delete Savings
export function useAdminDeleteSavings() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (savingsId: string) => deleteSavings(savingsId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allSavings'] });
        },
        onError: (error) => {
            console.error(`Couldn't delete savings:`, error);
        }
    })
}

//Delete Activities
export function useAdminDeleteActivity() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (activityId: string) => deleteActivity(activityId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allActivities'] });
        },
        onError: (error) => {
            console.error(`Couldn't delete activity:`, error);
        }
    })
}

//Update Card Request
export function useUpdateCardRequest() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { requestId: string, status: string }) => updateCardRequest(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allCardRequests'] });
        },
        onError: (error) => {
            console.error(`Couldn't update card request details:`, error);
        }
    })
}

//Delete Card Request
export function useDeleteCardRequest() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (requestId: string) => deleteCardRequest(requestId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allCardRequests'] });
        },
        onError: (error) => {
            console.error(`Couldn't delete card request details:`, error);
        }
    })
}

//Create New Admin
export function useCreateAdmin() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { email: string, password: string, role: "admin" | "super_admin" }) => createAdmin(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`allAdmins`] });
        },
        onError: (error) => {
            console.error(`Admin Creation Failed:`, error);
        }
    })
}

//Edit Admin
export function useEditAdmin() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: PatchAdmin) => adminPatch(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allAdmins'] });
        },
        onError: (error) => {
            console.error(`Couldn't update admin details:`, error);
        }
    })
}

//Update User Pin
export function usePinUpdate() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { email: string, taxPin?: string, tacPin?: string, insurancePin?: string }) => updatePins(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allAccounts'] });
        },
        onError: (error) => {
            console.error(`Couldn't update account pins:`, error);
        }
    })
}

//Password Reset Verification
export function usePasswordResetVerification() {

    return useMutation({
        mutationFn: (data: { email: string }) => passwordResetVerification(data),
        onError: (error) => {
            console.error("Password reset otp email failed:", error);
        }
    })
}

//Verify Password OTP
export function useVerifyPasswordResetOTP() {

    return useMutation({
        mutationFn: (data: { email: string, otp: string }) => verifyPasswordResetOtp(data),
        onError: (error) => {
            console.error("User password reset verification failed:", error);
        }
    })
}

//Reset Password
export function usePasswordReset() {

    return useMutation({
        mutationFn: (data: { email: string; password: string; }) => resetPassword(data),
        onError: (error) => {
            console.error("User password reset failed:", error);
        }
    })
}

//Create New Transaction
export function useCreateNewTransaction() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: AdminTransaction) => createAdminTransaction(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
        },
        onError: (error) => {
            console.error("Couldn't create new transaction:", error);
        }
    })
}

// Edit Deposit Request
export function useEditDepositRequest() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: EditDepositRequest) => editDepositRequest(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allDepositRequest'] });
        },
        onError: (error) => {
            console.error("Couldn't update deposit request:", error);
        }
    })
}

// Delete Deposit Request
export function useDeleteDepositRequest() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteDepositRequest(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allDepositRequest'] });
        },
        onError: (error) => {
            console.error("Couldn't delete deposit request:", error);
        }
    })
}