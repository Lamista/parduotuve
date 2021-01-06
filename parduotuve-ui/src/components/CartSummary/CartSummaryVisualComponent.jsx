import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const CartSummaryComponent = ({ cartCount }) => <h2><FontAwesomeIcon icon={faShoppingCart} /> {cartCount}</h2>;

export default CartSummaryComponent;