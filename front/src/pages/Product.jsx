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
  FilterColor,
} from "../styles/ProductInfo.styles";
import React from "react";

import Newsletter from "../components/Newsletter";
import { useParams, ScrollRestoration, useNavigate } from "react-router-dom";
import { useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../services/UserRequest";
import { useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Product = memo(() => {
  const sizeRef = useRef();
  const colorRef = useRef();
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

  // const changeQuantity = useCallback(
  //   (value) => {
  //     setQuantity((prevQuantity) => {
  //       if (value === "plus") {
  //         return prevQuantity + 1;
  //       } else if (value === "moins" && prevQuantity > 0) {
  //         return prevQuantity - 1;
  //       } else {
  //         return prevQuantity;
  //       }
  //     });
  //   },
  //   [quantity]
  // );

  console.log(selectProduct);

  const addToTheCart = async () => {
    try {
      const uid = window.localStorage.getItem("uid");

      const data = {
        userId: uid,
        id: selectProduct.id,
        price: selectProduct.price,
        item: selectProduct.name,
        quantity: quantity,
        // quantity: quantityRef.current.value,
        size: sizeRef.current.textContent,
        // price: selectProduct.price,
        image: selectProduct.image,
        color: colorRef.current.value,
      };
      const result = await addCart(data);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const handleColorClick = (ref, data) => {
    console.log(ref);
    console.log(data);
    ref.current.value = data;
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
                  {selectProduct.color.map((data, index) => {
                    return (
                      <FilterColor
                        ref={colorRef}
                        key={index}
                        color={data}
                        onClick={() => handleColorClick(colorRef, data)}
                      />
                    );
                  })}
                </Filter>
                <Filter>
                  <FilterTitle>Size</FilterTitle>
                  <FilterSize>
                    <FilterSizeOption ref={sizeRef}>XS</FilterSizeOption>
                    <FilterSizeOption ref={sizeRef}>S</FilterSizeOption>
                    <FilterSizeOption ref={sizeRef}>M</FilterSizeOption>
                    <FilterSizeOption ref={sizeRef}>L</FilterSizeOption>
                    <FilterSizeOption ref={sizeRef}>XL</FilterSizeOption>
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
                <Button onClick={() => addToTheCart()}>ADD TO CART</Button>
              </AddContainer>
            </InfoContainer>
          </Wrapper>
          <Newsletter />
          <ScrollRestoration />
        </Container>
      )}
    </>
  );
});

export default Product;
