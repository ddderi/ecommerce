import styled from "styled-components";
import { mobile } from "./responsive";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: coral;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InputPassword = styled.div`
  flex: 1;
  min-width: 51%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  letter-spacing: 0.25em;
  padding: 10px;
`;

export const IconWrapper = styled.div`
  position: absolute;
  bottom: 25%;
  right: 10px;
`;

export const Wrapper = styled.div`
  padding: 20px;
  width: 40%;
  background-color: white;
  ${mobile({ width: "80%" })}
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

export const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const WrapperButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

export const ContainerError = styled.div`
  height: 7vh;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Error = styled.h3`
  text-align: center;
`;

export const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

export const Link = styled.a`
  cursor: pointer;
  text-decoration: underline;
`;

export const LinkPassword = styled.a`
  /* font-size: 1.17em;
  font-weight: bold; */
  cursor: pointer;
  text-decoration: underline;
  padding-left: 42px;
`;
