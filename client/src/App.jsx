import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "sonner";

// Components
import Footer from "./components/common/Footer";
import SubAdminDashboard from "./pages/SubAdmin";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AddProduct from "./pages/AddProduct";
import { useAuthCheck } from "./hooks/useAuthCheck";
import EditProduct from "./pages/EditProduct";

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
const CreateStore = lazy(() => import("./pages/CreateStore"));

function App() {
  const { user } = useAuthCheck();

 
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
          <Route path="/account/:tab" element={user?<ProfileSettings />:<Login/>} />
          <Route path="/profile" element={user?<Profile />:<Login/>} />
          <Route path="/products" element={user?<Marketplace />:<Login/>} />
          <Route path="/products/:tab" element={user?<Marketplace />:<Login/>} />
          <Route path="/products/:tab/:subtab" element={user?<Marketplace />:<Login/>} />
          <Route path="/product/:id" element={user?<ProductDetails />:<Login/>} />
          <Route path="/product/add" element={user && user.role === "supplier" ? <AddProduct /> : <NotFound />} />
          <Route path="/product/update/:id" element={user && user.role === "supplier" ? <EditProduct/> : <NotFound />} />
          <Route path="/cart" element={user&&<Cart />} />
          <Route path="/suppliers" element={user&&<Suppliers />} />
          <Route path="/suppliers/:id" element={user&&<SupplierDetails />} />
          <Route path="/messages" element={user&&<Chats />} />
          <Route path="/messages/:id" element={user&&<Chat />} />
          <Route path="/dashboard" element={user && user.role === "supplier" ? <Dashboard /> : <NotFound />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/admin" element={user && user.role === "admin" ? <Admin /> : <NotFound />} />
          <Route path="/sub-admin" element={user && user.role === "sub-admin" ? <SubAdminDashboard /> : <NotFound />} />
          <Route path="/create-store" element={user&&<CreateStore/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster richColors position="top-right"/>
      <Footer />
    </>
  );
}

export default App;
