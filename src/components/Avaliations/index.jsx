import React from 'react';
import './styles.css';

const Avaliations = ({ product }) => {
  return (
    <section className="container-avaliations">
      <h3 className="evaluation-title">Avalie esse produto</h3>
      <form onSubmit={() => console.log('enviou')} className="form-product-detail">
        <div className="container-email-rating">
          <input
            type="email"
            name="evaluation-email"
            id="evaluation-email"
            data-testid="product-detail-email"
            className="product-detail-email"
            placeholder="Email"
          />

          <div className="estrelas">
            <input type="radio" id="cm_star-empty" name="fb" value="" defaultChecked/>

            <label data-testid="1-rating" htmlFor="cm_star-1"><i className="fa"></i></label>
            <input type="radio" id="cm_star-1" name="fb" value="1" />

            <label data-testid="2-rating" htmlFor="cm_star-2"><i className="fa"></i></label>
            <input type="radio" id="cm_star-2" name="fb" value="2" />

            <label data-testid="3-rating" htmlFor="cm_star-3"><i className="fa"></i></label>
            <input type="radio" id="cm_star-3" name="fb" value="3" />

            <label data-testid="4-rating" htmlFor="cm_star-4"><i className="fa"></i></label>
            <input type="radio" id="cm_star-4" name="fb" value="4" />

            <label data-testid="5-rating" htmlFor="cm_star-5"><i className="fa"></i></label>
            <input type="radio" id="cm_star-5" name="fb" value="5" />
          </div>
        </div>

        <textarea
          name="evaluation-detail"
          id="evaluation-detail"
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
      </div>
    </section>
  );
}

export default Avaliations;
