import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import baseUrl from '../../AppConfig';

import ProductAdministrationFormComponent from './ProductAdministrationFormComponent';

class ProductAdministrationFormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            image: '',
            description: '',
            price: '',
            quantity: '',
            id: 0
        }
    }

    componentDidMount() {
        if (this.props.match.params.id > 0) {
            axios
                .get(`${baseUrl}/api/products/${this.props.match.params.id}`)
                .then(res => this.setState({
                    id: res.data.id || '',
                    title: res.data.title || '',
                    description: res.data.description || '',
                    image: res.data.image || '',
                    price: res.data.price || '',
                    quantity: res.data.quantity || ''

                }))
                .catch(err => console.log(err))
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.id > 0) {
            axios.put(`${baseUrl}/api/products/${this.state.id}`, {
                'description': this.state.description,
                'id': this.state.id,
                'image': this.state.image,
                'price': this.state.price,
                'quantity': this.state.quantity,
                'title': this.state.title
            }).then(() => this.props.history.push('/admin/products'))
        } else {
            axios.post(`${baseUrl}/api/products`, {
                'description': e.target.description.value,
                'id': this.state.id,
                'image': e.target.image.value,
                'price': e.target.price.value,
                'quantity': e.target.quantity.value,
                'title': e.target.title.value
            }).then(() => this.props.history.push('/admin/products'))

            this.setState({
                title: '',
                image: '',
                description: '',
                price: '',
                quantity: ''
            })
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <ProductAdministrationFormComponent handleSubmit={this.handleSubmit} handleChange={this.handleChange} {...this.state} />
        )
    }
}

export default withRouter(ProductAdministrationFormContainer);
