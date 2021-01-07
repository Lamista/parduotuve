import React, { Component } from 'react';
import axios from 'axios';
import baseUrl from '../../AppConfig';

import LoadingComponent from '../Loading/LoadingComponent';
import ProductListComponent from './ProductListComponent';

class ProductListContainer extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            search: '',
            newProducts: []
        }
    }

    componentDidMount = () => {
        console.log("Mount");
        axios
            .get(`${baseUrl}/api/products`)
            .then(res => {
                this.setState({ products: res.data });
                console.log(res.data);
            })
            .catch(err => console.log(err))
    }

    handleSearchChange = (e) => {
        this.setState({ search: e.target.value });
        axios
            .get(`${baseUrl}/api/products/names/${e.target.value}`)
            .then(res => this.setState({ newProducts: res.data }))
            .catch(err => console.log(err))
    }

    render() {
        console.log("products length: " + this.state.products.length);
        console.log("search length: " + this.state.search.length);
        if (this.state.products.length > 0 && this.state.search.length === 0) {
            return (
                <ProductListComponent
                    products={this.state.products}
                    handleSearchChange={this.handleSearchChange}
                    search={this.state.search}
                />
            )
        } else if (this.state.products.length > 0 && this.state.search.length > 0) {
            return (
                <ProductListComponent
                    products={this.state.newProducts}
                    handleSearchChange={this.handleSearchChange}
                    search={this.state.search}
                />
            )
        } else {
            return (
                <LoadingComponent />
            );
        }
    }
}

export default ProductListContainer;