import { combineReducers } from 'redux';
import { ADD_PRODUCT_CART, FETCH_CATEGORIES, FETCH_PRODUCT, FETCH_PRODUCTS,
REMOVE_PRODUCT_CART, REQUEST_PRODUCT, REQUEST_PRODUCTS, SET_MOBILE } from '../actions';

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

const CART_STATE = { cart: [], cartProducts: [] };

const cartFilteredWithQuantity = (list) => {
  return list.reduce((acc, product) => {
    if (acc.some((current) => current.id === product.id)) {
      acc.forEach((cur) => {
        if (cur.id === product.id) {
          cur.quantidade += 1
        }
      });
      return acc
    } else {
      return acc.concat({ ...product, quantidade: 1 });
    }
  }, []);
}

const caculateTotal = (list) => list.reduce((acc, cur) => acc + cur.price, 0)

const reducerCart = (state = CART_STATE, action) => {
  switch (action.type) {
    case ADD_PRODUCT_CART:
      const newListCart = [...state.cart];
      newListCart.push(action.payload.product);
      return {
        ...state,
        cart: newListCart,
        cartProducts: cartFilteredWithQuantity(newListCart),
        total: caculateTotal(newListCart),
      }
    case REMOVE_PRODUCT_CART:
      const newList = state.cart.filter((product) => product.id !== action.payload.productId);
      return {
        ...state,
        cart: newList,
        cartProducts: cartFilteredWithQuantity(newList),
        total: caculateTotal(newList),
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({ reducerCategories,
  reducerSetMobile,
  reducerProducts,
  reducerProduct,
  reducerCart });

export default rootReducer;
