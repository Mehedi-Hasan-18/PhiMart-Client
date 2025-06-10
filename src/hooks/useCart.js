import { useEffect, useState } from "react";
import authApiClint from "../services/authapiClient";
import { useCallback } from "react";

const useCart = () => {
  const [authToken] = useState(() => {
    const tokenData = localStorage.getItem("authToken");
    return tokenData ? JSON.parse(tokenData).access : null;
  });
  const [cart, setCart] = useState(null);
  const [cartId, setCartId] = useState(() => localStorage.getItem("cartId"));

  //create a new cart
  const createOrGetCart = useCallback(async () => {
    try {
      const response = await authApiClint.post("/carts/");
      if (!cartId) {
        localStorage.setItem("cartId", response.data.id);
        setCartId(response.data.id);
      }
      setCart(response.data);
    } catch (error) {
      console.error("Error creating cart:", error);
    }
  }, [cartId, authToken]);

  //Add Item TO The Cart

  const AddCartItems = useCallback(
    async (product_id, quantity) => {
      if (!cartId) await createOrGetCart();
      try {
        const response = await authApiClint.post(`/carts/${cartId}/items/`, {
          product_id,
          quantity,
        });
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    [cartId]
  );

  //Update Cart Item
  const UpdateCartItem = useCallback(
    async (itemId, quantity) => {
      try {
        await authApiClint.patch(`/carts/${cartId}/items/${itemId}/`, {
          quantity,
        });
      } catch (error) {
        console.log(error);
      }
    },
    [cartId]
  );

  useEffect(() => {
    const initialize = async () => {
      await createOrGetCart();
    };
    initialize();
  }, [createOrGetCart]);

  //delete cart item
  const deleteCartItem = useCallback(
    async (itemId) => {
      try {
        await authApiClint.delete(`carts/${cartId}/items/${itemId}/`);
      } catch (error) {
        console.log(error);
      }
    },
    [cartId]
  );
  return {
    cart,
    createOrGetCart,
    AddCartItems,
    UpdateCartItem,
    deleteCartItem,
  };
};

export default useCart;
