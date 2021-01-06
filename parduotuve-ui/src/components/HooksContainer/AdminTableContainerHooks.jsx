import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../../AppConfig';

import AdminProductComponent from './AdminProductComponentHooks';
import ServicesContext from '../../context/ServicesContext';

import samsungImg from '../../images/samsung.jpg'
import defaultImg from '../../images/default.png'
import LoadingComponent from '../Loading/LoadingComponent';


const AdminListContainer = () => {
    const { userCartService } = useContext(ServicesContext);
    const [currentUser, setCurrentUser] = useState(userCartService.getCurrentUser());
    const [products, setProducts] = useState([]);

    userCartService.updateCurrentUser = () => setCurrentUser(userCartService.getCurrentUser());

    useEffect(() => {
        axios
            .get(`${baseUrl}/api/products`)
            .then((prod) => {
                setProducts(prod);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    const deleteProduct = (e) => {
        axios
            .delete(`${baseUrl}/api/products/${e.target.value}`)
            .then(() => {
                axios
                    .get(`${baseUrl}/api/products`)
                    .then((prod) => {
                        setProducts(prod);
                    })
            })
            .then(() => {
                if (currentUser !== undefined) {
                    axios
                        .get(`${baseUrl}/api/users/${currentUser}/cart-products`)
                        .then(res => {
                            userCartService.setCartCount(res.data.length);
                            userCartService.updateCartCount();
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
    }


    const { data } = products;
    if (data) {
        console.log(data);
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
                    <tbody>
                        {data.map(({ id, image, ...otherProps }, index) => (
                            <AdminProductComponent
                                key={id}
                                productId={id}
                                imgSrc={image === '/samsung.jpg' ? samsungImg : defaultImg}
                                deleteProduct={deleteProduct}
                                index={index}
                                {...otherProps}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    } else {
        return (
            <LoadingComponent />
        );
    }
}

export default AdminListContainer;