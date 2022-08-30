import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { Provider } from 'react-redux';
import store from '../redux/store';

describe('2 - Crie uma página de listagem de produtos vazia', () => {
  it('A raiz da aplicação, em `<App />`, renderiza com sucesso', () => {
    render(
      <Provider store={ store }>
        <App />
      </Provider>);
  });

  it(`A tela contém a mensagem pedida: 'Digite algum termo de pesquisa ou escolha uma
      categoria.'`, () => {
    render(
      <Provider store={ store }>
        <App />
      </Provider>);
    expect(screen.getByTestId('home-initial-message')).toHaveTextContent(
      'Digite algum termo de pesquisa ou escolha uma categoria',
    );
  });
});
