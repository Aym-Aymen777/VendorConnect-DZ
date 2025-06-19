import {Routes,Route} from "react-router-dom";
import {Toaster} from "react-hot-toast";

//components
import Footer from "./components/common/Footer";


//pages
import  Home  from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {
  return (
    <>
      { <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

      </Routes> }
      <Toaster/>
      <Footer />
    </>
  )
}

export default App;
