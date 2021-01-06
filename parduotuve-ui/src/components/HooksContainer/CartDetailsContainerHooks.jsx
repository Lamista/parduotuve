import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../AppConfig';

import ServicesContext from '../../context/ServicesContext';

import CartDetailsComponent from './CartDetailsComponentHooks';

const CartDetailsContainer = () => {
    const { userCartService } = useContext(ServicesContext);

    const [userProducts, setUserProducts] = useState([]);
    const [currentUser, setCurrentUser] = useState(userCartService.getCurrentUser());

    userCartService.updateCurrentUser = () => setCurrentUser(userCartService.getCurrentUser());

    useEffect(() => {
        if (currentUser !== undefined) {
            axios
                .get(`${baseUrl}/api/users/${currentUser}/cart-products`)
                .then(res => {
                    setUserProducts(res.data);
                })
                .catch(err => console.log(err))

            axios
                .get(`${baseUrl}/api/users/${currentUser}/cart-products/grouped`)
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => console.log(err))
        }
    }, [currentUser, userCartService])

    const deleteFromCart = (e) => {
        console.log(e.target.type);
        console.log(e.target.value);
        axios
            .delete(`${baseUrl}/api/users/${currentUser}/cart-products/${e.target.value}`)
            .then((res) => {
                setUserProducts(res.data);
                userCartService.setCartCount(res.data.length);
                userCartService.updateCartCount();
                console.log(res.data);
            })
            .catch(err => console.log(err))
    }

    const addToCart = (e) => {
        let id = e.target.value;

        axios
            .post(`${baseUrl}/api/users/${currentUser}/cart-products`,
                {
                    'id': id
                })
            .then((res) => {
                setUserProducts(res.data.cartSize);
                // setUserProducts(res.data.products);
                userCartService.setCartCount(res.data.cartSize.length);
                // userCartService.setCartCount(res.data.products.size());
                userCartService.updateCartCount();
            })
            .catch(err => console.log(err))
    }

    return (
        <CartDetailsComponent
            deleteFromCart={deleteFromCart}
            addToCart={addToCart}
            currentUser={currentUser}
            userProducts={userProducts}
        />
    )
}

export default CartDetailsContainer;