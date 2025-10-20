//Configs and Types
import { axiosUnauthInstance, getAxiosAuthInstance } from './config';
import { CreateTransaction } from '@/types';

const axiosUser = getAxiosAuthInstance();
const axiosAdmin = getAxiosAuthInstance('admin');

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

//Password Reset Verification
export const passwordResetVerification = async (data: { email: string }) => {
    const response = await axiosUnauthInstance.post("auth/passwordResetVerification", data);
    return response.data;
}

//Verify Password Reset OTP
export const verifyPasswordResetOtp = async (data: { email: string, otp: string }) => {
    const response = await axiosUnauthInstance.post("auth/verifyPasswordResetOTP", data);
    return response.data;
}

//Reset Password
export const resetPassword = async (data: { email: string, password: string }) => {
    const response = await axiosUnauthInstance.post("auth/resetPassword", data);
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

//Admin Authentication
export const authAdminFn = async (data: { email: string, password: string }) => {
    const response = await axiosUnauthInstance.post(`auth/adminLogin`, data);
    return response.data;
}

//Create Sample Admin
export const createSampleAdminFn = async (data: { email: string, password: string, role: "admin" | "super_admin" }) => {
    const response = await axiosUnauthInstance.post(`admins/sampleCreate`, data);
    return response.data;
}

//Get Admins
export const getAdminsFn = async () => {
    const response = await axiosAdmin.get(`admins/getAdmins`);
    return response.data;
}

//Get All Transactions
export const getTransactionsFn = async (page: string, limit: string) => {
    const response = await axiosAdmin.get(`transactions/getAllTransactions?page=${page}&limit=${limit}`)
    return response.data;
}

//Delete Transactions
export const deleteTransactionFn = async (transactionId: string) => {
    const response = await axiosAdmin.delete(`transactions/delete/${transactionId}`)
    return response.data;
}

//Update a transaction
export const updateTransaction = async (data: { status?: string, transactionId: string, createdAt?: string }) => {
    const response = await axiosAdmin.patch(`transactions/updateTransaction`, data);
    return response.data;
}

//Get all users
export const getAllUsers = async (page?: string, limit?: string) => {
    const response = await axiosAdmin.get(`users/allUsers?page=${page}&limit=${limit}`);
    return response.data;
}

//Update Kyc
export const adminKycUser = async (data: { email: string, kyc: { status: "accepted" | "pending" | "rejected" } }) => {
    const response = await axiosAdmin.patch(`users/adminUpdate`, data);
    return response.data;
}

//Get a User Savings
export const adminSavings = async (userId: string) => {
    const response = await axiosAdmin.get(`savings/savings/${userId}`);
    return response.data;
}

//Fetch a user transactions
export const adminUserTransactions = async (data: { page?: string, limit?: string, userId: string, transactionType?: string }) => {
    const response = await axiosAdmin.post(`transactions/getUserTransactions?page=${data.page}&limit=${data.limit}`, data);
    return response.data;
}

//Edit a user details
export const patchUser = async (data: PatchUser) => {
    const response = await axiosAdmin.patch(`users/adminUpdate`, data);
    return response.data;
}

//Get all accounts
export const getAccounts = async (page?: string, limit?: string) => {
    const response = await axiosAdmin.get(`accounts/allAccounts?page=${page}&limit=${limit}`);
    return response.data;
}

//Edit Accounts
export const editAccounts = async (data: EditAccount) => {
    const response = await axiosAdmin.patch(`accounts/edit`, data);
    return response.data;
}

//Delete Accounts
export const deleteAccount = async (accountId: string) => {
    const response = await axiosAdmin.delete(`accounts/delete/${accountId}`);
    return response.data;
}

//Create Account
export const createAccount = async (data: { fullName: string, accountNumber: string, bankName: string }) => {
    const response = await axiosAdmin.post(`accounts/create`, data);
    return response.data;
}

//Get all savings
export const getSavings = async (page?: string, limit?: string) => {
    const response = await axiosAdmin.get(`savings/getSavings?page=${page}&limit=${limit}`);
    return response.data;
}

//Delete Savings
export const deleteSavings = async (savingsId: string) => {
    const response = await axiosAdmin.delete(`savings/delete/${savingsId}`);
    return response.data;
}

//Get all activities
export const getActivities = async (page?: string, limit?: string) => {
    const response = await axiosAdmin.get(`activities/get?page=${page}&limit=${limit}`);
    return response.data;
}

//Delete Activity
export const deleteActivity = async (activityId: string) => {
    const response = await axiosAdmin.delete(`activities/delete/${activityId}`);
    return response.data;
}

//Get all Card Requests
export const getCardRequests = async (page?: string, limit?: string) => {
    const response = await axiosAdmin.get(`cards/allRequests?page=${page}&limit=${limit}`);
    return response.data;
}

//Update a Card Request
export const updateCardRequest = async (data: { requestId: string, status: string }) => {
    const response = await axiosAdmin.patch(`cards/update`, data);
    return response.data;
}

//Delete a Card Request
export const deleteCardRequest = async (requestId: string) => {
    const response = await axiosAdmin.delete(`cards/delete/${requestId}`);
    return response.data;
}

//Get Admins
export const getAdmins = async () => {
    const response = await axiosAdmin.get(`admins/getAdmins`);
    return response.data;
}

//Create Admin
export const createAdmin = async (data: { email: string, password: string, role: "admin" | "super_admin" }) => {
    const response = await axiosAdmin.post(`admins/create`, data);
    return response.data;
}

//Edit an Admin
export const adminPatch = async (data: PatchAdmin) => {
    const response = await axiosAdmin.patch(`admins/updateAdmin`, data);
    return response.data;
}

//Get Current Logged In Admin
export const getAdminDetails = async () => {
    const response = await axiosAdmin.get(`admins/getDetails`);
    return response.data;
}

//Pin Update
export const updatePins = async (data: { email: string, taxPin?: string, tacPin?: string, insurancePin?: string }) => {
    const response = await axiosAdmin.patch(`users/pinUpdate`, data);
    return response.data;
}

//Get a user by userName, accountId, emails
export const getUser = async (value: string) => {
    const response = await axiosAdmin.get(`users/getUser/${value}`);
    return response.data;
}

//Create a new admin transaction
export const createAdminTransaction = async (data: AdminTransaction) => {
    const response = await axiosAdmin.post(`transactions/createUserTransaction`, data);
    return response.data;
}

//Get all Deposit Requests
export const fetchDepositRequests = async (page?: string, limit?: string) => {
    const response = await axiosAdmin.get(`deposits/getAll?page=${page}&limit=${limit}`);
    return response.data;
}

//Approve and Edit Deposit Request
export const editDepositRequest = async (data: EditDepositRequest) => {
    const response = await axiosAdmin.patch(`deposits/approve`, data);
    return response.data;
}

//Delete Deposit Request
export const deleteDepositRequest = async (id: string) => {
    const response = await axiosAdmin.delete(`deposits/delete/${id}`);
    return response.data;
}