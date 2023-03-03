import { Checkbox } from "@mui/material";
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

const Login = () => {
  return (
    <Container>
      <Wrapper>
        <Title>LOGIN</Title>
        <Form>
          <Input placeholder="Email" />
          <Input placeholder="Password" />
          <WrapperButton>
            <Button>LOG-IN</Button>
            <Button>CONNECT WITH GOOGLE</Button>
          </WrapperButton>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
