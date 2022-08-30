import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from '../App';
import mockedQueryResult from '../__mocks__/query';
import mockFetch from '../__mocks__/mockFetch';
import { Provider } from 'react-redux';
import store from '../redux/store';

describe(`12 - Finalize a compra vendo um resumo dela, preenchendo os seus dados e escolhendo a forma de pagamento`, () => {
  it(`Avalia se é possível, a partir de um carrinho de compras com produtos, acessar a página de checkout com um formulário válido`, async () => {
    const fullName = 'my full name';
    const email = 'my@email.com';
    const cpf = '12345678900';
    const phone = '99999999999';
    const cep = '99999999';
    const address = 'my address is where I live';
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch)
    render(
      <Provider store={ store }>
        <App />
      </Provider>);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    fireEvent.click(screen.getAllByTestId('category')[0]);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
    fireEvent.click(screen.getAllByTestId('product-add-to-cart')[0]);
    fireEvent.click(screen.getByTestId('shopping-cart-button'));
    await waitFor(() => expect(screen.getAllByTestId('shopping-cart-product-name')));
    expect(screen.getByTestId('shopping-cart-product-name')).toHaveTextContent(
      mockedQueryResult.results[0].title,
    );
    expect(screen.getByTestId('shopping-cart-product-quantity')).toHaveTextContent('1');
    fireEvent.click(screen.getByTestId('checkout-products'));
    fireEvent.change(
      screen.getByTestId('checkout-fullname'),
      { target: { value: fullName } },
    );
    fireEvent.change(screen.getByTestId('checkout-email'), { target: { value: email } });
    fireEvent.change(screen.getByTestId('checkout-cpf'), { target: { value: cpf } });
    fireEvent.change(screen.getByTestId('checkout-phone'), { target: { value: phone } });
    fireEvent.change(screen.getByTestId('checkout-cep'), { target: { value: cep } });
    fireEvent.change(
      screen.getByTestId('checkout-address'),
      { target: { value: address } },
    );
    expect(screen.getByTestId('checkout-fullname')).toHaveValue(fullName);
    expect(screen.getByTestId('checkout-email')).toHaveValue(email);
    expect(screen.getByTestId('checkout-cpf')).toHaveValue(cpf);
    expect(screen.getByTestId('checkout-phone')).toHaveValue(phone);
    expect(screen.getByTestId('checkout-cep')).toHaveValue(cep);
    expect(screen.getByTestId('checkout-address')).toHaveValue(address);
  });
});
