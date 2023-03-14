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
  Link,
  ContainerError,
  LinkPassword,
} from "../styles/Register.styles";
import { SignUpUser } from "../services/UserRequest.jsx";
import { auth, db } from "../config/firebase-config";
import "firebase/auth";
import firebase from "firebase/compat/app";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility/index.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  setLoading,
  setUser,
  setMessage,
  setLinkInfo,
} from "../redux/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Register = () => {
  const { Icon, passwordType } = useTogglePasswordVisibility();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConRef = useRef();
  const errorMessage = useSelector((state) => state.authUser.message);
  const userLogged = useSelector((state) => state.authUser.userLogged);
  const linkInfo = useSelector((state) => state.authUser.linkInfo);
  const loading = useSelector((state) => state.authUser.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dispatchDataError = (data) => {
    return dispatch(setMessage(data));
  };

  const changeLinkStateError = (bool) => {
    return dispatch(setLinkInfo(bool));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(setLinkInfo(false));
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConRef.current.value,
    };
    try {
      const newRegUser = await SignUpUser(
        data,
        dispatchDataError,
        changeLinkStateError
      );
      // emailRef.current.value = "";
      // passwordRef.current.value = "";
      // passwordConRef.current.value = "";
      dispatch(setLoading(false));
      return newRegUser;
    } catch (error) {
      dispatch(setLoading(false));
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
      if (authGoogle) {
        window.localStorage.setItem(
          "tokenEcom",
          authGoogle.user._delegate.accessToken
        );
        window.localStorage.setItem("auth", "true");
        dispatch(
          setUser({
            userLogged: true,
            user: authGoogle.additionalUserInfo.profile.name,
          })
        );
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }

      return authGoogle;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {userLogged && <Navigate replace to="/" />}
      {!userLogged && (
        <Container>
          <Wrapper>
            <Title>CREATE AN ACCOUNT</Title>
            {errorMessage !== null ? (
              <ContainerError>
                <Error>
                  {errorMessage}
                  {linkInfo && <Link>here</Link>}
                </Error>
              </ContainerError>
            ) : (
              <ContainerError></ContainerError>
            )}
            <Form onSubmit={(e) => onSubmit(e)}>
              <InputPassword>
                <Input
                  required
                  type="text"
                  ref={emailRef}
                  placeholder="Email"
                />
              </InputPassword>
              <InputPassword>
                <Input
                  required
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
                  required
                  ref={passwordConRef}
                  type={passwordType}
                  placeholder="Password confirmation"
                />
                <IconWrapper>
                  <Icon></Icon>
                </IconWrapper>
              </InputPassword>
              <Agreement>
                <Checkbox required />
                By creating an account, I consent to the processing of my
                personal data in accordance with the <b>PRIVACY POLICY</b>
              </Agreement>
              <WrapperButton>
                {" "}
                {loading && (
                  <Button disabled={loading ? true : false}>
                    <ClipLoader
                      color={"white"}
                      loading={loading}
                      // cssOverride={override}
                      size={15}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </Button>
                )}
                {!loading && <Button>CREATE</Button>}
                <Button type="submit" onClick={(e) => logInWithGoogle(e)}>
                  CONNECT WITH GOOGLE
                </Button>
              </WrapperButton>
            </Form>
          </Wrapper>
        </Container>
      )}
    </>
  );
};

export default Register;
