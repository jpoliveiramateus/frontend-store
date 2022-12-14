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

const CART_STATE = { cartProducts: [] };

const calcutateTotal = (listCart) => {
  let total = 0;

  listCart.forEach((product) => {
    total += product.price * product.quantidade;
  });

  return total;
}

const reducerCart = (state = CART_STATE, action) => {
  switch (action.type) {
    case ADD_PRODUCT_CART:
      const newListCart = [...state.cartProducts];
      const productById = newListCart.find((product) => product.id === action.payload.product.id);
      let newListCartWithQuantity = [];
      if (productById) {
        newListCartWithQuantity = newListCart.map((product) => {
          if (product.id === action.payload.product.id) {
            product.quantidade += 1;
            return product;
          } else {
            return product;
          }
        });
      } else {
        newListCartWithQuantity.push(...newListCart, { ...action.payload.product, quantidade: 1 })
      }
      return {
        ...state,
        cartProducts: newListCartWithQuantity,
        total: calcutateTotal(newListCartWithQuantity),
      }
    case REMOVE_PRODUCT_CART:
      const newList = state.cartProducts.filter((product) => product.id !== action.payload.productId);
      return {
        ...state,
        cartProducts: newList,
        total: calcutateTotal(newList),
      }
    case REMOVE_ONE_PRODUCT_CART:
      const listCartProducts = [...state.cartProducts];

      listCartProducts.forEach((product) => {
        if (product.id === action.payload.productId) {
          product.quantidade -= 1;
        };
      });

      return {
        ...state,
        cartProducts: listCartProducts,
        total: calcutateTotal(listCartProducts),
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
