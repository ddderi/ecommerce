import { useEffect } from "react";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import {
  Route,
  useNavigate,
  Outlet,
  ScrollRestoration,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Announcement from "./components/Announcement";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="account" element={<Account />} />
      <Route path="cart" element={<Cart />} />
      <Route path="products" element={<ProductList />}>
        <Route path="search" element={<Product />} />
      </Route>
      <Route path="products/:id" element={<Product />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
