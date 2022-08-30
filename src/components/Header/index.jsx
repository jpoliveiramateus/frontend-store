import React, { useState } from 'react';
import { BsCart2 } from 'react-icons/bs';
import { BiMenu, BiMenuAltRight } from 'react-icons/bi';
import { GrSearch } from 'react-icons/gr';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { thunkProducts } from '../../redux/actions';
import Categories from '../Categories';
import logofrontend from '../../images/icon-frontend-logo.png';
import iconfrontend from '../../images/icon-frontend.png';
import './styles.css';

function Header({ mobile, thunkProductsAPI }) {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleClick = () => setMenuOpen(!menuOpen);

  const dispatchSearch = () => {
    thunkProductsAPI('', search);
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
            <GrSearch
              className="icon-search me-2"
              data-testid="query-button"
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

          <BsCart2
            type="button"
            data-testid="shopping-cart-button"
            onClick={ () => history.push('/cart') }
            className="icon-cart fs-2 me-md-5 mb-1"
          />
        </ul>
      </nav>
      <Categories menuOpen={ menuOpen } setMenuOpen={ setMenuOpen } />
    </header>
  );
}

const mapStateToProps = (state) => ({
  mobile: state.reducerSetMobile.mobile,
});

const mapDispatchToProps = (dispatch) => ({
  thunkProductsAPI: (categoryId, query) => dispatch(thunkProducts(categoryId, query)),
});

Header.propTypes = {
  mobile: propTypes.bool.isRequired,
  thunkProductsAPI: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
