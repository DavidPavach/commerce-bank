import { Outlet, BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Layouts
import HomePageLayout from '@/Layouts/HomeLayout';
import UserLayout from '@/Layouts/UserLayout';

//Pages
import HomePage from '@/pages/HomePage';
import Create from '@/pages/Auth';
import Verification from '@/pages/Verification';
import Validate from '@/pages/Validate';
import Kyc from '@/pages/Kyc';
import Pin from '@/pages/Pin';
import Pending from '@/pages/Pending';

// User pages
import Dashboard from '@/pages/User/Dashboard';
import Transfer from '@/pages/User/Transfer';
import Transaction from '@/pages/User/Transaction';
import Savings from '@/pages/User/Savings';
import Exchange from '@/pages/User/Exchange';
import Beneficiary from '@/pages/User/Beneficiary';
import Cryptocurrency from '@/pages/User/Cryptocurrency';
import Loan from '@/pages/User/Loan';
import History from '@/pages/User/History';
import Profile from '@/pages/User/Profile';

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

                {/* User Routes */}
                <Route path="/user" element={<User />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="transfer" element={<Transfer />} />
                    <Route path="transaction/:transactionId" element={<Transaction />} />
                    <Route path="savings" element={<Savings />} />
                    <Route path="exchange" element={<Exchange />} />
                    <Route path="beneficiaries" element={<Beneficiary />} />
                    <Route path="cryptocurrency" element={<Cryptocurrency />} />
                    <Route path="loan" element={<Loan />} />
                    <Route path="history" element={<History />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default AppRoutes;