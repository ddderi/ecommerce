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
} from "../styles/RegisterStyles";

const Register = () => {
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="Email" />
          <Input placeholder="Password" />
          <Input placeholder="Password confirmation" />
          <Agreement>
            <Checkbox />
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <WrapperButton>
            <Button>CREATE</Button>
            <Button>CONNECT WITH GOOGLE</Button>
          </WrapperButton>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
