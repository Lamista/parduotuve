import React, { Component } from 'react';
import FormaComponent from './FormaComponent';
import baseUrl from '../../AppConfig';
import axios from 'axios';
axios.defaults.withCredentials = true; // leidzia dalintis cookies

class FormaContainer extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            pass: ''
        }
    }

    onUsernameChange = (event) => { this.setState({ username: event.target.value }) }
    onPassChange = (event) => { this.setState({ pass: event.target.value }) }

    onSubmit = (event) => {
        let userData = new URLSearchParams();
        userData.append('username'
            , this.state.username);
        userData.append('password'
            , this.state.pass);
        axios.post(`${baseUrl}/login`
            , userData,
            { headers: { 'Content-type': 'application/x-www-form-urlencoded' } })
            .then((resp) => {
                console.log("user " + resp.data.username + " logged in")
            })
            .catch((e) => { console.log(e); });
        event.preventDefault();
    }

    render() {
        return <FormaComponent username={this.state.username} pass={this.state.pass}
            onUsernameChange={this.onUsernameChange}
            onPassChange={this.onPassChange}
            onSubmit={this.onSubmit} />;
    }
    onCalc = (event) => {
        axios.get(`${baseUrl}/calc?left=1&right=2`)
            .then((response) => { console.log(response); })
            .catch((e) => { console.log(e); });
        event.preventDefault();
    }
}

export default FormaContainer;