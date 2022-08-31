import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import App from '../App';
import mockedCategoriesResult from '../__mocks__/categories';
import mockFetch from '../__mocks__/mockFetch';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../redux/reducers';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react';

describe(`4 - Liste as categorias de produtos disponíveis via API na página principal`, () => {
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

  it(`Exibe as categorias retornadas pela API na página de listagem de
      produtos`, async () => {
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(screen.getAllByTestId('category').length).toEqual(
      mockedCategoriesResult.length,
    );
  });
});
