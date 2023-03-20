import { useRef } from "react";
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
  ContainerError,
  Link,
  LinkPassword,
} from "../styles/Login.styles";
import { auth } from "../config/firebase-config";
import "firebase/auth";
import firebase from "firebase/compat/app";
import { resendEmailVerification } from "../services/UserRequest.jsx";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility/index.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  setLoading,
  setUser,
  setMessage,
  setLinkInfo,
  setRedirectRegister,
} from "../redux/authSlice";
import { Checkbox } from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { Icon, passwordType } = useTogglePasswordVisibility();
  const linkInfo = useSelector((state) => state.authUser.linkInfo);
  const errorMessage = useSelector((state) => state.authUser.message);
  const userLogged = useSelector((state) => state.authUser.userLogged);
  const loading = useSelector((state) => state.authUser.loading);
  const redirectLinkRegister = useSelector(
    (state) => state.authUser.redirectRegister
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const LoginUser = async (user) => {
  //   try {
  //     if (user) {
  //       const addUser = await loggingUser(user.email, user.password);

  //       if (addUser.status === "created") {
  //         setLoggedIn(true);
  //         setMessage(addUser.message);
  //         // setUser(addUser.user);
  //         setTimeout(() => {
  //           navigate("/");
  //         }, 2000);
  //         return addUser;
  //       } else if (addUser.status === "unconnected") {
  //         setMessage(addUser.message);
  //         return addUser;
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const onSubmit = async (e) => {
    dispatch(setMessage(null));
    dispatch(setRedirectRegister(false));
    dispatch(setLinkInfo(false));
    dispatch(setLoading(true));
    e.preventDefault();
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const result = await auth.signInWithEmailAndPassword(
        data.email,
        data.password
      );
      if (!result.user.emailVerified) {
        dispatch(setLoading(false));
        dispatch(setLinkInfo(true));
        dispatch(
          setMessage(
            "Your email account is not verified, you need to verify it before logging-in; resend link "
          )
        );
      } else if (result.user.emailVerified) {
        // auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        emailRef.current.value = "";
        passwordRef.current.value = "";
        console.log(result);
        window.localStorage.setItem(
          "tokenEcom",
          result.user._delegate.accessToken
        );
        window.localStorage.setItem("uid", result.user._delegate.uid);
        window.localStorage.setItem("auth", "true");
        dispatch(
          setUser({
            user: result.user._delegate.email,
            userLogged: true,
            token: result.user._delegate.accessToken,
            uid: result.user._delegate.uid,
          })
        );
        setTimeout(() => {
          navigate("/");
        }, 1000);

        dispatch(setLoading(false));
      }
      console.log(auth.currentUser);
      console.log(result);

      return result;
    } catch (error) {
      dispatch(setLoading(false));
      const wrongpassword = /auth\/wrong-password/;
      const wronguser = /auth\/user-not-found/;
      if (wrongpassword.test(error)) {
        dispatch(setLinkInfo(true));
        dispatch(
          setMessage(
            "You have typed the wrong password, for forgotten password email click "
          )
        );
      } else if (wronguser.test(error)) {
        dispatch(setRedirectRegister(true));
        dispatch(setMessage(`Your email doesn't exist, Join by clicking `));
      }
    }
  };

  const logInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      const authGoogle = await auth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );
      dispatch(
        setUser({
          user: authGoogle.user._delegate.email,
          userLogged: true,
          token: authGoogle.user._delegate.accessToken,
          uid: authGoogle.user._delegate.uid,
        })
      );
      window.localStorage.setItem(
        "tokenEcom",
        authGoogle.user._delegate.accessToken
      );
      window.localStorage.setItem("auth", "true");
      console.log(authGoogle);
      return authGoogle;
    } catch (error) {
      console.log(error);
    }
  };

  const sendEmailVerification = async () => {
    dispatch(setLinkInfo(false));
    dispatch(setMessage(null));
    const data = { email: emailRef.current.value };
    try {
      const result = await resendEmailVerification(data);
      console.log(result);
      if (result.data.success) {
        dispatch(setMessage("Email sent"));
      }

      return result;
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
            <Title>LOGIN</Title>
            {errorMessage !== null ? (
              <ContainerError>
                <Error>
                  {errorMessage}
                  {linkInfo && (
                    <Link onClick={() => sendEmailVerification()}>here</Link>
                  )}
                  {redirectLinkRegister && (
                    <Link onClick={() => navigate("/register")}>here</Link>
                  )}
                </Error>
              </ContainerError>
            ) : (
              <ContainerError></ContainerError>
            )}
            <Form onSubmit={(e) => onSubmit(e)}>
              <InputPassword>
                <Input type="text" ref={emailRef} placeholder="Email" />
              </InputPassword>
              <InputPassword>
                <Input
                  type={passwordType}
                  ref={passwordRef}
                  placeholder="Password"
                />
                <IconWrapper>
                  <Icon></Icon>
                </IconWrapper>
              </InputPassword>
              <Agreement>
                <Checkbox />
                Remember me
              </Agreement>
              <Agreement>
                <LinkPassword>Forgotten password ?</LinkPassword>
              </Agreement>
              <WrapperButton>
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
                {!loading && <Button>LOG-IN</Button>}
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

export default Login;
