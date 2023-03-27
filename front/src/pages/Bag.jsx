import React, { useState, useEffect } from "react";
import {
  Container,
  Wrapper,
  Title,
  Top,
  Bottom,
  TopButton,
  TopTexts,
  TopText,
  Info,
  Summary,
  Product,
  ProductDetail,
  Image,
  Details,
  ProductName,
  ProductId,
  ProductColor,
  ProductSize,
  PriceDetail,
  ProductAmountContainer,
  ProductAmount,
  ProductPrice,
  Hr,
  SummaryItem,
  SummaryItemPrice,
  SummaryTitle,
  SummaryItemText,
  Button,
  EmptyBag,
} from "../styles/Bag.styles";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";

const Bag = ({ setToggleBagWish, items }) => {
  const navigate = useNavigate();
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    let newTotal = 0;
    if (items) {
      items.forEach((data) => {
        newTotal += data.price * data.quantity;
      });
    }
    setSubtotal(newTotal);
  }, [items]);

  console.log(items);
  return (
    <>
      <Container>
        <Wrapper>
          <Title>YOUR BAG</Title>
          <Top>
            <TopButton onClick={() => navigate("/products")}>
              CONTINUE SHOPPING
            </TopButton>
            <TopTexts>
              <TopText>Shopping Bag(2)</TopText>
              <TopText onClick={() => setToggleBagWish(true)}>
                Your wishlist(0)
              </TopText>
            </TopTexts>
            <TopButton type="filled">CHECKOUT NOW</TopButton>
          </Top>
          <Bottom>
            <Info>
              {items &&
                items.map((data) => (
                  <>
                    <Product key={data.id}>
                      <ProductDetail>
                        <Image src={data.image}></Image>
                        <Details>
                          <ProductName>
                            <b>Product:</b> {data.item}
                          </ProductName>
                          <ProductId>
                            <b>ID:</b> {data.id}
                          </ProductId>
                          <ProductColor color={data.color} />
                          <ProductSize>
                            <b>Size:</b> {data.size}
                          </ProductSize>
                        </Details>
                      </ProductDetail>
                      <PriceDetail>
                        <ProductAmountContainer>
                          <AddIcon style={{ cursor: "pointer" }} />
                          <ProductAmount>{data.quantity}</ProductAmount>
                          <RemoveIcon style={{ cursor: "pointer" }} />
                        </ProductAmountContainer>
                        <ProductPrice>$ {data.price}</ProductPrice>
                      </PriceDetail>
                    </Product>
                    <Hr />
                  </>
                ))}
              {!items && <EmptyBag>Your cart is empty...</EmptyBag>}
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>$ {subtotal}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>$ 5.90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>$ 0</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>$ {subtotal + 5.9}</SummaryItemPrice>
              </SummaryItem>
              <Button>CHECKOUT NOW</Button>
            </Summary>
          </Bottom>
        </Wrapper>
      </Container>
    </>
  );
};

export default Bag;
