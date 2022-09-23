import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAvaliations } from '../../redux/actions';
import './styles.css';
import { Rating, TextField } from '@mui/material';

const Avaliations = ({ product }) => {
  const dispatch = useDispatch();
  const productReviews = useSelector((state) => state.reducerAvaliations[product.id]);
  
  const [email, setEmail] = useState('');
  const [avaliation, setAvaliation] = useState('');
  const [rating, setRating] = useState(0);

  const [submitForm, setSubmitForm] = useState(false);

  const clearFormAndSubmit = () => {
    setEmail('');
    setAvaliation('');
    setRating(0);
    setSubmitForm(false);
  }

  // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
  const validateEmail = () => /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);

  const validateForm = (e) => {
    e.preventDefault();
    setSubmitForm(true);

    if (validateEmail(email) === false || rating === 0) {
      // break
      return
    }
    
    const avaliationPayload = {
      email,
      avaliation,
      rating,
    }

    dispatch(setAvaliations(product.id, avaliationPayload));
    clearFormAndSubmit();
  }

  return (
    <section className="container-avaliations">
      <h3 className="evaluation-title">Avalie esse produto</h3>
      <form onSubmit={validateForm} className="form-product-detail">
        <div className="container-email-rating">
          <TextField
            type="email"
            error={validateEmail(email) === false && submitForm}
            id="standard-error-helper-text"
            className="w-100 mb-2"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            label="Email"
            helperText={(validateEmail(email) === false && submitForm) && `Email inválido.`}
            variant="standard"
          />
        </div>

        <Rating
          name="simple-controlled"
          data-testid="testeid"
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

        <TextField
          helperText={(rating === 0 && submitForm) && `*Selecione sua classificação`}
          error={rating === 0 && submitForm}
          id="outlined-multiline-static"
          value={avaliation}
          onChange={(event) => setAvaliation(event.target.value)}
          label="Faça sua avaliação desse produto"
          className="product-detail-evaluation"
          multiline
          rows={4}
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
