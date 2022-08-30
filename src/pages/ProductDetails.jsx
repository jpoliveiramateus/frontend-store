/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { thunkProduct } from '../redux/actions';
import ProductDetail from '../components/ProductDetail';

const ProductDetails = ({ thunkProductAPI, product, loading }) => {
  const history = useHistory();
  const productId = history.location.pathname.split('/')[2];

  useEffect(() => {
    thunkProductAPI(productId);
  }, [productId, thunkProductAPI]);

  if (!loading && product) {
    return (
      <>
        <Header />
        <ProductDetail product={ product } />
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

const mapDispatchToProps = (dispatch) => ({
  thunkProductAPI: (productId) => dispatch(thunkProduct(productId)),
});

const mapStateToProps = (state) => ({
  loading: state.reducerProduct.loading,
  product: state.reducerProduct.product,
});

ProductDetails.propTypes = {
  thunkProductAPI: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
