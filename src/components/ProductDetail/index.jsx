/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from 'react';
import './styles.css';
import propTypes from 'prop-types';

const MAX_IMAGES = 6;

const ProductDetail = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(0);
  // console.log(product);
  return (
    <section className="product-container shadow-sm">
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
      </div>
    </section>
  );
};

ProductDetail.propTypes = {
  product: propTypes.objectOf(propTypes.any).isRequired,
};

export default ProductDetail;
