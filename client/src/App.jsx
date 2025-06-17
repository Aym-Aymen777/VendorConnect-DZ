import {Routes,Route} from "react-router-dom";
import {Toaster} from "react-hot-toast";

//components
import Footer from "./components/common/Footer";


//pages
import  Home  from "./pages/Home";


function App() {
  return (
    <>
      { <Routes>
        <Route path="/" element={<Home/>} />
      </Routes> }
      <Toaster/>
      <Footer />
    </>
  )
}

export default App;
