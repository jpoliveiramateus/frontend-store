import React from 'react';
import './styles.css';

function Payments() {
  return (
    <section
      className="d-flex justify-content-between
      my-3 my-md-5 bg-white p-1 rounded shadow-sm"
    >
      <div className="border-blue" />
      <div
        className="d-none
          d-lg-flex flex-column justify-content-center border-1 border-end pe-4"
      >
        <h6 className="fw-light mb-0">Pagamento rápido e seguro</h6>
        <p
          className="fw-normal text-muted m-0"
          style={ { fontSize: '13px' } }
        >
          com Mercado Pago
        </p>
      </div>

      <div
        className="d-flex align-items-center justify-content-center"
      >
        <img
          src="https://http2.mlstatic.com/storage/homes-korriban/assets/images/payments/credit-card.svg"
          alt="Até 10 parcelas sem juros"
          width="50px"
        />
        <div className="ms-3">
          <h6 className="fw-normal mb-0">Até 10 parcelas sem juros</h6>
          <p
            className="fw-light link link-primary m-0"
            style={ { fontSize: '13px' } }
          >
            Ver mais
          </p>
        </div>
      </div>

      <div
        className="d-none d-md-flex align-items-center justify-content-center"
      >
        <img
          src="https://http2.mlstatic.com/storage/homes-korriban/assets/images/payments/mercado-creditsv2.svg"
          alt="Parcelamento sem cartão"
          width="50px"
        />
        <div className="ms-3">
          <h6 className="fw-normal mb-0">Parcelamento sem cartão</h6>
          <p
            className="fw-light link link-primary m-0"
            style={ { fontSize: '13px' } }
          >
            Conheça o Mercado Crédito
          </p>
        </div>
      </div>

      <div
        className="d-none d-xl-flex align-items-center justify-content-center"
      >
        <img
          src="https://http2.mlstatic.com/storage/homes-korriban/assets/images/payments/qr.svg"
          alt="Via Pix"
          width="50px"
        />
        <div className="ms-3">
          <h6 className="fw-normal mb-0">Via Pix</h6>
          <p
            className="fw-light link link-primary m-0"
            style={ { fontSize: '13px' } }
          >
            Ver mais
          </p>
        </div>
      </div>

      <img
        src="https://http2.mlstatic.com/storage/homes-korriban/assets/images/payments/view-more.svg"
        alt="Meios de pagamento"
        width="50px"
        className="ms-sm-5 me-4 link"
      />
    </section>
  );
}

export default Payments;
