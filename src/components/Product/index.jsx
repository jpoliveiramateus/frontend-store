import React, { useState } from 'react';
import './styles.css';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from '../../redux/actions';
import Avaliations from '../Avaliations';
import { Rating } from '@mui/material';
import { BsTruck } from 'react-icons/bs';

const MAX_IMAGES = 6;

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const [currentImage, setCurrentImage] = useState(0);
  const cartList = useSelector((state) => state.reducerCart.cartProducts);
  const productReviews = useSelector((state) => state.reducerAvaliations[product.id]);

  const calculateAverageEvaluation = () => {
    let average = 0;

    if (productReviews) {
      productReviews.forEach((productReview) => {
        average += productReview.rating
      });

      return (average / productReviews.length)
    }

    return 0;
  }

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
          <p
            className="mb-1 text-muted"
            style={{ fontSize: '14px' }}
          >
            {product.condition === 'new' ? 'Novo' : 'Usado'} | {product.sold_quantity} vendidos
          </p>
          <h5
            className="product-detail-name"
            data-testid="product-detail-name"
          >
            {product.title}
          </h5>
          <Rating
            className="me-3"
            name="read-only"
            value={calculateAverageEvaluation()}
            sx={{
              color: '#3483FA',
            }}
            readOnly
          />
          {product.shipping.free_shipping
            && (
              <div className='d-flex flex-co align-items-center gap-2 mb-2'>
                <BsTruck
                  className='fs-5'
                  style={{ color: '#5da851' }}
                />
                <p
                  className="free-shipping"
                  data-testid="free-shipping"
                  style={{ fontSize: '14px' }}
                >
                  Frete grátis
                </p>
              </div>
            )}
          <h2
            className="fw-normal"
            style={{ fontSize: '35px' }}
          >
            {product.price
              .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
          </h2>
          <p className="off-5">5% OFF com Mercado Crédito</p>
          <p className="m-0 fw-semibold">{product.available_quantity > 0 && 'Estoque disponível'}</p>
          <p
            className="mb-3 text-muted fw-light"
            style={{ fontSize: '14px', marginTop: '-4px' }}
          >
            ({product.available_quantity} disponíveis)
          </p>
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
