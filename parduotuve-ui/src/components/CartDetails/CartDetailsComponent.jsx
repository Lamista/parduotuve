import React from 'react';

import samsungImg from '../../images/samsung.jpg';
import defaultImg from '../../images/default.png';
import '../../styles/CartDetailsComponent.css';

const CartDetailsComponent = ({ userProducts, deleteFromCart, addToCart }) => {
    let productsMap = new Map();
    userProducts.forEach(p => {
        if (!productsMap.has(p.id)) {
            productsMap.set(p.id, [p, 1]);
        } else {
            let count = productsMap.get(p.id)[1];
            count++;
            productsMap.set(p.id, [p, count]);
        }
    });

    let total = userProducts.reduce(((sum, p) => sum + p.price), 0);
    if (productsMap.size > 0) {
        return (
            <div className='container mt-5'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope='col'>Image</th>
                            <th scope='col'>Title</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Total</th>
                        </tr>
                    </thead>
                    {Array.from(productsMap).map(([key, value]) => (
                        <tbody key={key}>
                            <tr>
                                <td>
                                    <img
                                        src={value[0].image === '/samsung.jpg' ? samsungImg : defaultImg}
                                        className='card-img-top'
                                        style={{ width: 50, height: 50 }}
                                        alt={value[0].title}
                                    />
                                </td>
                                <td>{value[0].title}</td>
                                <td>
                                    <button className='btn btn-info w-25' onClick={addToCart} value={key}>
                                        +
                                    </button>
                                    <span className='text-large mx-4'>{value[1]}</span>
                                    <button className='btn btn-info w-25' onClick={deleteFromCart} value={key}>
                                        -
                                    </button>
                                </td>
                                <td>{(value[1] * value[0].price).toFixed(2)}</td>
                            </tr>
                        </tbody>
                    ))}
                </table>
                <h3 className='text-right'>Subtotal: {total.toFixed(2)} €</h3>
            </div>
        );
    }
}

export default CartDetailsComponent;