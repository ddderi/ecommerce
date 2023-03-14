import { useState } from "react";
import WishList from "./WishList";
import Bag from "./Bag";

const Cart = () => {
  const [toggleBagWish, setToggleBagWish] = useState(false);

  return (
    <>
      <>{!toggleBagWish && <Bag setToggleBagWish={setToggleBagWish} />}</>
      <>{toggleBagWish && <WishList setToggleBagWish={setToggleBagWish} />}</>
    </>
  );
};

export default Cart;
