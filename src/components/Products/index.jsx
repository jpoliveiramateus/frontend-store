import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import './styles.css';
import { addProductToCart } from '../../redux/actions';

function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.reducerProducts.products);
  const cartList = useSelector((state) => state.reducerCart.cartProducts);
  const loading = useSelector((state) => state.reducerProducts.loading);

  if (loading) {
    return (
      <section className="loading section-products">
        <h3 className="title-products text-muted fw-light">Carregando...</h3>
      </section>
    );
  }

  if (!products) {
    return (
      <section className="section-products">
        <h3
          data-testid="home-initial-message"
          className="title-products fw-light text-muted"
        >
          Digite algum
          termo de pesquisa ou escolha uma categoria
        </h3>
      </section>
    );
  }

  const handleAddToCart = (product) => {
    let availableQuantity = true;

    cartList.forEach((productCart) => {
      if (productCart.id === product.id && product.available_quantity === productCart.quantidade) {
        availableQuantity = false;
      }
    });

    if (availableQuantity) {
      dispatch(addProductToCart(product));
    } else {
      window.alert('Quantidade indisponível');
    }
  }

  return (
    <section className="section-products">
      {products.length ? (
        <>
          <h3 className="title-products fw-light text-muted">Baseado na sua pesquisa</h3>
          <div className="products">
            {products.map((product) => (
              <div key={ product.id } data-testid="product" className="card">
                <Link
                  to={ `/product/${product.id}` }
                  data-testid="product-detail-link"
                  className="link d-flex flex-column"
                >
                  <img
                    src={ product.thumbnail }
                    alt={ product.title }
                    className="product-image align-self-center"
                  />
                  <hr />
                  <div className="d-flex flex-column p-3">
                    <p className="price">
                      { product.price
                        .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }
                    </p>
                    <h6
                      className="product-title text-start fw-light mt-4"
                    >
                      {product.title}
                    </h6>
                    { product.shipping.free_shipping
                      ? (
                        <p
                          className="free-shipping"
                          data-testid="free-shipping"
                        >
                          Frete grátis
                        </p>
                      ) : (
                        <p className="free-shipping">&nbsp;</p>
                      )}
                  </div>
                </Link>
                <div className="d-flex justify-content-center">
                  <button
                    type="button"
                    className="product-add-to-cart justify-content-end"
                    data-testid="product-add-to-cart"
                    onClick={() => handleAddToCart(product)}
                  >
                    Adicionar ao carrinho
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h5 data-testid="home-initial-message" className="fw-light text-muted">
          Nenhum produto foi encontrado
        </h5>
      )}
    </section>
  );
}

export default Products;
