import { Checkbox } from "@mui/material";
import { useState, useRef } from "react";
import {
  Container,
  Wrapper,
  Title,
  Form,
  Input,
  Agreement,
  Button,
  WrapperButton,
  InputPassword,
  IconWrapper,
  Error,
} from "../styles/Register.styles";
import { SignUpUser } from "../services/UserRequest.jsx";
import { auth, db } from "../config/firebase-config";
import "firebase/auth";
import firebase from "firebase/compat/app";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility/index.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, setUser, setMessage } from "../redux/authSlice";

const Register = () => {
  const { Icon, passwordType } = useTogglePasswordVisibility();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConRef = useRef();
  const errorMessage = useSelector((state) => state.authUser.message);
  const dispatch = useDispatch();

  const dispatchDataError = (data) => {
    return dispatch(setMessage(data));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const newRegUser = await SignUpUser(data, dispatchDataError);
      return newRegUser;
    } catch (error) {
      console.log(error);
    }
  };

  const logInWithGoogle = async (e) => {
    e.preventDefault();

    try {
      const authGoogle = await auth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );
      console.log(authGoogle);
      // if (authGoogle) {
      //   window.localStorage.setItem("auth", "true");
      //   dispatch(
      //     setUser({
      //       userLogged: true,
      //       user: authGoogle.additionalUserInfo.profile.name,
      //     })
      //   );
      //   setTimeout(() => {
      //     navigate("/");
      //   }, 1000);
      // }

      return authGoogle;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        {errorMessage !== null ? (
          <Error>{errorMessage}</Error>
        ) : (
          <Error></Error>
        )}
        <Form onSubmit={(e) => onSubmit(e)}>
          <InputPassword>
            <Input ref={emailRef} placeholder="Email" />
          </InputPassword>
          <InputPassword>
            <Input
              ref={passwordRef}
              type={passwordType}
              placeholder="Password"
            />
            <IconWrapper>
              <Icon></Icon>
            </IconWrapper>
          </InputPassword>
          <InputPassword>
            <Input
              ref={passwordConRef}
              type={passwordType}
              placeholder="Password confirmation"
            />
            <IconWrapper>
              <Icon></Icon>
            </IconWrapper>
          </InputPassword>
          <Agreement>
            <Checkbox />
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <WrapperButton>
            <Button>CREATE</Button>
            <Button type="submit" onClick={(e) => logInWithGoogle(e)}>
              CONNECT WITH GOOGLE
            </Button>
          </WrapperButton>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
