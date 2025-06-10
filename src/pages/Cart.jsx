import { Suspense, useCallback, useEffect, useState } from "react";
import useCartContext from "../hooks/useCartContext";
import CartItemList from "../components/Cart/CartItemList";
import CartSummary from "../components/Cart/CartSummary";

const Cart = () => {
  const { cart, createOrGetCart, UpdateCartItem, deleteCartItem } =
    useCartContext();
  const [localCart, setLocalCart] = useState(cart);

  useEffect(() => {
    createOrGetCart();
  }, [createOrGetCart]);

  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  const handleUpdateQuantity = useCallback(async (itemId, newQuantity) => {
    const prevLocalCartCopy = localCart;
    setLocalCart((prevLocalCart) => {
      const updatedItem = prevLocalCart.items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: newQuantity,
              total_price: item.product.price * newQuantity,
            }
          : item
      );
      return {
        ...prevLocalCart,
        items: updatedItem,
        total_price: updatedItem.reduce(
          (sum, item) => sum + item.total_price,
          0
        ),
      };
    });
    try {
      await UpdateCartItem(itemId, newQuantity);
    } catch (error) {
      console.log(error);
      setLocalCart(prevLocalCartCopy);
    }
  }, []);

  const handleRemoveItem = async (itemId) => {
    const prevLocalCartCopy = localCart;
    setLocalCart((prevLocalCart) => {
      const updateItem = prevLocalCart.items.filter(
        (item) => item.id != itemId
      );

      return {
        ...prevLocalCart,
        items: updateItem,
        total_price: updateItem.reduce(
          (sum, item) => sum + item.total_price,
          0
        ),
      };
    });
    try {
      await deleteCartItem(itemId);
    } catch (error) {
      console.log(error);
      setLocalCart(prevLocalCartCopy);
    }
  };

  if (!localCart) return <p>Loading......</p>;
  return (
    <div className="w-11/12 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <Suspense fallback={<p>Loading........</p>}>
            <CartItemList
              items={localCart.items}
              handleUpdateQuantity={handleUpdateQuantity}
              handleRemoveItem={handleRemoveItem}
            ></CartItemList>
          </Suspense>
        </div>
        <div>
          <CartSummary
            totalPrice={localCart.total_price}
            itemCount={localCart.items.length}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
