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
} from "../styles/RegisterStyles";
import { SignUpUser } from "../requestUser/UserRequest.jsx";
import { auth, db } from "../config/firebase-config";
import "firebase/auth";
import firebase from "firebase/compat/app";

const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConRef = useRef();

  const [message, setMessage] = useState(null);

  // const regNewUser = async (data) => {
  //   try {
  //     const newRegUser = await SignUpUser(data, setMessage);
  //     console.log(newRegUser);
  //     return newRegUser;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log({
    //   email: emailRef.current.value,
    //   password: passwordRef.current.value,
    // });
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const newRegUser = await SignUpUser(data);
      setMessage(newRegUser.data.message);
      console.log(newRegUser);
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
        <h3>{message}</h3>
        <Form onSubmit={(e) => onSubmit(e)}>
          <Input ref={emailRef} placeholder="Email" />
          <Input ref={passwordRef} type="password" placeholder="Password" />
          <Input
            ref={passwordConRef}
            type="password"
            placeholder="Password confirmation"
          />
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
