import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../AppConfig';

import LoadingComponent from '../Loading/LoadingComponent';
import ProductListComponent from '../ProductList/ProductListComponent';

const ProductListContainer = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [newProducts, setNewProducts] = useState([]);

    useEffect(() => {
        axios
            .get(`${baseUrl}/api/products`)
            .then(res => setProducts(res.data))
            .catch(err => console.log(err))
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        axios
            .get(`${baseUrl}/api/products/names/${e.target.value}`)
            .then(res => setNewProducts(res.data))
            .catch(err => console.log(err))
    }

    if (products.length > 0 && search.length === 0) {
        return (
            <ProductListComponent
                products={products}
                handleSearchChange={handleSearchChange}
                search={search}
            />
        )
    } else if (products.length > 0 && search.length > 0) {
        return (
            <ProductListComponent
                products={newProducts}
                handleSearchChange={handleSearchChange}
                search={search}
            />
        )
    } else {
        return (
            <LoadingComponent />
        );
    }
}

export default ProductListContainer;