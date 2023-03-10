import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
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

const Account = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const userLogged = useSelector((state) => state.authUser.userLogged);

  return (
    <>
      {userLogged && (
        <Container>
          <Wrapper>
            <Title>ACCOUNT DETAILS</Title>
            <Form>
              <InputPassword>
                <Input type="text" ref={emailRef} placeholder="Email" />
              </InputPassword>
              <InputPassword>
                <Input ref={passwordRef} placeholder="Password" />
                <IconWrapper>{/* <Icon></Icon> */}</IconWrapper>
              </InputPassword>
              <WrapperButton>
                {/* {loading && (
                  <Button disabled={loading ? true : false}>
                    <ClipLoader
                      color={"white"}
                      loading={loading}
                      // cssOverride={override}
                      size={15}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </Button> */}
                {/* )}
                {!loading && <Button>LOG-IN</Button>}
                <Button type="submit" onClick={(e) => logInWithGoogle(e)}>
                  CONNECT WITH GOOGLE
                </Button> */}
              </WrapperButton>
            </Form>
          </Wrapper>
        </Container>
      )}
      {!userLogged && <Navigate replace to="/home" />}
    </>
  );
};

export default Account;
