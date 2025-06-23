import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "sonner";

// Components
import Footer from "./components/common/Footer";
import SubAdminDashboard from "./pages/SubAdmin";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ProfileSettings = lazy(() => import("./components/ui/ProfileSettings"));
const Marketplace = lazy(() => import("./pages/Marketplace"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Profile = lazy(() => import("./pages/Profile"));
const Suppliers = lazy(() => import("./pages/Suppliers"));
const SupplierDetails = lazy(() => import("./pages/SupplierDetails"));
const Chat = lazy(() => import("./pages/Chat"));
const Chats = lazy(() => import("./pages/Chats"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Blogs = lazy(() => import("./pages/Blogs"));
const BlogDetails = lazy(() => import("./pages/BlogDetails"));
const Cart = lazy(() => import("./components/product/Cart"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));


function App() {
  return (
    <>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center text-gray-600">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/account/:tab" element={<ProfileSettings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products" element={<Marketplace />} />
          <Route path="/products/:tab" element={<Marketplace />} />
          <Route path="/products/:tab/:subtab" element={<Marketplace />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/suppliers/:id" element={<SupplierDetails />} />
          <Route path="/messages" element={<Chats />} />
          <Route path="/messages/:id" element={<Chat />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/sub-admin" element={<SubAdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster richColors position="top-right"/>
      <Footer />
    </>
  );
}

export default App;
