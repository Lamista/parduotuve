import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../AppConfig';

import ServicesContext from '../../context/ServicesContext';

import ProductDetailsComponent from '../ProductDetails/ProductDetailsComponent';
import LoadingComponent from '../Loading/LoadingComponent';
import AlertComponent from '../Alert/AlertComponent';

const ProductDetailsContainer = (props) => {

    const { userCartService } = useContext(ServicesContext);
    const [currentUser, setCurrentUser] = useState(userCartService.getCurrentUser());
    const [product, setProduct] = useState(null);
    const [isAlertOn, setAlert] = useState(false);
    const [message, setMessage] = useState('');

    userCartService.updateCurrentUser = () => setCurrentUser(userCartService.getCurrentUser());

    useEffect(() => {
        axios
            .get(`${baseUrl}/api/products/${props.match.params.id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err))
    }, [props.match.params.id]);


    const addToCart = () => {
        axios
            .post(`${baseUrl}/api/users/${currentUser}/cart-products`,
                {
                    'id': product.id,
                    'image': product.image || '',
                    'title': product.title
                })
            .then(res => {
                console.log(res.data);
                console.log(res.data.products);
                console.log(res.data.message);
                console.log(res.data.product);

                // userCartService.setCartCount(res.data.products.length);
                userCartService.setCartCount(res.data.cartSize.length);
                userCartService.updateCartCount();
                setProduct(res.data.product);

                setMessage(res.data.message);

                setAlert(true);
                setTimeout(() => setAlert(false), 1000);
            })
            .catch(err => console.log(err))
    }

    if (product !== null) {
        const { id, image, title, ...otherProps } = product;
        console.log(id)
        return (
            <div className='container'>
                <div key={id}>
                    <ProductDetailsComponent
                        id={id}
                        currentUser={currentUser}
                        userCartService={userCartService}
                        image={image}
                        addToCart={addToCart}
                        title={title}
                        {...otherProps}
                    />
                    {isAlertOn && <AlertComponent
                        message={message}
                    />}
                </div>
            </div>
        )
    } else {
        return (
            <LoadingComponent />
        );
    }
}

export default ProductDetailsContainer;