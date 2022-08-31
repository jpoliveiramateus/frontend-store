import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../redux/reducers';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react';

describe('3 - Crie a página do carrinho de compras', () => {
  beforeEach(() => {
    const persistConfig = {
      key: 'root',
      storage,
    }
    const persistedReducer = persistReducer(persistConfig, rootReducer)
    const store = createStore(persistedReducer, applyMiddleware(thunk));
    const persistor = persistStore(store);

    render(
      <Provider store={ store }>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>);
  });

  it('A home deve ter o botão do carrinho de compras', () => {
    expect(screen.getByTestId('shopping-cart-button')).toBeDefined();
  });

  it(`Clicar no botão deve levar à página do carrinho vazio, com a mensagem
      'Seu carrinho está vazio' nela`, async () => {
    fireEvent.click(screen.getByTestId('shopping-cart-button'));
    await waitFor(() => screen.getByTestId('shopping-cart-empty-message'));
    expect(screen.getByTestId('shopping-cart-empty-message')).toHaveTextContent(
      'Seu carrinho está vazio',
    );
  });
});
