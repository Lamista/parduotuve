import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navigation from './components/Navigation/NavigationComponent';
import ProductListContainer from './components/ProductList/ProductListContainer';
import AdminTableContainer from './components/ProductAdministration/AdminTableContainer'
import ProductDetails from './components/ProductDetails/ProductDetailsContainer';
import ProductAdministrationFormContainer from './components/ProductAdministration/ProductAdministrationFormContainer';
import CartDetailsContainer from './components/CartDetails/CartDetailsContainer';
import NoMatch from './components/NoMatch/NoMatchComponent';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = (props) => (
  <div>
    <Navigation />
    <Switch>
      <Route exact path='/' component={ProductListContainer} />
      <Route path='/products/:id' component={ProductDetails} />
      <Route path='/products' component={ProductListContainer} />
      <Route path='/admin/products/new' component={ProductAdministrationFormContainer} />
      <Route path='/admin/products/:id' component={ProductAdministrationFormContainer} />
      <Route path='/admin/products' component={AdminTableContainer} />
      <Route path='/cart-products' component={CartDetailsContainer} />
      <Route path='*' component={NoMatch} />
      <Route component={NoMatch} />
    </Switch>
    {props.children}
  </div>
)

export default App;
