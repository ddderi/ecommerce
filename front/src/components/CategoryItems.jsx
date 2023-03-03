import React from "react";
import {
  Container,
  Image,
  Info,
  Title,
  Button,
} from "../styles/CategoryItemsStyles";

const CategoryItems = ({ data }) => {
  return (
    <Container>
      <Image src={data.img} />
      <Info>
        <Title>{data.title}</Title>
        <Button>SHOP NOW</Button>
      </Info>
    </Container>
  );
};

export default CategoryItems;
