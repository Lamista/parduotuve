import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const LoginComponent = ({ handleLogin, handleLogout, currentUser, handleChange, username }) => {
    if (currentUser === undefined) {
        console.log('undefined');
        return (
            <form className='navbar-form form-inline' onSubmit={handleLogin}  >
                <input onChange={handleChange} className='form-control mr-md-2' type='text' name='username'
                    placeholder='Username' value={username} required />
                <button className='btn btn-primary mt-2 mt-lg-0' type='submit'>Login <FontAwesomeIcon icon={faSignInAlt} /></button>
            </form>
        )
    } else {
        console.log('defined');
        return (
            <div className='form-inline' >
                <span className='form-control mr-sm-2 ml-md-3' type='text'>Hello {currentUser}!</span>
                <button className='btn btn-primary mt-2 mt-lg-0' onClick={handleLogout}>Logout <FontAwesomeIcon icon={faSignOutAlt} /></button>
            </div>
        )
    }
}

export default LoginComponent;