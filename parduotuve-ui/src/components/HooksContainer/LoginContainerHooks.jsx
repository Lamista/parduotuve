import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router';
import baseUrl from '../../AppConfig';

import ServicesContext from '../../context/ServicesContext.js';

import LoginComponent from './LoginComponentHooks';

const LoginContainer = () => {
    const { userCartService } = useContext(ServicesContext);
    const history = useHistory();

    const [currentUser, setCurrentUser] = useState(userCartService.getCurrentUser());
    const [username, setUsername] = useState('');

    userCartService.updateCurrentUser = () => setCurrentUser(userCartService.getCurrentUser(), console.log(userCartService.getCurrentUser()));

    const handleChange = (e) => {
        setUsername(e.target.value)
    }
    const handleLogin = (e) => {
        e.preventDefault();
        const name = e.target.username.value;
        userCartService.setCurrentUser(name);
        userCartService.updateCurrentUser();
        setUsername('');
        axios
            .post(`${baseUrl}/api/users/`,
                {
                    "username": username,
                    "firstName": "string",
                    "lastName": "string",
                    "email": "string",
                    "age": 0
                })
            .then(() => axios
                .get(`${baseUrl}/api/users/${name}/cart-products`)
                .then(res => {
                    userCartService.setCartCount(res.data.length);
                    userCartService.updateCartCount();
                    history.push('/');
                })
                .catch(err => console.log(err)))
            .then(() => console.log("success"))
            .catch(err => console.log(err))
    }
    const handleLogout = (e) => {
        e.preventDefault();
        userCartService.setCurrentUser(undefined);
        setCurrentUser(undefined);
        userCartService.updateCurrentUser();
        userCartService.setCartCount(0);
        userCartService.updateCartCount();

        history.push('/');

    }
    return (
        <LoginComponent
            handleChange={handleChange}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            currentUser={currentUser}
            username={username}
        />
    )
}

export default LoginContainer;