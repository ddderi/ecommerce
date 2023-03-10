import styled from "styled-components";
import { mobile } from "./responsive";

export const Container = styled.div`
  height: 60px;
  ${mobile({
    height: "60px",
    display: "flex",
    justifyContent: "center",
  })};
`;

export const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;

  align-items: center;
  ${mobile({
    padding: "0px 10px",
    justifyContent: "space-around",
    width: "100%",
  })};
`;

export const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({ display: "none" })};
`;

export const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })};
`;

export const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ marginLeft: "5px" })};
`;

export const Input = styled.input`
  border: none;
  &:focus {
    outline: none;
  }
  ${mobile({ width: "50px" })};
`;

export const Logo = styled.h1`
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  ${mobile({ fontSize: "24px" })};
`;

export const Center = styled.div`
  flex: 1;
`;
export const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ justifyContent: "center", flex: "2" })};
`;

export const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })};
`;
