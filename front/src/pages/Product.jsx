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
  SelectedColor,
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
import { getProduct } from "../services/UserRequest";
import { NotFoundPage } from "./NotFoundPage";

const Product = () => {
  const sizeRef = useRef();
  const [selectedColor, setSelectedColor] = useState("black");
  const [quantity, setQuantity] = useState(1);
  const [selectProduct, setSelectProduct] = useState();
  const [productExists, setProductExists] = useState();

  let params = useParams();
  const navigate = useNavigate();

  const getSelectProduct = async (id) => {
    try {
      const result = await getProduct(id);

      if (result) {
        setSelectProduct(result.data.product);
      }

      return result;
    } catch (error) {
      console.log(error);
      if (error.response.status === 404) {
        return navigate("/404");
      }
    }
  };

  // const getSelectProduct = async (id) => {
  //   try {
  //     const result = await getProduct(id);
  //     console.log(result);
  //     if (result) {
  //       setSelectProduct(result.data.product);
  //     }
  //     // if (!result.response.data.productExists) {
  //     //   return navigate("/404");
  //     // } else if (result.data.productExists) {
  //     //   setSelectProduct(result.data.product);
  //     // }
  //     // setSelectProduct(result.data.product);
  //     return result;
  //   } catch (error) {
  //     // if (result.response.status === 404) {
  //     //   return navigate("/404");
  //     // }
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    const id = params.id;
    selectedProduct(id);
  }, [params.id]);

  const selectedProduct = (id) => {
    getSelectProduct(id);
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
      const uid = window.localStorage.getItem("uid");

      const data = {
        userId: uid,
        id: selectProduct.id,
        price: selectProduct.price,
        item: selectProduct.name,
        quantity: quantity,
        size: sizeRef.current.textContent,
        image: selectProduct.image,
        color: selectedColor,
      };
      const result = await addCart(data);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const handleColorClick = (data) => {
    setSelectedColor(data);
  };

  // if (!selectProduct.color) {
  //   navigate("404");
  // }

  return (
    <>
      {selectProduct ? (
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
                  {selectProduct.color &&
                    selectProduct.color.map((data, index) => {
                      return (
                        <FilterColor
                          key={index}
                          color={data}
                          isSelected={selectedColor === data}
                          onClick={() => handleColorClick(data)}
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
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Product;
