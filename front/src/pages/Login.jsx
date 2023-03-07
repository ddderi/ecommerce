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
} from "../styles/Login.styles";
import { auth, db } from "../config/firebase-config";
import "firebase/auth";
import firebase from "firebase/compat/app";
import { LoginUser } from "../services/UserRequest.jsx";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility/index.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, setUser, setError } from "../redux/authSlice";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { Icon, passwordType } = useTogglePasswordVisibility();
  const [signin, setSignin] = useState(false);
  const [message, setMessage] = useState(null);
  const errorMessage = useSelector((state) => state.authUser.error);
  const dispatch = useDispatch();

  console.log(errorMessage);
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
      emailRef.current.value = "";
      passwordRef.current.value = "";
      window.localStorage.setItem("auth", "true");
      // dispatch(setUser({user: result.user._delegate, userLogged: true}))
      console.log(result.user._delegate);
      return result;
    } catch (error) {
      const wrongpassword = /auth\/wrong-password/;
      const wronguser = /auth\/user-not-found/;
      if (wrongpassword.test(error)) {
        dispatch(setError("You have typed the wrong password"));
        console.log("WRONG PASSWORD");
      } else if (wronguser.test(error)) {
        dispatch(setError(`Your email doesn't exist, Join by clicking`));
      }
    }
  };

  // auth/wrong-password
  // auth/user-not-found

  const logInWithGoogle = async (e) => {
    e.preventDefault();

    try {
      const authGoogle = await auth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );
      console.log(authGoogle);
      return authGoogle;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!signin && (
        <Container>
          <Wrapper>
            <Title>LOGIN</Title>
            {errorMessage !== null ? (
              <Error>
                {errorMessage}
                <a href="#"> here</a>
              </Error>
            ) : (
              <Error></Error>
            )}
            <Form onSubmit={(e) => onSubmit(e)}>
              <InputPassword>
                <Input ref={emailRef} placeholder="Email" />
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
              <WrapperButton>
                <Button>LOG-IN</Button>
                <Button type="submit" onClick={(e) => logInWithGoogle(e)}>
                  CONNECT WITH GOOGLE
                </Button>
              </WrapperButton>
            </Form>
          </Wrapper>
        </Container>
      )}
      {signin && (
        <Container>
          <Wrapper>
            <Title>LOGIN WITH GOOGLE</Title>
            <Form onSubmit={() => onSubmit()}>
              <Input ref={emailRef} placeholder="Email" />
              <Input ref={passwordRef} placeholder="Password" />
              <WrapperButton>
                {/* <Button>LOG-IN</Button> */}
                <Button onClick={(e) => logInWithGoogle(e)}>
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
