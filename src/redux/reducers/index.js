import { combineReducers } from 'redux';
import { ADD_PRODUCT_CART, FETCH_CATEGORIES, FETCH_PRODUCT, FETCH_PRODUCTS,
  REMOVE_ONE_PRODUCT_CART,
REMOVE_PRODUCT_CART, REQUEST_PRODUCT, REQUEST_PRODUCTS, SET_AVALIATION, SET_MOBILE } from '../actions';

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
  return list.reduce((arrayCart, product) => {
    if (arrayCart.some((current) => current.id === product.id)) {
      arrayCart.forEach((cur) => {
        if (cur.id === product.id) {
          cur.quantidade += 1
        }
      });
      return arrayCart
    } else {
      return arrayCart.concat({ ...product, quantidade: 1 });
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
    case REMOVE_ONE_PRODUCT_CART:
      const products = state.cart;
      const differentProducts = products.filter((product) => product.id !== action.payload.productId);
      const sameProducts = products.filter((product) => product.id === action.payload.productId);
      const sameProductsFilter = sameProducts.slice(1, sameProducts.length);
      const listProducts = [...differentProducts, ...sameProductsFilter];

      const listCartProducts = [...state.cartProducts];
      listCartProducts.forEach((product) => {
        if (product.id === action.payload.productId) {
          product.quantidade -= 1;
        };
      });

      return {
        ...state,
        cart: listProducts,
        cartProducts: listCartProducts,
        total: caculateTotal(listProducts),
      }
    default:
      return state;
  }
}

const AVALIATIONS_STATE = [];

const reducerAvaliations = (state = AVALIATIONS_STATE, action) => {
  switch (action.type) {
    case SET_AVALIATION:
      const productId = action.payload.productId;
      if (state[productId]) {
        return {
          ...state,
          [action.payload.productId]: [...state[productId], action.payload.avaliation],
        }
      }

      return {
        ...state,
        [action.payload.productId]: [action.payload.avaliation],
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({ reducerCategories,
  reducerSetMobile,
  reducerProducts,
  reducerProduct,
  reducerCart,
  reducerAvaliations,
});

export default rootReducer;
