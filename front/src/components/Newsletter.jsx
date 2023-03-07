import {
  Container,
  Title,
  Description,
  InputContainer,
  Input,
  Button,
} from "../styles/Newsletter.styles";
import MailIcon from "@mui/icons-material/Mail";

const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>Get updated from our last product.</Description>
      <InputContainer>
        <Input placeholder="Your email" />
        <Button>
          <MailIcon />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
