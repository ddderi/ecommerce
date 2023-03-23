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
  Filter,
  FilterContainer,
  FilterTitle,
} from "../styles/ProductInfo.styles";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Newsletter from "../components/Newsletter";
import { useParams, ScrollRestoration, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../services/UserRequest";

const Product = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectProduct, setSelectProduct] = useState();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productSlice.products);

  let params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const id = params.id;
    selectedProduct(id);
  }, [params.id]);

  const selectedProduct = (id) => {
    const product = products.find((product) => product.id === id);
    return setSelectProduct(product);
  };

  const changeQuantity = (value) => {
    if (value === "plus") {
      setQuantity(quantity + 1);
    } else if (value === "moins" && quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const addToTheCart = async () => {
    try {
      const result = await addCart();
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
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
              <Image src={selectProduct.image} />
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
                  <RemoveIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => changeQuantity("moins")}
                  />
                  <Amount>{quantity}</Amount>
                  <AddIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => changeQuantity("plus")}
                  />
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
