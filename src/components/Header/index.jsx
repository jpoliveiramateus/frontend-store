import React, { useState } from 'react';
import { BiMenu, BiMenuAltRight } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import { thunkProducts } from '../../redux/actions';
import Categories from '../Categories';
import logofrontend from '../../images/icon-frontend-logo.png';
import iconfrontend from '../../images/icon-frontend.png';
import iconSearch from '../../images/icon-search.png';
import iconCart from '../../images/icon-cart.png';
import { useDispatch, useSelector } from "react-redux";
import './styles.css';

function Header() {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.reducerCart.cartProducts);
  const mobile = useSelector((state) => state.reducerSetMobile.mobile);
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');

  const calculateQuantityProducts = () => {
    let quantityProducts = 0;

    cartProducts.forEach((product) => {
      quantityProducts += product.quantidade;
    });

    return quantityProducts;
  }

  const handleClick = () => setMenuOpen(!menuOpen);

  const dispatchSearch = () => {
    dispatch(thunkProducts('', search));
    setSearch('');
  };

  return (
    <header>
      <nav className="shadow-sm">
        <ul
          className="d-flex align-items-center justify-content-around p-2 mb-0"
          style={ { backgroundColor: '#FFF059' } }
        >
          <button
            type="button"
            onClick={ () => {
              history.push('/');
              document.location.reload(true);
              // https://developer.mozilla.org/pt-BR/docs/Web/API/Location/reload
            } }
            style={ { border: 'none', backgroundColor: '#FFF059' } }
          >
            <img src={ mobile ? logofrontend : iconfrontend } alt="icon-frontend" />
          </button>

          <div
            className="d-flex align-items-center p-2 rounded bg-white shadow-sm me-md-5"
            style={ { width: '60%' } }
          >
            <input
              type="text"
              className="border-0 mw-100 w-100 ms-1 h-50 fs-6"
              style={ { outline: 0 } }
              placeholder="Estou buscando..."
              data-testid="query-input"
              value={ search }
              onChange={ ({ target }) => setSearch(target.value) }
              onKeyUpCapture={ (e) => {
                if (e.key === 'Enter') {
                  history.push('/');
                  dispatchSearch();
                }
              } }
            />
            <img
              className="icon-search me-2"
              src={iconSearch}
              alt="Icon Search"
              data-testid="query-button"
              width="16px"
              onClick={ () => {
                history.push('/');
                dispatchSearch();
              } }
            />
          </div>

          {mobile && (
            menuOpen ? (
              <BiMenuAltRight
                className="icon-menu fs-2"
                type="button"
                onClick={ handleClick }
              />
            ) : (
              <BiMenu
                className="icon-menu fs-2"
                type="button"
                onClick={ handleClick }
              />
            )
          )}

          <div className="d-flex">
            <img
              src={iconCart}
              alt="Icon Cart"
              data-testid="shopping-cart-button"
              onClick={ () => history.push('/cart') }
              className="icon-cart fs-2 me-md-5 mb-1"
            />
            <span className="shopping-cart-size shadow-sm" data-testid="shopping-cart-size">
              {calculateQuantityProducts()}
            </span>
          </div>
        </ul>
      </nav>
      <Categories menuOpen={ menuOpen } setMenuOpen={ setMenuOpen } />
    </header>
  );
}

export default Header;
