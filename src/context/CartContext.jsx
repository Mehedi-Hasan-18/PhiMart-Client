import { createContext } from 'react';
import useCart from '../hooks/useCart';

const CartContext = createContext()

export const CartProvider = ({children}) => {
    const allValues = useCart()
    return (
        <CartContext.Provider value={allValues}>{children}</CartContext.Provider>
    );
};

export default CartContext;