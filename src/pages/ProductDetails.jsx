import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { thunkProduct } from '../redux/actions';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const product = useSelector((state) => state.reducerProduct.product);
  const loading = useSelector((state) => state.reducerProduct.loading);
  const productId = history.location.pathname.split('/')[2];

  useEffect(() => {
    dispatch(thunkProduct(productId));
  }, [dispatch, productId]);

  if (!loading && product) {
    return (
      <>
        <Header />
        <Product product={ product } />
      </>
    );
  }

  return (
    <>
      <Header />
      <section className="loading section-products">
        <h3 className="title-products text-muted fw-light">Carregando...</h3>
      </section>
    </>
  );
};

export default ProductDetails;
