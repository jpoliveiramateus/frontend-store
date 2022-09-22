import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAvaliations } from '../../redux/actions';
import './styles.css';
import { Rating } from '@mui/material';

const Avaliations = ({ product }) => {
  const dispatch = useDispatch();
  const productReviews = useSelector((state) => state.reducerAvaliations[product.id]);
  
  const [email, setEmail] = useState('');
  const [avaliation, setAvaliation] = useState('');
  const [rating, setRating] = useState(0);

  const clearForm = () => {
    setEmail('');
    setAvaliation('');
    setRating(0);
  }

  // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
  const validEmail = () => /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);

  const validateForm = (e) => {
    e.preventDefault();

    if (validEmail(email) === false) {
      return alert('Preencha o email(inválido)!');
    }

    if (rating === '') {
      return alert('De sua classificação!');
    }

    if (avaliation.length < 5) {
      return alert('Preencha a avaliação!');
    }

    const avaliationPayload = {
      email,
      avaliation,
      rating,
    }

    dispatch(setAvaliations(product.id, avaliationPayload));
    clearForm();
  }

  return (
    <section className="container-avaliations">
      <h3 className="evaluation-title">Avalie esse produto</h3>
      <form onSubmit={validateForm} className="form-product-detail">
        <div className="container-email-rating">
          <input
            type="email"
            name="evaluation-email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            id="evaluation-email"
            data-testid="product-detail-email"
            className="product-detail-email"
            placeholder="Email"
          />
        </div>

        <Rating
          name="simple-controlled"
          value={rating}
          size="large"
          className="w-25"
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          sx={{
            color: '#3483FA',
          }}
        />

        <textarea
          name="evaluation-detail"
          id="evaluation-detail"
          value={avaliation}
          onChange={(event) => setAvaliation(event.target.value)}
          cols="40"
          rows="5"
          data-testid="product-detail-evaluation"
          className="product-detail-evaluation"
          placeholder="Faça sua avaliação desse produto!"
        />
        <br />

        <button
          type="submit"
          data-testid="submit-review-btn"
          className="submit-review-btn"
        >
          Avaliar
        </button>
      </form>
      <div className="container-reviews">
        <h3 className="title-reviews">Opiniões sobre {product.title}</h3>
        <div className="mt-5">
          {productReviews ? (
            productReviews.map((review, index) => (
              <div className="w-100 border-bottom mb-2 p-2" key={`${review.email}-${index}`}>
                <div className="d-flex flex-column flex-md-row justify-content-between">
                  <p className="m-0 mb-2 fw-bolder">{review.email}</p>
                  <Rating
                    className="me-3"
                    name="read-only"
                    value={review.rating}
                    sx={{
                      color: '#3483FA',
                    }}
                    readOnly
                  />
                </div>
                <p className="m-0 mb-2">{review.avaliation}</p>
              </div>
            ))
          ) : (
            <p className="text-muted fs-5">Esse produto ainda não possui avaliações</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Avaliations;
