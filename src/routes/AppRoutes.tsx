import { Outlet, BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Layouts
import HomePageLayout from '@/Layouts/HomeLayout';
import UserLayout from '@/Layouts/UserLayout';
import AdminLayout from '@/Layouts/AdminLayout';

//Pages
import HomePage from '@/pages/HomePage';
import Create from '@/pages/Auth';
import Verification from '@/pages/Verification';
import Validate from '@/pages/Validate';
import Kyc from '@/pages/Kyc';
import Pin from '@/pages/Pin';
import Pending from '@/pages/Pending';
import NotFound from '@/components/Not-Found';

// User pages
import Dashboard from '@/pages/User/Dashboard';
import Transfer from '@/pages/User/Transfer';
import Transaction from '@/pages/User/Transaction';
import Savings from '@/pages/User/Savings';
import Exchange from '@/pages/User/Exchange';
import Cryptocurrency from '@/pages/User/Cryptocurrency';
import Loan from '@/pages/User/Loan';
import History from '@/pages/User/History';
import Profile from '@/pages/User/Profile';
import Card from '@/pages/User/Card';
import Deposit from '@/pages/User/Deposit';
import Support from '@/pages/User/Support';

// Admin Pages
import Operations from '@/pages/Operations';
import AdminTransactions from '@/pages/Admin/Transactions';
import AdminUsers from '@/pages/Admin/Users';
import AdminAccounts from '@/pages/Admin/Accounts';
import AdminSavings from '@/pages/Admin/Savings';
import AdminActivities from '@/pages/Admin/Activities';
import AdminCardRequest from '@/pages/Admin/CardRequest';
import AdminStaff from '@/pages/Admin/Staff';
import AdminProfile from '@/pages/Admin/Profile';
import AdminMessages from '@/pages/Admin/Messages';
import AdminNotifications from '@/pages/Admin/Notifications';

const Home = () => (
    <HomePageLayout>
        <Outlet />
    </HomePageLayout>
)

const User = () => (
    <UserLayout>
        <Outlet />
    </UserLayout>
)

const Admin = () => (
    <AdminLayout>
        <Outlet />
    </AdminLayout>
)


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route element={<Home />}>
                    <Route path="/" element={<HomePage />} />
                </Route>

                {/* Page Routes */}
                <Route path="/auth" element={<Create />} />
                <Route path="/verification" element={<Verification />} />
                <Route path="/validate" element={<Validate />} />
                <Route path="/kyc" element={<Kyc />} />
                <Route path="/pin" element={<Pin />} />
                <Route path="/pending" element={<Pending />} />
                <Route path="*" element={<NotFound />} />

                {/* User Routes */}
                <Route path="/user" element={<User />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="transfer" element={<Transfer />} />
                    <Route path="transaction/:transactionId" element={<Transaction />} />
                    <Route path="savings" element={<Savings />} />
                    <Route path="exchange" element={<Exchange />} />
                    <Route path="cryptocurrency" element={<Cryptocurrency />} />
                    <Route path="loan" element={<Loan />} />
                    <Route path="history" element={<History />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="cards" element={<Card />} />
                    <Route path="deposit" element={<Deposit />} />
                    <Route path="support" element={<Support />} />
                </Route>

                {/* Admin Authentication */}
                <Route path="/operations" element={<Operations />} />

                <Route path="/admin" element={<Admin />}>
                    <Route path="transactions" element={<AdminTransactions />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="accounts" element={<AdminAccounts />} />
                    <Route path="savings" element={<AdminSavings />} />
                    <Route path="activities" element={<AdminActivities />} />
                    <Route path="card" element={<AdminCardRequest />} />
                    <Route path="admins" element={<AdminStaff />} />
                    <Route path="profile" element={<AdminProfile />} />
                    <Route path="messages" element={<AdminMessages />} />
                    <Route path="notifications" element={<AdminNotifications />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default AppRoutes;