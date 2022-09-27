import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TiArrowBack } from 'react-icons/ti';
import './styles.css';

function ReviewProducts() {
  const cart = useSelector((state) => state.reducerCart.cartProducts);
  const total = useSelector((state) => state.reducerCart.total);

  const history = useHistory();
  const goBack = () => history.goBack();

  return (
    <div className="d-flex flex-column gap-3 px-4 py-2 border-bottom">
      <div className='d-flex'>
        <TiArrowBack onClick={goBack} className="go-back fs-3" />
        <h5>Revise seus produtos</h5>
      </div>
      <div className="d-flex flex-column gap-3">
      {cart.map((product) => (
        <div key={product.id} className="d-flex align-items-center gap-4">
          <img
            src={product.thumbnail}
            alt={product.title}
            width='50px'
          />
          <div>
            <h6>{product.title}</h6>
            <h6 className="fw-normal">{`${product.quantidade}x ${(product.price * product.quantidade)
              .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`}</h6>
          </div>
        </div>
      ))}
      <h5 className="mt-2">{`Total ${total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`}</h5>
      </div>
    </div>
  )
}

export default ReviewProducts;