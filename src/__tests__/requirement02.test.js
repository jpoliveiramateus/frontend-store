import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../redux/reducers';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react';

describe('2 - Crie uma página de listagem de produtos vazia', () => {
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

  it('A raiz da aplicação, em `<App />`, renderiza com sucesso', () => {});

  it(`A tela contém a mensagem pedida: 'Digite algum termo de pesquisa ou escolha uma
      categoria.'`, () => {
    expect(screen.getByTestId('home-initial-message')).toHaveTextContent(
      'Digite algum termo de pesquisa ou escolha uma categoria',
    );
  });
});
