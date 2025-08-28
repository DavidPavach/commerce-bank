import { useMutation, useQueryClient } from "@tanstack/react-query";

//API Services
import { createBeneficiaryFn, createCardRequestFn, createDepositRequestFn, createSavingsFn, createTransactionFn, createUserFn, deleteBeneficiary, deleteSavingsFn, editTransactionFn, getPrices, getUserBalanceFn, getUserDetailsFn, loginUserFn, resendVerificationFn, topUpSavingsFn, updateDetailsFn, updateProfilePictureFn, userKycFn, validateLoginFn, verifyUserFn, withdrawSavingsFn } from "./api.service";

//Utils, Store and Types
import { setTokens } from "@/lib/token";
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