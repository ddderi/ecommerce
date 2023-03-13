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
} from "../styles/Cart.styles";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Cart = () => {
  return (
    <Container>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your whishlist(1)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            <Product>
              <ProductDetail>
                <Image src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ab3ec819-7808-4cd8-ba1c-b1e9386c8540/air-jordan-1-low-shoes-v2kdOZ.png"></Image>
                <Details>
                  <ProductName>
                    <b>Product:</b> NIKE 350
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> 13468468454561
                  </ProductId>
                  <ProductColor color="black" />
                  <ProductSize>
                    <b>Size:</b> 37.5
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <AddIcon style={{ cursor: "pointer" }} />
                  <ProductAmount>2</ProductAmount>
                  <RemoveIcon style={{ cursor: "pointer" }} />
                </ProductAmountContainer>
                <ProductPrice>$30</ProductPrice>
              </PriceDetail>
            </Product>
            <Hr />
            <Product>
              <ProductDetail>
                <Image src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ab3ec819-7808-4cd8-ba1c-b1e9386c8540/air-jordan-1-low-shoes-v2kdOZ.png"></Image>
                <Details>
                  <ProductName>
                    <b>Product:</b> NIKE 350
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> 13468468454561
                  </ProductId>
                  <ProductColor color="black" />
                  <ProductSize>
                    <b>Size:</b> 37.5
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <AddIcon style={{ cursor: "pointer" }} />
                  <ProductAmount>2</ProductAmount>
                  <RemoveIcon style={{ cursor: "pointer" }} />
                </ProductAmountContainer>
                <ProductPrice>$ 30</ProductPrice>
              </PriceDetail>
            </Product>
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ 80</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ 80</SummaryItemPrice>
            </SummaryItem>
            <Button>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Cart;
