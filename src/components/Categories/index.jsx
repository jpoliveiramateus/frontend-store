import React, { useEffect, useRef } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { thunkCategories, thunkProducts } from '../../redux/actions';
import { useDispatch, useSelector } from "react-redux";

function Categories({ menuOpen, setMenuOpen }) {
  const dispatch = useDispatch();
  const mobile = useSelector((state) => state.reducerSetMobile.mobile);
  const categoriesList = useSelector((state) => state.reducerCategories.categories);
  const history = useHistory();
  const slide = useRef(null);

  useEffect(() => {
    dispatch(thunkCategories());
  }, [dispatch]);

  const slideLeft = () => {
    const move = 800;
    const actualPosition = slide.current.scrollLeft;
    slide.current.scroll(actualPosition - move, 0);
  };

  const slideRight = () => {
    const move = 800;
    const actualPosition = slide.current.scrollLeft;
    slide.current.scroll(actualPosition + move, 0);
  };

  return (
    mobile ? (
      <nav
        className={ menuOpen ? 'menu' : 'menu menu-closed' }
      >
        <h3 className="fs-5 mb-3">Categorias</h3>
        {categoriesList && (
          categoriesList.map(({ name, id }, index) => (
            <button
              type="button"
              key={ name }
              data-testid="category"
              id={ `category-${index}` }
              className="category d-flex align-items-center justify-content-between
                p-3 w-100 border-bottom fw-light border-0"
              onClick={ () => {
                history.push('/');
                dispatch(thunkProducts(id));
                setMenuOpen(false);
              } }
            >
              {name}
              <MdKeyboardArrowRight className="fs-1 text-muted" />
            </button>
          ))
        )}
      </nav>
    ) : (
      <nav
        className="d-flex shadow-sm"
        style={ { backgroundColor: '#FFF059' } }
      >
        <span className="icon-arrow fs-3 mx-2 mb-1">
          <FaAngleLeft onClick={ slideLeft } />
        </span>
        <div className="slide d-flex align-items-center gap-4" ref={ slide }>
          {categoriesList && (
            categoriesList.map(({ name, id }, index) => (
              <button
                type="button"
                key={ name }
                id={ `category-${index}` }
                className="category-desktop border-0"
                data-testid="category"
                style={ { whiteSpace: 'nowrap',
                  fontSize: '0.85rem',
                  backgroundColor: '#FFF059' } }
                onClick={ () => {
                  history.push('/');
                  dispatch(thunkProducts(id));
                } }
              >
                {name}
              </button>
            ))
          )}
        </div>
        <span className="icon-arrow fs-3 mx-2 mb-1">
          <FaAngleRight onClick={ slideRight } />
        </span>
      </nav>
    )
  );
}

export default Categories;
