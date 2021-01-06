import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../../AppConfig';
import samsungImg from '../../images/samsung.jpg'
import defaultImg from '../../images/default.png'

import ModalComponent from '../Modal/ModalComponent';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ServicesContext from '../../context/ServicesContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const AdminTableComponent = ({ products, deleteProduct }) => {

    const { userCartService } = useContext(ServicesContext);
    const [currentUser, setCurrentUser] = useState(userCartService.getCurrentUser());

    userCartService.updateCurrentUser = () => setCurrentUser(userCartService.getCurrentUser());

    useEffect(() => {
        if (currentUser !== undefined) {
            axios
                .get(`${baseUrl}/api/users/${currentUser}/cart-products`)
                .then(res => {
                    userCartService.setCartCount(res.data.length);
                    userCartService.updateCartCount();
                })
                .catch(err => console.log(err))
        }
    }, [products, currentUser, userCartService])

    return (
        products.map(({ id, image, title }, index) => {
            const imgSrc = image === '/samsung.jpg' ? samsungImg : defaultImg;

            return (
                <tr key={id}>
                    <th scope='row'>{index + 1}</th>
                    <td>
                        <img
                            src={imgSrc}
                            className='card-img-top'
                            style={{ width: 50, height: 50 }}
                            alt={title}
                        />
                    </td>
                    <td>
                        <Link className='text-decoration-none mr-3'
                            to={`/admin/products/${id}`}>{title} <FontAwesomeIcon icon={faPencilAlt} />
                        </Link>
                    </td>
                    <td>
                        <button className='btn btn-danger' data-toggle="modal" data-target={`#staticBackdrop${id}`} value={id}>
                            Delete  <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                    </td>
                    <td>
                        <ModalComponent
                            productId={id}
                            title={title}
                            deleteProduct={deleteProduct}
                        />
                    </td>
                </tr >
            );
        }))
}

export default AdminTableComponent;