import React from 'react';
import Form from '../components/Form';
import Header from '../components/Header';
import ReviewProducts from '../components/ReviewProducts';

function Checkout() {
  return (
    <>
      <Header />
      <div className="product-container shadow-sm">
        <ReviewProducts />
        <Form />
      </div>
    </>
  )
}

export default Checkout;