import { Container, Circle, Image, Info, Icon } from "../styles/Product.styles";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Navigate, useNavigate, Link } from "react-router-dom";

const Product = ({ data }) => {
  const navigate = useNavigate();
  return (
    <Container>
      <Circle />
      <Image src={data.img} />
      <Info>
        <Icon>
          <ShoppingCartOutlinedIcon />
        </Icon>
        <Icon>
          <SearchOutlinedIcon
            onClick={() => navigate(`/products/${data.id}`)}
          />
        </Icon>
        <Icon>
          <FavoriteBorderOutlinedIcon />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
