import React from 'react';
import Form from '../components/Form';
import Header from '../components/Header';
import PaymentMethod from '../components/PaymentMethod';
import ReviewProducts from '../components/ReviewProducts';

function Checkout() {
  return (
    <>
      <Header />
      <div className="product-container shadow-sm">
        <ReviewProducts />
        <Form />
        <PaymentMethod />
      </div>
    </>
  )
}

export default Checkout;