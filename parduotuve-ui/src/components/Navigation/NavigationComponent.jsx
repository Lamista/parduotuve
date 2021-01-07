import React from 'react';
import { NavLink } from 'react-router-dom';
import CartSummaryComponent from '../CartSummary/CartSummaryComponent';
import LoginComponent from '../Login/LoginComponent';

const Navigation = () => (
    <nav className='navbar navbar-light navbar-expand-md' style={{ backgroundColor: '#e3f2fd' }}>
        <div className='container'>
            <ul className='nav navbar-nav'>
                <NavLink className='nav-link' exact to='/'>Home</NavLink>
                <NavLink className='nav-link' to={`/admin/products`}>Admin</NavLink>
                <LoginComponent />
            </ul>
            <ul className='nav navbar-nav navbar-right'>
                <NavLink className='nav-link' to={`/cart-products`}>
                    <CartSummaryComponent />
                </NavLink>
            </ul>
        </div>
    </nav >
)

export default Navigation;