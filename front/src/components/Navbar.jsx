import React, { useEffect, useCallback } from "react";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import {
  Container,
  Wrapper,
  Left,
  Center,
  Right,
  Language,
  SearchContainer,
  Input,
  Logo,
  MenuItem,
} from "../styles/Navbar.styles";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMessage } from "../redux/authSlice";
import { useSelector } from "react-redux";
import "firebase/auth";
import { auth } from "../config/firebase-config";
import { logout } from "../redux/authSlice";
import { getProducts } from "../services/UserRequest";
import { setProducts, setCart } from "../redux/productSlice";
import { getCart } from "../services/UserRequest";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userConnected = useSelector((state) => state.authUser.userLogged);
  const userCart = useSelector((state) => state.productSlice.cart);

  const cartLength = () => {
    let number = 0;
    userCart.map((data) => {
      console.log(data.quantity);
      number += data.quantity;
    });
    return number;
  };

  const fetchProducts = async () => {
    try {
      const result = await getProducts();
      dispatch(setProducts(result.data.products));
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCart = async () => {
    try {
      console.log("hgappening");
      const uid = window.localStorage.getItem("uid");
      const data = await getCart(uid);
      console.log(data.data.cart.items);
      console.log("test");
      dispatch(setCart(data.data.cart.items));
      // setItems(data.data.cart.items);
      return data;
    } catch (error) {
      console.log();
    }
  };

  const loggedUserOut = useCallback(async () => {
    try {
      const logOutUser = await auth.signOut();
      dispatch(logout());
      window.localStorage.removeItem("auth");
      window.localStorage.removeItem("tokenEcom");
      window.localStorage.removeItem("uid");
      return logOutUser;
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchCart();
    console.log("cart useffect trigger");
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        const tokenExpirationTime = idTokenResult.expirationTime;
        const currentTime = Date.now(); // Convert to seconds
        const currentToken = window.localStorage.getItem("tokenEcom");
        if (idTokenResult.token !== currentToken) {
          window.localStorage.setItem("tokenEcom", idTokenResult.token);
        }
        // console.log(tokenExpirationTime);
        // console.log(currentTime);
        // 1 heure
        if (tokenExpirationTime < currentTime) {
          loggedUserOut();
        }
      }
    });
    return unsubscribe;
  }, [loggedUserOut]);

  useEffect(() => {
    dispatch(setMessage(null));
  }, [dispatch, location]);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <SearchIcon style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo onClick={() => navigate("/")}>E-com</Logo>
        </Center>
        <Right>
          {!userConnected && (
            <>
              <MenuItem onClick={() => navigate("/products")}>
                PRODUCTS
              </MenuItem>
              <MenuItem onClick={() => navigate("/register")}>
                REGISTRATION
              </MenuItem>
              <MenuItem onClick={() => navigate("/login")}>SIGNIN</MenuItem>
            </>
          )}
          {userConnected && (
            <>
              <MenuItem onClick={() => loggedUserOut()}>DISCONNECT</MenuItem>
              <MenuItem onClick={() => navigate("/products")}>
                PRODUCTS
              </MenuItem>
              <MenuItem onClick={() => navigate("/account")}>ACCOUNT</MenuItem>
            </>
          )}
          <MenuItem>
            <Badge badgeContent={cartLength()} color="primary">
              <ShoppingCartOutlinedIcon onClick={() => navigate("/cart")} />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
