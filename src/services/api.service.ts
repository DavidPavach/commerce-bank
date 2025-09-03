//Configs and Types
import { axiosUnauthInstance, getAxiosAuthInstance } from './config';
import { CreateTransaction } from '@/types';

const axiosUser = getAxiosAuthInstance();
// const axiosAdmin = getAxiosAuthInstance('admin');

//Login a User
export const loginUserFn = async (data: { email: string; password: string }) => {
    const response = await axiosUnauthInstance.post("auth/login", data);
    return response.data;
};

//Validate Login
export const validateLoginFn = async (data: { email: string, otp: string }) => {
    const response = await axiosUnauthInstance.post("auth/validate", data);
    return response.data;
}

//Create a User
export const createUserFn = async (data: UserCreation) => {
    const response = await axiosUnauthInstance.post("users/create", data);
    return response.data;
}

//Get Logged in User Details
export const getUserDetailsFn = async () => {
    const response = await axiosUser.get<GetDetailsResponse>("users/currentUser")
    return response.data;
}

//Get Logged in User Savings
export const getUserSavingsFn = async () => {
    const response = await axiosUser.get("savings/get")
    return response.data;
}

//Get Coin Prices
export const getPrices = async () => {
    const response = await axiosUnauthInstance.get(`transactions/fetchPrices`)
    return response.data;
}

//Get Logged in User Balance
export const getUserBalanceFn = async () => {
    const response = await axiosUser.get(`transactions/getBalance`)
    return response.data;
}

//Resend Email Verification
export const resendVerificationFn = async () => {
    const response = await axiosUser.get("users/resend");
    return response;
}

//Verify User
export const verifyUserFn = async (data: { verificationCode: string }) => {
    const response = await axiosUser.post("users/verify", data);
    return response.data;
}

//Submit Kyc
export const userKycFn = async (data: FormData) => {
    const response = await axiosUser.patch("users/kyc", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

//Update Other Details
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateDetailsFn = async (data: any): Promise<any> => {
    const response = await axiosUser.patch(`users/update`, data);
    return response.data;
}

//Update Profile Picture
export const updateProfilePictureFn = async (data: FormData) => {
    const response = await axiosUser.patch(`users/updateProfilePicture`, data);
    return response.data;
}

//Delete Notification
export const deleteNotificationFn = async (id: string) => {
    const response = await axiosUser.delete(`notification/delete/${id}`);
    return response.data;
}

//Get User Card Request
export const getCardRequestFn = async () => {
    const response = await axiosUser.get<GetCardRequestResponse>(`cards/get`);
    return response.data;
}

//Create a Card Request
export const createCardRequestFn = async () => {
    const response = await axiosUser.post<GetCardRequestResponse>(`cards/new`);
    return response.data;
}

//Get Beneficiaries
export const getBeneficiariesFn = async () => {
    const response = await axiosUser.get(`beneficiary/getBeneficiaries`);
    return response.data;
}

//Create Beneficiary
export const createBeneficiaryFn = async (data: { fullName: string, accountNumber: string, bankName: string, note?: string }) => {
    const response = await axiosUser.post(`beneficiary/create`, data);
    return response.data;
}

//Delete Beneficiary
export const deleteBeneficiary = async (id: string) => {
    const response = await axiosUser.delete(`beneficiary/delete/${id}`);
    return response.data;
}

//Get Last 5 transactions
export const getLastTransactionsFn = async () => {
    const response = await axiosUser.get(`transactions/getLastTransactions`);
    return response.data;
}

//Get user transactions
export const getAllTransactionsFn = async (page: string, limit: string) => {
    const response = await axiosUser.get(`transactions/userTransactions?page=${page}&limit=${limit}`)
    return response.data;
}

//Check an Account Number
export const checkAccountFn = async (accountNumber: string) => {
    const response = await axiosUser.get(`accounts/get/${accountNumber}`);
    return response.data;
}

//Create Transaction
export const createTransactionFn = async (data: CreateTransaction) => {
    const response = await axiosUser.post(`transactions/create`, data);
    return response.data;
};

//Fetch a Transaction
export const fetchTransactionFn = async (transactionId: string) => {
    const response = await axiosUser.get(`transactions/getTransaction/${transactionId}`);
    return response.data;
}

//Edit a Transaction
export const editTransactionFn = async (data: { transactionId: string, level: string }) => {
    const response = await axiosUser.post(`transactions/edit`, data);
    return response.data;
}

//Create new savings
export const createSavingsFn = async (data: { title: string, targetAmount: number, savedAmount: number, startDate: string, endDate?: string }) => {
    const response = await axiosUser.post(`savings/new`, data);
    return response.data;
}

//Withdraw Savings
export const withdrawSavingsFn = async (data: { savingsId: string, amount: number }) => {
    const response = await axiosUser.post(`savings/withdraw`, data);
    return response.data;
}

//TopUp Savings
export const topUpSavingsFn = async (data: { savingsId: string, amount: number }) => {
    const response = await axiosUser.post(`savings/topUp`, data);
    return response.data;
}

//Delete Savings
export const deleteSavingsFn = async (savingsId: string) => {
    const response = await axiosUser.delete(`savings/deleteSavings/${savingsId}`);
    return response.data;
}

//Create Deposit Request
export const createDepositRequestFn = async (data: { amount: number }) => {
    const response = await axiosUser.post(`deposits/new`, data);
    return response.data;
}

//Update Deposit Request
export const updateDepositRequestFn = async (data: UpdateDeposit) => {
    const response = await axiosUser.patch(`deposits/update`, data);
    return response.data;
}

//Get Deposit Requests
export const getDepositRequestFn = async () => {
    const response = await axiosUser.get(`deposits/get`);
    return response.data;
}


//Admin Endpoints

//Create Sample Admin
export const createSampleAdminFn = async (data: { email: string, password: string, role: "admin" | "super_admin" }) => {
    const response = await axiosUnauthInstance.post(`admins/sampleCreate`, data);
    return response.data;
}