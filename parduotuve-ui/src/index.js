import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import ServicesContext from './context/ServicesContext'
import UserCartService from './services/UserCartService'

import App from './App';

import './index.css';

document.title = 'E-shop';

const userCartService = new UserCartService();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ServicesContext.Provider value={{ userCartService }}>
        <App />
      </ServicesContext.Provider>
    </BrowserRouter>
  </React.StrictMode >,
  document.getElementById('root')
);