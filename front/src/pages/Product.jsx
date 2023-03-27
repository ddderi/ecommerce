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
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../services/UserRequest";
import { useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { getProduct } from "../services/UserRequest";
import { updateCart } from "../redux/productSlice";
import { setMessageError, cancelMessage } from "../redux/authSlice";

const Product = () => {
  const sizeRef = useRef();
  const [selectedColor, setSelectedColor] = useState("black");
  const [quantity, setQuantity] = useState(1);
  const [selectProduct, setSelectProduct] = useState();
  const dispatch = useDispatch();

  let params = useParams();
  const navigate = useNavigate();

  // const getSelectProduct = async (id) => {
  //   try {
  //     const result = await getProduct(id);

  //     if (result) {
  //       setSelectProduct(result.data.product);
  //     }

  //     return result;
  //   } catch (error) {
  //     console.log(error);
  //     if (error.response.status === 404) {
  //       return navigate("/404");
  //     }
  //   }
  // };

  useEffect(() => {
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

    const selectedProduct = (id) => {
      getSelectProduct(id);
    };

    const id = params.id;
    selectedProduct(id);
  }, [params.id, navigate]);

  const changeQuantity = (value) => {
    if (value === "plus") {
      setQuantity(quantity + 1);
    } else if (value === "moins" && quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const addToTheCart = async () => {
    dispatch(cancelMessage());
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
      dispatch(updateCart());
      // console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        dispatch(
          setMessageError("Your token is expired, refresh or reconnect.")
        );
      }
    }
  };

  const handleColorClick = (data) => {
    setSelectedColor(data);
  };

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
