import {Routes,Route} from "react-router-dom";
import {Toaster} from "react-hot-toast";

//components
import Footer from "./components/common/Footer";


//pages
import  Home  from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfileSettings from "./components/ui/ProfileSettings";
import Marketplace from "./pages/Marketplace";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import Suppliers from "./pages/Suppliers";
import SupplierDetails from "./pages/SupplierDetails";
import Chat from "./pages/Chat";
import Chats from "./pages/Chats";
import Dashboard from "./pages/Dashboard";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import Cart from "./components/product/Cart";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <>
      { <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/account/:tab" element={<ProfileSettings/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/products" element={<Marketplace/>} />
        <Route path="/products/:tab" element={<Marketplace/>} />
        <Route path="/products/:tab/:subtab" element={<Marketplace/>} />
        <Route path="/product/:id" element={<ProductDetails/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/suppliers" element={<Suppliers/>} />
        <Route path="/suppliers/:id" element={<SupplierDetails/>} />
        <Route path="/messages" element={<Chats/>} />
        <Route path="/messages/:id" element={<Chat/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/blogs" element={<Blogs/>} />
        <Route path="/blogs/:id" element={<BlogDetails/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="*" element={<NotFound/>} />



        

      </Routes> }
      <Toaster/>
      <Footer />
    </>
  )
}

export default App;
