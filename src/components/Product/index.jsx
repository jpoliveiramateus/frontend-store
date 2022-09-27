import React, { useState } from 'react';
import './styles.css';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from '../../redux/actions';
import Avaliations from '../Avaliations';

const MAX_IMAGES = 6;

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const [currentImage, setCurrentImage] = useState(0);
  const cartList = useSelector((state) => state.reducerCart.cartProducts);

  const handleAddToCart = (product) => {
    let availableQuantity = true;

    cartList.forEach((productCart) => {
      if (productCart.id === product.id && product.available_quantity === productCart.quantidade) {
        availableQuantity = false;
      }
    });

    if (availableQuantity) {
      dispatch(addProductToCart(product));
    } else {
      window.alert('Quantidade indisponível');
    }
  }

  return (
    <section className="product-container shadow-sm">
      <div className="product-details-container">
        <div className="container-images">
          <section className="product-detail-images">
            {product.pictures.slice(0, MAX_IMAGES).map((picture, index) => (
              <img
                key={ picture.id }
                src={ picture.url }
                alt={ product.title }
                className={ index === currentImage ? 'image-active' : 'image-not-active' }
                onMouseOver={ () => setCurrentImage(index) }
              />
            ))}
          </section>
          <img
            className="product-detail-img"
            src={ product.pictures[currentImage].url }
            alt={ product.title }
          />
          <section className="product-detail-images" />
        </div>
        <div className="product-container-info">
          <h5
            className="product-detail-name"
            data-testid="product-detail-name"
          >
            {product.title}
          </h5>
          {product.shipping.free_shipping
            && (
              <p
                className="free-shipping"
                data-testid="free-shipping"
              >
                Frete grátis
              </p>
            )}
          <h2 className="fw-normal">
            {product.price
              .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
          </h2>
          <p className="off-5">5% OFF com Mercado Crédito</p>
          <button
            data-testid="product-detail-add-to-cart"
            className="product-detail-add-to-cart"
            onClick={() => handleAddToCart(product)}
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
      <Avaliations product={product} />
    </section>
  );
};

Product.propTypes = {
  product: propTypes.objectOf(propTypes.any).isRequired,
};

export default Product;
