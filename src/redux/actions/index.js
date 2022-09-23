import { getCategories, getProductsFromCategoryAndQuery } from '../../services/api';

export const SET_MOBILE = 'SET_MOBILE';

export const setMobile = (state) => ({
  type: SET_MOBILE,
  payload: {
    mobile: state,
  },
});

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

const fetchCategories = (categories) => ({
  type: FETCH_CATEGORIES,
  payload: {
    categories,
  },
});

export const thunkCategories = () => async (dispatch) => {
  const data = await getCategories();
  dispatch(fetchCategories(data));
};

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';

const requestProducts = () => ({ type: REQUEST_PRODUCTS });

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

const fetchProducts = (products) => ({
  type: FETCH_PRODUCTS,
  payload: {
    products,
  },
});

export const thunkProducts = (categoryId, query) => async (dispatch) => {
  dispatch(requestProducts());
  const products = await getProductsFromCategoryAndQuery(categoryId, query);
  dispatch(fetchProducts(products.results));
};

export const REQUEST_PRODUCT = 'REQUEST_PRODUCT';

const requestProduct = () => ({ type: REQUEST_PRODUCT });

export const FETCH_PRODUCT = 'FETCH_PRODUCT';

const fetchProduct = (product) => ({
  type: FETCH_PRODUCT,
  payload: {
    product,
  },
});

export const thunkProduct = (productId) => async (dispatch) => {
  dispatch(requestProduct());
  try {
    const response = await fetch(`https://api.mercadolibre.com/items/${productId}`);
    const product = await response.json();
    dispatch(fetchProduct(product));
  } catch (e) {
    global.alert(e.message);
  }
};

export const ADD_PRODUCT_CART = 'ADD_PRODUCT_CART';

export const addProductToCart = (product) => ({
  type: ADD_PRODUCT_CART,
  payload: {
    product,
  },
});

export const REMOVE_PRODUCT_CART = 'REMOVE_PRODUCT_CART';

export const removeProductToCart = (productId) => ({
  type: REMOVE_PRODUCT_CART,
  payload: {
    productId,
  },
});

export const REMOVE_ONE_PRODUCT_CART = 'REMOVE_ONE_PRODUCT_CART';

export const removeOneProductCart = (productId) => ({
  type: REMOVE_ONE_PRODUCT_CART,
  payload: {
    productId,
  }
});

export const SET_AVALIATION = 'SET_AVALIATION';

export const setAvaliations = (productId, avaliation) => ({
  type: SET_AVALIATION,
  payload: {
    productId,
    avaliation,
  }
});
