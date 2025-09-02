import { keepPreviousData, useQuery } from "@tanstack/react-query";

//Api endpoints
import { checkAccountFn, fetchTransactionFn, getAllTransactionsFn, getBeneficiariesFn, getCardRequestFn, getDepositRequestFn, getLastTransactionsFn, getPrices, getUserBalanceFn, getUserDetailsFn, getUserSavingsFn } from "./api.service";


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
        enabled: manualEntry && accountNumber.trim().length === 10,
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