import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: coral;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Wrapper = styled.div`
  padding: 20px;
  width: 40%;
  background-color: white;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

export const Input = styled.input`
  flex: 1;
  min-width: 51%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
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
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;
