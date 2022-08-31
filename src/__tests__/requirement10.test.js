import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from '../App';
import * as api from '../services/api';
import mockedQueryResult from '../__mocks__/query';
import mockFetch from '../__mocks__/mockFetch';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../redux/reducers';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react';

describe(`10 - Visualize a lista de produtos adicionados ao carrinho em sua página e permita a manipulação da sua quantidade`, () => {
  beforeEach(() => {
    const persistConfig = {
      key: 'root',
      storage,
    }
    const persistedReducer = persistReducer(persistConfig, rootReducer)
    const store = createStore(persistedReducer, applyMiddleware(thunk));
    const persistor = persistStore(store);

    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    render(
      <Provider store={ store }>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>);
  });
  
  it('Adiciona produtos ao carrinho e manipula suas quantidades', async () => {
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    fireEvent.click(screen.getAllByTestId('category')[0]);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
    fireEvent.click(screen.getAllByTestId('product-add-to-cart')[0]);
    fireEvent.click(screen.getAllByTestId('product-add-to-cart')[1]);
    fireEvent.click(screen.getByTestId('shopping-cart-button'));
    await waitFor(() => expect(screen.getAllByTestId('shopping-cart-product-name')));
    expect(screen.getAllByTestId('shopping-cart-product-name')[0]).toHaveTextContent(
      mockedQueryResult.results[0].title,
    );
    expect(screen.getAllByTestId('shopping-cart-product-quantity')[0]).toHaveTextContent(
      '1',
    );
    expect(screen.getAllByTestId('shopping-cart-product-name')[1]).toHaveTextContent(
      mockedQueryResult.results[1].title,
    );
    expect(screen.getAllByTestId('shopping-cart-product-quantity')[1]).toHaveTextContent(
      '1',
    );
    fireEvent.click(screen.getAllByTestId('product-increase-quantity')[0]);
    fireEvent.click(screen.getAllByTestId('product-increase-quantity')[0]);
    fireEvent.click(screen.getAllByTestId('product-decrease-quantity')[0]);
    fireEvent.click(screen.getAllByTestId('product-increase-quantity')[1]);
    fireEvent.click(screen.getAllByTestId('product-increase-quantity')[1]);
    expect(screen.getAllByTestId('shopping-cart-product-quantity')[0]).toHaveTextContent(
      '2',
    );
    expect(screen.getAllByTestId('shopping-cart-product-quantity')[1]).toHaveTextContent(
      '3',
    );
    fireEvent.click(screen.getAllByTestId('product-decrease-quantity')[0]);
    fireEvent.click(screen.getAllByTestId('product-decrease-quantity')[0]);
    expect(screen.getAllByTestId('shopping-cart-product-quantity')[0]).toHaveTextContent(
      '1',
    );
  });
});
