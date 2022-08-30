import { combineReducers } from 'redux';
import { FETCH_CATEGORIES, FETCH_PRODUCT, FETCH_PRODUCTS, REQUEST_PRODUCT,
  REQUEST_PRODUCTS, SET_MOBILE } from '../actions';

const CATEGORIES_STATE = {};

const reducerCategories = (state = CATEGORIES_STATE, action) => {
  switch (action.type) {
  case FETCH_CATEGORIES:
    return {
      ...state,
      categories: action.payload.categories,
    };
  default:
    return state;
  }
};

const PRODUCTS_STATE = { loading: false, products: null };

const reducerProducts = (state = PRODUCTS_STATE, action) => {
  switch (action.type) {
  case REQUEST_PRODUCTS:
    return {
      ...state,
      loading: true,
    };
  case FETCH_PRODUCTS:
    return {
      ...state,
      loading: false,
      products: action.payload.products,
    };
  default:
    return state;
  }
};

const MOBILE_STATE = { mobile: false };

const reducerSetMobile = (state = MOBILE_STATE, action) => {
  switch (action.type) {
  case SET_MOBILE:
    return {
      mobile: action.payload.mobile,
    };
  default:
    return state;
  }
};

const PRODUCT_STATE = { loading: false, product: null };

const reducerProduct = (state = PRODUCT_STATE, action) => {
  switch (action.type) {
  case REQUEST_PRODUCT:
    return {
      ...state,
      loading: true,
    };
  case FETCH_PRODUCT:
    return {
      ...state,
      loading: false,
      product: action.payload.product,
    };
  default:
    return state;
  }
};

const rootReducer = combineReducers({ reducerCategories,
  reducerSetMobile,
  reducerProducts,
  reducerProduct });

export default rootReducer;
