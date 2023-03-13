import { useEffect } from "react";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Announcement from "./components/Announcement";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Announcement />
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
