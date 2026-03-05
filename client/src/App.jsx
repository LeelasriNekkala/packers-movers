import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Layout */
import MainLayout from "./components/layout/MainLayout";

/* Public Pages */
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import SignUp from "./pages/public/SignUp";
import Services from "./pages/public/Services";
import QuickQuote from "./pages/public/QuickQuote";
import Prices from "./pages/public/Prices";
import Contacts from "./pages/public/Contacts";

/* User Pages */
import UserDashboard from "./pages/user/UserDashboard";
import RequestService from "./pages/user/RequestService";
import NewInquiry from "./pages/user/NewInquiry";
import ViewOrders from "./pages/user/ViewOrders";

/* Admin Pages */
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddService from "./pages/admin/AddService";
import ViewServices from "./pages/admin/ViewServices";
import ViewQuotes from "./pages/admin/ViewQuotes";
import ViewMessages from "./pages/admin/ViewMessages";

/* Protected Route */
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="quick-quote" element={<QuickQuote />} />
          <Route path="prices" element={<Prices />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

        {/* ================= USER ROUTES ================= */}
        <Route
          path="/user"
          element={
            <ProtectedRoute role="user">
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="request-service" element={<RequestService />} />
          <Route path="new-inquiry" element={<NewInquiry />} />
          <Route path="orders" element={<ViewOrders />} />
        </Route>

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="add-service" element={<AddService />} />
          <Route path="services" element={<ViewServices />} />
          <Route path="quotes" element={<ViewQuotes />} />
          <Route path="messages" element={<ViewMessages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
