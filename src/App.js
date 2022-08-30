import React, { useEffect, useState } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import { setMobile } from './redux/actions';

const SCREEN = 768;

function App({ setMobileRedux }) {
  const [width, setWidth] = useState(window.innerWidth);

  // https://blog.logrocket.com/developing-responsive-layouts-with-react-hooks/
  const handleWindowResize = () => setWidth(window.innerWidth);
  window.addEventListener('resize', handleWindowResize);

  useEffect(() => {
    if (window.innerWidth < SCREEN) {
      setMobileRedux(true);
    } else {
      setMobileRedux(false);
    }
  }, [setMobileRedux, width]);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/product/:id" component={ ProductDetails } />
        <Route path="/cart" component={ Cart } />
        <Route path="/" component={ Home } />
      </Switch>
    </BrowserRouter>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setMobileRedux: (state) => dispatch(setMobile(state)),
});

App.propTypes = {
  setMobileRedux: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(App);
