const db = require("../../config/firebaseconfig").db;

const cartController = {
  addCart: async function (req, res) {
    try {
      const { item, quantity, price, userId, id, size, image, color } =
        req.body.data;
      const cartRef = db.collection("carts").doc(userId);
      const cartDoc = await cartRef.get();
      console.log(req.body.data);
      // When cart is not created

      if (!cartDoc.exists) {
        const itemRef = { item, quantity, price, id, size, image, color };
        const cartData = {
          items: [itemRef],
          total: price * quantity,
        };
        await cartRef.set(cartData);
        return res.status(200).json({ message: "product added successfully" });
      }

      const cartData = cartDoc.data();

      // cart is created, but empty

      if (!cartData || !cartData.items) {
        const itemRef = { item, quantity, price, id, size, image, color };
        const cartData = {
          items: [itemRef],
          total: price * quantity,
        };
        await cartRef.set(cartData);
        return res
          .status(200)
          .json({ message: "product added successfully CART EXIST" });
      }

      let updated = false;
      let newTotal = cartData.total + price * quantity;

      const newItems = cartData.items.map((itemRef) => {
        if (itemRef.id === id) {
          itemRef.quantity += quantity;
          updated = true;
        }
        return itemRef;
      });

      if (!updated) {
        newItems.push({ item, quantity, price, size, image, color });
      }

      await cartRef.update({
        items: newItems,
        total: newTotal,
      });

      return res.status(200).json({ message: "product added successfully" });
    } catch (error) {
      console.log(error);
    }
  },
  fetchCart: async function (req, res) {
    try {
      const { id } = req.params;

      const cartRef = db.collection("carts").doc(id);
      const cartDoc = await cartRef.get();

      if (!cartDoc.exists) {
        await cartRef.set({});
        return res.status(200).json({ message: "empty cart" });
      } else {
        const cartData = cartDoc.data();
        return res.status(200).json({ cart: cartData });
      }
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = cartController;
