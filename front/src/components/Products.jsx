import { Container } from "../styles/Products.styles";
import Product from "./Product";
import { useSelector } from "react-redux";

const Products = () => {
  const products = useSelector((state) => state.productSlice.products);

  let productMapped;
  if (products) {
    productMapped = products.map((data, index) => {
      return <Product data={data} key={index} />;
    });
  } else {
    productMapped = <p>Loading...</p>;
  }

  return <Container>{productMapped}</Container>;
};

export default Products;
