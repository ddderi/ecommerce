import { useState, useEffect } from "react";
import WishList from "./WishList";
import Bag from "./Bag";
import { getCart } from "../services/UserRequest";
import { useSelector } from "react-redux";

const Cart = () => {
  const [toggleBagWish, setToggleBagWish] = useState(false);

  const items = useSelector((state) => state.productSlice.cart);

  return (
    <>
      <>
        {!toggleBagWish && (
          <Bag items={items} setToggleBagWish={setToggleBagWish} />
        )}
      </>
      <>{toggleBagWish && <WishList setToggleBagWish={setToggleBagWish} />}</>
    </>
  );
};

export default Cart;
