import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ServicesContext from '../../context/ServicesContext';
import baseUrl from '../../AppConfig';

import samsungImg from '../../images/samsung.jpg';
import defaultImg from '../../images/default.png';

import AlertComponent from '../Alert/AlertComponent';

const ProductDetailsComponent = ({ product }) => {
    const { id, title, image, description, price, quantity } = product;

    const { userCartService } = useContext(ServicesContext);
    const [currentUser, setCurrentUser] = useState(userCartService.getCurrentUser());
    const [isAlertOn, setAlert] = useState(false);
    const [message, setMessage] = useState('');

    userCartService.updateCurrentUser = () => setCurrentUser(userCartService.getCurrentUser());

    const addToCart = (e) => {
        e.preventDefault();
        axios
            .post(`${baseUrl}/api/users/${currentUser}/cart-products`,
                {
                    id,
                    image,
                    title,
                    description,
                    price,
                    quantity
                })
            .then(res => {
                console.log(res.data);
                console.log(res.data.products);
                console.log(res.data.message);
                console.log(res.data.product);

                // userCartService.setCartCount(res.data.products.length);
                userCartService.setCartCount(res.data.cartSize.length);
                userCartService.updateCartCount();

                setMessage(res.data.message);

                setAlert(true);
                setTimeout(() => setAlert(false), 1000);
            })
            .catch(err => console.log(err))
    }



    let imgSrc = image === '/samsung.jpg' ? samsungImg : defaultImg;
    return (
        <div>
            <div className='media'>
                <img className='align-self-start mr-3' src={imgSrc} alt={title} style={{
                    height: '25rem'
                }} />
                <div className='media-body mt-3'>
                    <h5 className='mt-0'>{title}</h5>
                    <p>{description}</p>
                    <p>Price: {price.toFixed(2)}€</p>
                    <p>In stock: {quantity}</p>
                </div>
            </div>
            <div className='row ml-5 mt-3'>
                {currentUser !== undefined ? <button className='btn btn-primary mr-1' onClick={addToCart}>Add to cart</button> : <div></div>}
                <Link to={'/'} className='btn btn-secondary'>Back</Link>
            </div>
            {isAlertOn && <AlertComponent
                message={message}
            />}
        </div>

    )
}

export default ProductDetailsComponent;