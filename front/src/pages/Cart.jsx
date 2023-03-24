import { useState, useEffect } from "react";
import WishList from "./WishList";
import Bag from "./Bag";
import { getCart } from "../services/UserRequest";

const Cart = () => {
  const [toggleBagWish, setToggleBagWish] = useState(false);
  const [items, setItems] = useState([]);

  const fetchCart = async () => {
    try {
      const uid = window.localStorage.getItem("uid");
      const data = await getCart(uid);
      console.log(data.data.cart.items);
      console.log("test");
      setItems(data.data.cart.items);
      return data;
    } catch (error) {
      console.log();
    }
  };

  useEffect(() => {
    fetchCart();
    console.log("cart useffect trigger");
  }, []);

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
