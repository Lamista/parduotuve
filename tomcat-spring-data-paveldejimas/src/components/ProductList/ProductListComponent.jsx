import React from 'react';
import ProductCardComponent from './ProductCardComponent';
import ChartsPage from '../ChartsPage/ChartsPage';

const ProductListComponent = ({ products, search, handleSearchChange }) => (
    <div className='container'>
        <input className='my-3' type='text' value={search} onChange={handleSearchChange} placeholder={'Search'} />
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4'>
            {products.map(({ id, ...otherProps }) => {
                return (
                    <ProductCardComponent
                        key={id}
                        id={id}
                        {...otherProps}
                    />
                )
            })}
        </div>
        <ChartsPage
            products={products}
        />
    </div >
)

export default ProductListComponent;