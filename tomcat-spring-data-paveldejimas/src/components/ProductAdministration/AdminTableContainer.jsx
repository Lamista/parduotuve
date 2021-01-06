import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../../AppConfig';

import AdminTableComponent from './AdminTableComponent';

class AdminListContainer extends Component {
    constructor() {
        super();
        this.state = {
            products: []
        }
    }

    componentDidMount = () => {
        axios
            .get(`${baseUrl}/api/products`)
            .then((res) => this.setState({ products: res.data }))
            .catch((err) => console.log(err));
    }

    deleteProduct = (e) => {
        e.preventDefault();
        axios
            .delete(`${baseUrl}/api/products/${e.target.value}`)
            .then(() => {
                axios
                    .get(`${baseUrl}/api/products`)
                    .then((res) => this.setState({ products: res.data }))
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className='container mt-5'>
                <Link to={`/admin/products/new`} className='btn btn-primary mb-5'>
                    Add new product
                    </Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Image</th>
                            <th scope='col'>Title</th>
                            <th scope='col'></th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    {this.state.products.length > 0 &&
                        <tbody>
                            <AdminTableComponent
                                products={this.state.products}
                                deleteProduct={this.deleteProduct}
                            />
                        </tbody>}
                </table>
            </div>
        );
    }
}

export default AdminListContainer;