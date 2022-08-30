import React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent
} from '@testing-library/react';
import App from '../App';
import { Provider } from 'react-redux';
import store from '../redux/store';
import mockedQueryResult from '../__mocks__/query';
import mockFetch from '../__mocks__/mockFetch';


describe(`5 - Liste os produtos buscados por termos, com os dados resumidos, associados a esses termos`, () => {
  it(`Exibe todos os produtos retornados pela API, dado um determinado
      filtro`, async () => {

    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    render(
      <Provider store={ store }>
        <App />
      </Provider>);
    fireEvent.change(screen.getByTestId('query-input'), {
      target: {
        value: 'livro'
      },
    });
    fireEvent.click(screen.getByTestId('query-button'));
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(screen.getAllByTestId('product').length).toEqual(
      mockedQueryResult.results.length,
    );
  });
});
