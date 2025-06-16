import {Routes,Route} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";


function App() {
  return (
    <>
    <Header/>
      {/* <Routes>
        <Route path="/login" element={!user ? <LoginPage/> : <Navigate to={"/"}/> } />
        <Route path="/signup" element={!user ? <SignupPage/> : <Navigate to={"/"}/> } />
      </Routes> */}
      <Toaster/>
      <Footer />
    </>
  )
}

export default App;
