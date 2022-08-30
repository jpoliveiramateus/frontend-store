import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import App from '../App';
import mockedCategoriesResult from '../__mocks__/categories';
import mockFetch from '../__mocks__/mockFetch';
import { Provider } from 'react-redux';
import store from '../redux/store';

describe(`4 - Liste as categorias de produtos disponíveis via API na página principal`, () => {
  it(`Exibe as categorias retornadas pela API na página de listagem de
      produtos`, async () => {

    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

    render(
      <Provider store={ store }>
        <App />
      </Provider>);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(screen.getAllByTestId('category').length).toEqual(
      mockedCategoriesResult.length,
    );
  });
});
