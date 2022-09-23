import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from '../App';
import mockedQueryResult from '../__mocks__/query';
import mockFetch from '../__mocks__/mockFetch';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../redux/reducers';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react';

describe(`11 - Avalie e comente acerca de um produto em sua tela de exibição detalhada`, () => {
  afterEach(() => {
    global.fetch.mockClear();
  });

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

  it('Avalia se é possível realizar uma avaliação na tela de detalhes de um produto', async () => {
    const evaluationEmail = `teste@trybe.com`;
    const evaluationContent = `Esta é uma avaliação sobre o produto realizada na tela de detalhe.`;
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    
    fireEvent.click(screen.getAllByTestId('category')[0]);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
    
    fireEvent.click(screen.getAllByTestId('product-detail-link')[0]);
    await waitFor(
      () => expect(screen.getByTestId('product-detail-name')).toHaveTextContent(
        mockedQueryResult.results[0].title,
      ),
    );

    fireEvent.change(
      screen.getByRole('textbox', {
        name: /email/i
      }),
      { target: { value: evaluationEmail } },
    );
    expect(screen.getByRole('textbox', {
      name: /email/i
    })).toHaveValue(evaluationEmail);
    
    fireEvent.change(
      screen.getByRole('textbox', {  name: /faça sua avaliação desse produto/i}),
      { target: { value: evaluationContent } },
    );
    expect(screen.getByRole('textbox', {  name: /faça sua avaliação desse produto/i}))
      .toHaveValue(evaluationContent);

    expect(screen.getByTestId('submit-review-btn')).toBeVisible();
    fireEvent.click(screen.getByTestId('submit-review-btn'));
  });
});
