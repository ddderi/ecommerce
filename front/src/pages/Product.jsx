import {
  Container,
  Wrapper,
  ImgContainer,
  Image,
  InfoContainer,
  Title,
  Desc,
  Price,
  Button,
  AmountContainer,
  Amount,
  AddContainer,
  FilterSizeOption,
  FilterSize,
  FilterColor,
  Filter,
  FilterContainer,
  FilterTitle,
} from "../styles/ProductInfo.styles";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Newsletter from "../components/Newsletter";
import {
  useParams,
  Outlet,
  ScrollRestoration,
  useNavigate,
} from "react-router-dom";
import { popularProducts } from "../data";
import { useState, useEffect } from "react";

const Product = () => {
  const [selectProduct, setSelectProduct] = useState({});
  let params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const id = params.id;
    selectedProduct(id);
  }, [params.id]);

  const selectedProduct = (id) => {
    const product = popularProducts.find(
      (product) => product.id === parseInt(id)
    );
    return setSelectProduct(product);
  };

  return (
    <>
      {selectProduct && (
        <Container>
          <Button type="back" onClick={() => navigate(-1)}>
            back
          </Button>
          <Wrapper>
            <ImgContainer>
              <Image src={selectProduct.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{selectProduct.name}</Title>
              <Desc>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                venenatis, dolor in finibus malesuada, lectus ipsum porta nunc,
                at iaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex,
                eget tristique tortor pretium ut. Curabitur elit justo,
                consequat id condimentum ac, volutpat ornare.
              </Desc>
              <Price>$ {selectProduct.price}</Price>
              <FilterContainer>
                <Filter>
                  <FilterTitle>Color</FilterTitle>
                  {/* <>
                  {selectProduct.color.map((data, index) => {
                    <FilterColor key={index} color={data} />;
                  })}
                </> */}
                  {/* <FilterColor color="black" />
                <FilterColor color="darkblue" />
                <FilterColor color="gray" /> */}
                </Filter>
                <Filter>
                  <FilterTitle>Size</FilterTitle>
                  <FilterSize>
                    <FilterSizeOption>XS</FilterSizeOption>
                    <FilterSizeOption>S</FilterSizeOption>
                    <FilterSizeOption>M</FilterSizeOption>
                    <FilterSizeOption>L</FilterSizeOption>
                    <FilterSizeOption>XL</FilterSizeOption>
                  </FilterSize>
                </Filter>
              </FilterContainer>
              <AddContainer>
                <AmountContainer>
                  <RemoveIcon />
                  <Amount>1</Amount>
                  <AddIcon />
                </AmountContainer>
                <Button>ADD TO CART</Button>
              </AddContainer>
            </InfoContainer>
          </Wrapper>
          <Newsletter />
          <ScrollRestoration />
        </Container>
      )}
    </>
  );
};

export default Product;
