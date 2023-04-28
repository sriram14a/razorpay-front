import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Products } from "./products";
import { Cart } from "./cart";
import { Register } from "./register";
import { Login } from "./login";
import { ForgotPassword } from "./forgotpassword";

function App() {
  return (
    <div className="App">
      {/* <Navbar/> */}
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;
