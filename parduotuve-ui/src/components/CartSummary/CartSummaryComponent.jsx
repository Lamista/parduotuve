import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../AppConfig';

import ServicesContext from '../../context/ServicesContext';

import CartSummaryVisualComponent from './CartSummaryVisualComponent';

const CartSummaryComponent = () => {
    const { userCartService } = useContext(ServicesContext);

    const [currentUser, setCurrentUser] = useState(userCartService.getCurrentUser());
    const [cartCount, setCartCount] = useState(userCartService.getCartCount());

    userCartService.updateCurrentUser = () => setCurrentUser(userCartService.getCurrentUser());
    userCartService.updateCartCount = () => setCartCount(userCartService.getCartCount());

    useEffect(() => {
        if (currentUser !== undefined) {
            axios
                .get(`${baseUrl}/api/users/${currentUser}/cart-products`)
                .then(res => { userCartService.setCartCount(res.data.length()); userCartService.updateCartCount(); })
                .catch(err => console.log(err))
        }
    }, [currentUser, cartCount, userCartService])

    return (
        <CartSummaryVisualComponent
            cartCount={cartCount}
        />
    )
}

export default CartSummaryComponent;