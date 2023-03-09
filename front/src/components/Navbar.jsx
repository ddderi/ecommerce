import React, { useEffect } from "react";
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
import { auth, db } from "../config/firebase-config";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userConnected = useSelector((state) => state.authUser.userLogged);

  const loggedUserOut = async () => {
    try {
      const logOutUser = await auth.signOut();
      dispatch(logout());
      window.localStorage.removeItem("auth");
      window.localStorage.removeItem("tokenEcom");
      return logOutUser;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(setMessage(null));
  }, [dispatch, location]);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input />
            <SearchIcon style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo onClick={() => navigate("/home")}>E-com</Logo>
        </Center>
        <Right>
          {!userConnected && (
            <>
              <MenuItem onClick={() => navigate("/register")}>
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
              <MenuItem onClick={() => navigate("/register")}>
                PRODUCTS
              </MenuItem>
              <MenuItem onClick={() => navigate("/account")}>ACCOUNT</MenuItem>
            </>
          )}
          <MenuItem>
            <Badge badgeContent={0} color="primary">
              <ShoppingCartOutlinedIcon onClick={() => navigate("/cart")} />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
