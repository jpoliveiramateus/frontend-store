import React from 'react';
import Header from '../components/Header';

function Cart() {
  return (
    <>
      <Header />
      <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
    </>
  );
}

export default Cart;
