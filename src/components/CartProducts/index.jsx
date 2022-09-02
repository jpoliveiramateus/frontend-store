import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css';
import CardProductMobile from '../CardProductMobile';
import { addProductToCart, removeProductToCart } from '../../redux/actions';
import { useHistory } from 'react-router-dom';

const CartProducts = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.reducerCart.cartProducts);
  const total = useSelector((state) => state.reducerCart.total);
  const mobile = useSelector((state) => state.reducerSetMobile.mobile);

  if (!cart.length) {
    return (
      <h3
        className="shopping-cart-empty-message text-muted fw-light"
        data-testid="shopping-cart-empty-message"
      >
        Seu carrinho está vazio
      </h3>
    );
  }

  if (mobile) {
    return (
      <CardProductMobile cart={cart} />
    );
  }
  
  return (
    <section className="cart-container">
      {cart.map((product) => (
        <div key={product.id} className="cart-product">
          <img
            className="product-image-cart"
            src={product.thumbnail}
            alt={product.title}
            onClick={() => history.push(`/product/${product.id}`)}
          />
          <div className="product-desc-cart">
            <div>
              <h5
                className="fw-normal m-0 shopping-cart-product-name"
                data-testid="shopping-cart-product-name"
                onClick={() => history.push(`/product/${product.id}`)}
              >
                {product.title}
              </h5>
              {product.shipping.free_shipping
                && (
                  <span
                    className="free-shipping"
                    data-testid="free-shipping"
                  >
                    Frete grátis
                  </span>
                )
              }
            </div>
            <button
              className="button-delete"
              onClick={() => dispatch(removeProductToCart(product.id))}
            >
              Excluir
            </button>
          </div>
          <div className="container-quantity">
            <div className="quantity-count">
              <button
                data-testid="product-decrease-quantity"
                className={product.quantidade > 1 ? 'active-button' : 'disable-button'}
                disabled={product.quantidade === 1}
              >
                -
              </button>
              <span data-testid="shopping-cart-product-quantity">{product.quantidade}</span>
              <button
                data-testid="product-increase-quantity"
                className={product.available_quantity === product.quantidade ? 'disable-button' : 'active-button'}
                disabled={product.available_quantity === product.quantidade}
                onClick={() => dispatch(addProductToCart(product))}
              >
                +
              </button>
            </div>
            <span className="quantity">{product.available_quantity} disponíveis</span>
          </div>
          <h4 className="product-price-cart fw-normal">{(product.price * product.quantidade)
            .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h4>
        </div>
      ))}
      <div className="continue-purchase-container">
        <h3
          className="total-cart"
        >
          {`Total ${total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`}
        </h3>
        <button className="continue-purchase">Continuar a compra</button>
      </div>
    </section>
  );
}

export default CartProducts;