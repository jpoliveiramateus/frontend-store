import React from 'react';
import Header from '../components/Header';
import Carousel from '../components/Slide';
import Payments from '../components/Payments';
import Products from '../components/Products';

function Home() {
  return (
    <>
      <Header />
      <Carousel />
      <main className="p-2 px-md-5">
        <Payments />
        <Products />
      </main>
    </>
  );
}

export default Home;
