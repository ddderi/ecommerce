import { popularProducts } from "../data";
import { Container } from "../styles/Products.styles";
import Product from "./Product";

const Products = () => {
  const productMapped = popularProducts.map((data, index) => {
    return <Product data={data} key={index} />;
  });

  return <Container>{productMapped}</Container>;
};

export default Products;
