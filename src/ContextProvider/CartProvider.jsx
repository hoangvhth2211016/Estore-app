import { useEffect, useState } from "react"
import { updateCart, getCart, removeFromCart, clearCart } from "../Services/cart.service";
import { CartContext } from "./Context";
import useAuth from "../CustomHooks/useAuth";

export default function CartProvider({ children }) {

    const [cart, setCart] = useState();

    const { auth } = useAuth();

    useEffect(() => {
        if (auth?.refreshToken) {
            getCart().then(res => {
                setCart(res);
            })
        }
    }, [auth])

    const handleRemove = (productId) => {
        removeFromCart(productId).then(res => {
            setCart(res.data);
        });
    }

    const handleUpdateCart = (productId, quantity) => {
        updateCart({ productId, quantity }).then(res => {
            setCart(res.data);
        });
    }

    const handleClearCart = () => {
        clearCart().then(res => {
            setCart(res.data);
        });
    }

    return (
        <CartContext.Provider value={{ cart, setCart, handleRemove, handleUpdateCart, handleClearCart }}>
            {children}
        </CartContext.Provider>
    )
}
