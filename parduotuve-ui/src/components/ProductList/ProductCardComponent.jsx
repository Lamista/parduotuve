import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import samsungImg from '../../images/samsung.jpg';
import defaultImg from '../../images/default.png';

import '../../styles/Card.css';

const ProductCardComponent = ({ id, title, image, description, price, quantity }) => {
    let imgSrc = image === '/samsung.jpg' ? samsungImg : defaultImg;
    return (
        <div className='col mb-4'>
            <div className='card h-100'>
                <img src={imgSrc} className='card-img-top' alt={title} />
                <div className='card-body'>
                    <h5 className='card-title'>{title}</h5>
                    <p className='card-text'>{description}</p>
                    <div className='row'>
                        <div className='col'>
                            <p>Price: {Math.round(price * 100) / 100}€</p>
                        </div>
                        <div className='col'>
                            <p>In stock: {quantity}</p>
                        </div>
                    </div>
                </div>
                <Link to={`/products/${id}`} className='btn btn-primary'>Details</Link>
            </div>
        </div >
    )
}

ProductCardComponent.propTypes = {
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.any,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number
};

export default ProductCardComponent;