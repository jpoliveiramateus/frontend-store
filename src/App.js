import React, { useEffect, useState } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import { setMobile } from './redux/actions';
import { useDispatch } from "react-redux";

const SCREEN = 768;

function App() {
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth);

  // https://blog.logrocket.com/developing-responsive-layouts-with-react-hooks/
  const handleWindowResize = () => setWidth(window.innerWidth);
  window.addEventListener('resize', handleWindowResize);

  useEffect(() => {
    if (window.innerWidth < SCREEN) {
      dispatch(setMobile(true));
    } else {
      dispatch(setMobile(false));
    }
  }, [width]);

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

export default App;
