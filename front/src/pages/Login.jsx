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
} from "../styles/LoginStyles";
import { auth, db } from "../config/firebase-config";
import "firebase/auth";
import firebase from "firebase/compat/app";
import { LoginUser } from "../requestUser/UserRequest.jsx";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [signin, setSignin] = useState(false);
  const [message, setMessage] = useState(null);

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
      console.log(result);
      return result;
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
            <Form onSubmit={(e) => onSubmit(e)}>
              <Input ref={emailRef} placeholder="Email" />
              <Input ref={passwordRef} placeholder="Password" />
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
