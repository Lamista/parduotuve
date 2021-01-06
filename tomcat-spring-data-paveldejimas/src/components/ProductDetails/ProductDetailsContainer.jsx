import React, { Component } from 'react';
import axios from 'axios';
import baseUrl from '../../AppConfig';

import ProductDetailsComponent from './ProductDetailsComponent';
import LoadingComponent from '../Loading/LoadingComponent';

class ProductDetailsContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: null
        }
    }

    componentDidMount = () => {
        console.log(this.props.match.params.id);
        axios
            .get(`${baseUrl}/api/products/${this.props.match.params.id}`)
            .then(res => this.setState({ product: res.data }))
            .catch(err => console.log(err))
    }

    render() {
        if (this.state.product !== null) {
            return (
                <div className='container'>
                    <ProductDetailsComponent
                        product={this.state.product}
                    />
                </div>
            )
        } else {
            return (
                <LoadingComponent />
            );
        }
    }
}

export default ProductDetailsContainer;