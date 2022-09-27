import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addProductToCart, removeOneProductCart, removeProductToCart } from '../../redux/actions';
import './styles.css';

const CardProductMobile = ({ cart }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const total = useSelector((state) => state.reducerCart.total);

  return (
    <section className="cart-container">
        {cart.map((product) => (
          <div key={product.id} className="cart-product">
            <button
              className="icon-delete"
              onClick={() => dispatch(removeProductToCart(product.id))}
            >
              X
            </button>
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
            </div>
            <div className="container-quantity-price">
              <div className="container-quantity">
                <div className="quantity-count">
                  <button
                    data-testid="product-decrease-quantity"
                    className={product.quantidade > 1 ? 'active-button' : 'disable-button'}
                    disabled={product.quantidade === 1}
                    onClick={() => dispatch(removeOneProductCart(product.id))}
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
          </div>
        ))}
        <div className="continue-purchase-container">
          <h3
            className="total-cart"
          >
            {`Total ${total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`}
          </h3>
          <button
            className="continue-purchase"
            data-testid="checkout-products"
            onClick={() => history.push('/checkout')}
          >
            Continuar a compra
          </button>
        </div>
      </section>
  );
}

export default CardProductMobile;