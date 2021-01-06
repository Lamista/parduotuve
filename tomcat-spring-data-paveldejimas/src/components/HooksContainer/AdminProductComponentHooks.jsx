import React from 'react';
import { Link } from 'react-router-dom';

import ModalComponent from '../Modal/ModalComponent';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const AdminProductComponent = ({ productId, imgSrc, title, deleteProduct, index }) => (
    <tr>
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
                to={`/admin/products/${productId}`}>{title} <FontAwesomeIcon icon={faPencilAlt} />
            </Link>
        </td>
        <td>
            <button className='btn btn-danger' data-toggle="modal" data-target={`#staticBackdrop${productId}`} value={productId}>
                Delete  <FontAwesomeIcon icon={faTrashAlt} />
            </button>
        </td>
        <td>
            <ModalComponent
                productId={productId}
                title={title}
                deleteProduct={deleteProduct}
            />
        </td>
    </tr >
);

export default AdminProductComponent;