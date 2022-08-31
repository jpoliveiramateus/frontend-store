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
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../redux/reducers';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react';


describe(`5 - Liste os produtos buscados por termos, com os dados resumidos, associados a esses termos`, () => {
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

  it(`Exibe todos os produtos retornados pela API, dado um determinado
      filtro`, async () => {

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
