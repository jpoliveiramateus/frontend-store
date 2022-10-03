#  🛒 Projeto Frontend Store

![screencapture-frontend-store-jpoliveiramateus-vercel-app-2022-10-03-11_49_44 (1)](https://user-images.githubusercontent.com/99822908/193607740-f6e6252f-82d6-4fb2-95bf-5cd8b3ee2f12.png)

Frontend de uma loja online, com essa aplicação o usuário pode:

- Buscar produtos por termos e categorias a partir da API do Mercado Livre;
- Interagir com os produtos buscados de modo a adicioná-los e removê-los de um carrinho de compras em diferentes quantidades;
- Visualizar detalhes e avaliações prévias de um produto, bem como criar novas avaliações;
- E por fim, finalizar a compra (simulada) dos itens selecionados.

### Aplicação: https://frontend-store-jpoliveiramateus.vercel.app/

# 📄 Sobre

### Foi utilizado a API do Mercado Livre para realizar a busca de itens da loja, com os seguintes endpoints:
  
<details>
  <summary><strong>Para listar as categorias disponíveis</strong></summary>
  </br>
  • Endpoint: https://api.mercadolibre.com/sites/MLB/categories
</details>

<details>
  <summary><strong>Para buscar por itens por termo</strong></summary>
  </br>
  • Parâmetro de busca $QUERY (este parâmetro deve ser substituído pelo valor do campo de busca)
  </br>
  • Endpoint: https://api.mercadolibre.com/sites/MLB/search?q=$QUERY
</details>

<details>
  <summary><strong>Para buscar itens por categoria</strong></summary>
  </br>
  • Parâmetro de busca $CATEGORY_ID (este parâmetro deve ser substituído pelo ID da categoria selecionada)
  </br>
  • Endpoint: https://api.mercadolibre.com/sites/MLB/search?category=$CATEGORY_ID
</details>

<details>
  <summary><strong>Para buscar itens de uma categoria por termo</strong></summary>
  </br>
  • Parâmetro de busca $QUERY (este parâmetro deve ser substituído pelo valor do campo de busca)
  </br>
  • Parâmetro de busca $CATEGORY_ID (este parâmetro deve ser substituído pelo ID da categoria selecionada)
  </br>
  • Endpoint: https://api.mercadolibre.com/sites/MLB/search?category=$CATEGORY_ID&q=$QUERY
</details>

<details>
  <summary><strong>Para buscar detalhes de um item especifico</strong></summary>
  </br>
  • Parâmetro de busca $PRODUCT_ID (este parâmetro deve ser substituído pelo valor do campo de busca)
  </br>
  • Endpoint: https://api.mercadolibre.com/items/$PRODUCT_ID
</details>
    
Se você quiser aprender mais sobre a API do _Mercado Livre_, veja a [documentação](https://developers.mercadolivre.com.br/pt_br/itens-e-buscas).

## 📋 Execute o projeto em sua máquina

Clone o repositório:

```
git clone git@github.com:jpoliveiramateus/frontend-store.git
```

### 🔧 Instalação

Uma série de exemplos passo-a-passo que informam o que você deve executar para ter um ambiente de desenvolvimento em execução.

Entre na pasta e instale todas as dependências:

```
cd frontend-store/
npm install
```

Ao terminar execute a aplicação e acesse sua porta local:

```
npm start
```
http://localhost:3000/

![Captura de tela de 2022-10-03 13-21-49](https://user-images.githubusercontent.com/99822908/193628731-bf4fb992-10c1-42a6-ba21-d2a9b19c45bc.png)

## 🧪 Executando os testes

### ⚙️ Execute o seguinte comando no terminal, e pressione a tecla 'a' para executar todos os testes.

```
npm test
```

![Captura de tela de 2022-10-03 13-25-05](https://user-images.githubusercontent.com/99822908/193629397-5f9cbaa3-4f79-493d-982d-7bb38c7c6aa8.png)

# 🔎 Rotas

- Home: listagem de produtos. *https://frontend-store-jpoliveiramateus.vercel.app/
- Product Details: detalhes do produto e avaliações. *https://frontend-store-jpoliveiramateus.vercel.app/product/MLB1968210028
- Cart: listagem de produtos adicionados ao carrinho e calculo do total. *https://frontend-store-jpoliveiramateus.vercel.app/cart
- Checkout: revise seus produtos e conclua sua compra inserindo seus dados. *https://frontend-store-jpoliveiramateus.vercel.app/checkout

<div style="display: flex">
   <img src="https://user-images.githubusercontent.com/99822908/193632004-d8daf9ce-8ffd-4d86-ac0a-9e9fafd2c879.png" height="380px"></img>
   <img src="https://user-images.githubusercontent.com/99822908/193632187-955e6538-8535-42b8-a021-887dc2a13e11.png" height="380px"></img>
   <img src="https://user-images.githubusercontent.com/99822908/193632451-30305f0f-c5e2-4242-9a7c-8c9070bb1eb3.png" height="380px"></img>
   <img src="https://user-images.githubusercontent.com/99822908/193632717-da43ed21-eaa5-4b4b-a762-b8050dd6768f.png" height="380px"></img>
</div>

# 🤹 Algumas funções implementadas:

- Média de avaliações na página de detalhes.

<div style="display: flex">
   <img src="https://user-images.githubusercontent.com/99822908/193635925-cd9f46f7-e0f2-4b6b-b47f-d4038bf8a4f7.png" width="880px"></img>
   <img src="https://user-images.githubusercontent.com/99822908/193635910-69e5e90a-57df-4eba-87d0-b34bf699829a.png" width="880px"></img>
</div>

# 🛠 Ferramentas & Metodologias Utilizadas

* HTML5;
* CSS3;
* JavaScript ES6;
* [React](https://pt-br.reactjs.org/);
* [Redux](https://redux.js.org/);
* [Redux Thunk](https://github.com/reduxjs/redux-thunk);
* [Redux Persist](https://github.com/rt2zz/redux-persist);
* [Jest e React Testing Library](https://testing-library.com/);
* Mobile First;
* React Icons (Biblioteca de ícones);
* [React Bootstrap](https://react-bootstrap.github.io/);
* [Bootstrap](https://getbootstrap.com/);
* [MUI](https://mui.com/pt/);
* [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/).

# 🧑🏻‍💻 Status - em desenvolvimento

## Próximos pontos de melhoria:

- Barra de pesquisa no mobile;
- Seletor dropdown para ordenar a lista de produto por maior e menor preço;
- Animação no carrinho para quando um produto for adicionado;
- Página (NotFound) ao acessar rota inválida.
---
⌨️ desenvolvido por [João Pedro Oliveira](https://www.linkedin.com/in/jpoliveira7/) 😄
