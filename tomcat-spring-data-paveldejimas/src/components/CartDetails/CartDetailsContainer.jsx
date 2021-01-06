import React, { Component } from 'react';
import axios from 'axios';
import baseUrl from '../../AppConfig';
import ServicesContext from '../../context/ServicesContext';

import CartDetailsComponent from './CartDetailsComponent';

class CartDetailsContainer extends Component {
    constructor() {
        super();
        this.state = {
            userProducts: []
        }
    }

    componentDidMount = () => {
        let currentUser = this.context.userCartService.getCurrentUser();
        if (currentUser !== undefined) {
            axios
                .get(`${baseUrl}/api/users/${currentUser}/cart-products`)
                .then(res => this.setState({ userProducts: res.data }))
                .catch(err => console.log(err))
        }

    }

    deleteFromCart = (e) => {
        let currentUser = this.context.userCartService.getCurrentUser();
        console.log(e.target.type);
        console.log(e.target.value);
        axios
            .delete(`${baseUrl}/api/users/${currentUser}/cart-products/${e.target.value}`)
            .then((res) => {
                this.setState({ userProducts: res.data });

                this.context.userCartService.setCartCount(res.data.length);
                this.context.userCartService.updateCartCount();
                console.log(res.data);
            })
            .catch(err => console.log(err))
    }

    addToCart = (e) => {
        let id = e.target.value;
        let currentUser = this.context.userCartService.getCurrentUser();

        axios
            .post(`${baseUrl}/api/users/${currentUser}/cart-products`,
                {
                    'id': id
                })
            .then((res) => {
                this.setState({ userProducts: res.data.cartSize });
                // setUserProducts(res.data.products);
                this.context.userCartService.setCartCount(res.data.cartSize.length);
                // userCartService.setCartCount(res.data.products.size());
                this.context.userCartService.updateCartCount();
            })
            .catch(err => console.log(err))
    }

    render() {
        if (this.state.userProducts.length > 0) {
            return (
                <CartDetailsComponent
                    deleteFromCart={this.deleteFromCart}
                    addToCart={this.addToCart}
                    userProducts={this.state.userProducts}
                />
            )
        } else {
            return (
                <div className='d-flex justify-content-center'>
                    {this.context.userCartService.getCurrentUser() !== undefined ? <h1>No products selected</h1> : <h1>Please login</h1>}
                </div>
            );
        }
    }
}

CartDetailsContainer.contextType = ServicesContext;

export default CartDetailsContainer;