import React from 'react';
import { useSelector } from 'react-redux';
import './styles.css';

const CardProduct = ({ cart }) => {
  const total = useSelector((state) => state.reducerCart.total);

  return (
    <section className="cart-container">
        {cart.map((product) => (
          <div key={product.id} className="cart-product">
            <button className="icon-delete">X</button>
            <img className="product-image-cart" src={product.thumbnail} alt={product.title} />
            <div className="product-desc-cart">
              <div>
                <h5
                  className="fw-normal m-0"
                  data-testid="shopping-cart-product-name"
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
                  >
                    -
                  </button>
                  <span data-testid="shopping-cart-product-quantity">{product.quantidade}</span>
                  <button
                    data-testid="product-increase-quantity"
                    className={product.available_quantity === product.quantidade ? 'disable-button' : 'active-button'}
                    disabled={product.available_quantity === product.quantidade}
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
          <button className="continue-purchase">Continuar a compra</button>
        </div>
      </section>
  );
}

export default CardProduct;