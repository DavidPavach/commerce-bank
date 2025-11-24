import { keepPreviousData, useQuery } from "@tanstack/react-query";

//Api endpoints
import { adminSavings, adminUserTransactions, checkAccountFn, fetchDepositRequests, fetchTransactionFn, getAccounts, getActivities, getAdminDetails, getAdmins, getAdminsFn, getAllTransactionsFn, getAllUsers, getBeneficiariesFn, getCardRequestFn, getCardRequests, getDepositRequestFn, getLastTransactionsFn, getPrices, getSavings, getTransactionsFn, getUser, getUserBalanceFn, getUserDetailsFn, getUserSavingsFn } from "./api.service";


//Get Current logged In User Details
export function GetUserDetails() {
    return useQuery({
        queryKey: ["userDetails"],
        queryFn: () => getUserDetailsFn()
    })
}

//Get Current Logged In User Balance
export function GetUserBalance() {
    return useQuery({
        queryKey: ['userBalance'],
        queryFn: () => getUserBalanceFn()
    })
}

//Get Current User Savings
export function GetUserSavings() {
    return useQuery({
        queryKey: ['userSavings'],
        queryFn: () => getUserSavingsFn()
    })
}

//Get Prices
export function GetPrices() {
    return useQuery({
        queryKey: ['prices'],
        queryFn: () => getPrices()
    })
}

//Get a user card request
export function GetCardRequest() {
    return useQuery({
        queryKey: ['cardRequest'],
        queryFn: () => getCardRequestFn()
    })
}

//Get Beneficiaries
export function GetBeneficiaries() {
    return useQuery({
        queryKey: ["beneficiaries"],
        queryFn: () => getBeneficiariesFn()
    })
}

//Get Current User Last Five Transactions
export function GetUserLastFiveTransactions() {
    return useQuery({
        queryKey: ['lastFive'],
        queryFn: () => getLastTransactionsFn()
    })
}

//Get Current User Transactions
export function GetAllTransactions(page: string, limit: string) {
    return useQuery({
        queryKey: ['allTransactions', page, limit],
        queryFn: () => getAllTransactionsFn(page, limit),
        placeholderData: keepPreviousData
    })
}

//Get Account Number Details
export function GetAccountDetails(manualEntry: boolean, accountNumber: string) {
    return useQuery({
        queryKey: ['accountDetails'],
        queryFn: () => checkAccountFn(accountNumber),
        enabled: manualEntry && accountNumber.trim().length >= 8,
    })
}

//Get Transaction Details
export function GetTransactionDetails(transactionId: string) {
    return useQuery({
        queryKey: [`transactionDetails:${transactionId}`],
        queryFn: () => fetchTransactionFn(transactionId),
    })
}

//Get Deposit Request
export function GetDepositRequests() {
    return useQuery({
        queryKey: ['depositRequests'],
        queryFn: () => getDepositRequestFn()
    })
}


// Admin Queries

//Get Admins
export function GetAdmins() {
    return useQuery({
        queryKey: ["admins"],
        queryFn: () => getAdminsFn()
    })
}

//Get All Transactions
export function GetTransactions(page: string, limit: string) {
    return useQuery({
        queryKey: ['transactions', page, limit],
        queryFn: () => getTransactionsFn(page, limit),
        placeholderData: keepPreviousData
    })
}

//Fetch all Users
export function GetAllUsers(page?: string, limit?: string) {
    return useQuery({
        queryKey: ['allUsers', page, limit],
        queryFn: () => getAllUsers(page, limit),
        placeholderData: keepPreviousData,
    })
}

//Fetch User Savings
export function UserSavings(userId: string) {
    return useQuery({
        queryKey: [`${userId}_savings`],
        queryFn: () => adminSavings(userId)
    })
}

//Fetch a user Transactions
export function useGetUserTransactions(data: { page?: string, limit?: string, userId: string, transactionType?: string }) {
    return useQuery({
        queryKey: [`${data.userId} user-transactions`, data.userId, data.page, data.limit, data.transactionType],
        queryFn: () => adminUserTransactions(data),
        placeholderData: keepPreviousData,
    });
}

//Fetch all Users
export function useAllAccounts(page?: string, limit?: string) {
    return useQuery({
        queryKey: ['allAccounts', page, limit],
        queryFn: () => getAccounts(page, limit),
        placeholderData: keepPreviousData,
    })
}

//Fetch all Savings
export function useAllSavings(page?: string, limit?: string) {
    return useQuery({
        queryKey: ['allSavings', page, limit],
        queryFn: () => getSavings(page, limit),
        placeholderData: keepPreviousData,
    })
}

//Fetch all Savings
export function useAllActivities(page?: string, limit?: string) {
    return useQuery({
        queryKey: ['allActivities', page, limit],
        queryFn: () => getActivities(page, limit),
        placeholderData: keepPreviousData,
    })
}

//Fetch all Card Requests
export function useCardRequests(page?: string, limit?: string) {
    return useQuery({
        queryKey: ['allCardRequests', page, limit],
        queryFn: () => getCardRequests(page, limit),
        placeholderData: keepPreviousData,
    })
}

//Fetch All Admins
export function useAdmins() {
    return useQuery({
        queryKey: ['allAdmins'],
        queryFn: () => getAdmins(),
    })
}

//Fetch logged in Admin
export function useCurrentAdmin() {
    return useQuery({
        queryKey: ['currentAdmin'],
        queryFn: () => getAdminDetails(),
    })
}

//Fetch a user
export function useSearchUser(value: string) {
    return useQuery({
        queryKey: ['searchUser'],
        queryFn: () => getUser(value),
        enabled: value.trim().length > 5,
    })
}

//Fetch All Deposit Requests
export function useGetDepositRequest(page?: string, limit?: string){
    return useQuery({
        queryKey: ['allDepositRequest', page, limit],
        queryFn: () => fetchDepositRequests(page, limit),
        placeholderData: keepPreviousData,
    })
}