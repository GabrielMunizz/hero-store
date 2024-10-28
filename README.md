# Hero Store - API para Loja de Itens para Heróis

Este é o backend da Hero Store, uma API construída com Node.js e TypeScript, utilizando Express e Sequelize para gerenciar dados em um banco de dados MySQL. O projeto foi feito para oferecer uma plataforma de compra e gerenciamento de itens, integrada com um banco de dados e Docker para facilitar a configuração e execução.

## Tecnologias Utilizadas

- **Node.js** com **TypeScript**
- **Express** para criação das rotas e middlewares
- **Sequelize** para ORM e manipulação do banco de dados MySQL
- **Docker** para containers e gerenciamento do ambiente de desenvolvimento
- **MySQL** como banco de dados
- **Jest** para testes unitários e de integração
- **Autenticação JWT** para login seguro dos heróis

## Instalação e Configuração

**Atenção: Para rodar o projeto, você precisará ter o Docker instalado. Caso não tenha, siga as instruções em** [**Docker Documentation](https://docs.docker.com/get-started/get-docker/).**

1. **Clone o repositório**:

```jsx
git clone git@github.com:GabrielMunizz/hero-store.git
```

2. **Instale as dependências**:

```jsx
npm install
```

3. **Monte os containers**:

```jsx
docker compose up -d --build
```

4. **Verifique o status do banco de dados**:
Liste os containers e certifique-se de que o status do banco `hero_store_db` esteja como "healthy". Use o comando:

```jsx
docker container ps
```

5. **Execute as migrations e seed do banco de dados**:

```jsx
npm run db:reset
```

6. **Desmonte os containers** (quando necessário):

```jsx
docker compose down
```

Como padrão, a API vai rodar localmente na porta 3001. Verificar no seu navegador a API rodando no endereço [http://localhost:3001/products](http://localhost:3001/products)

Para utilizar todas as rotas da API será necessário utilizar as ferramentas de requisições HTTP, como Postman, Insomnia ou Thunder Client (no VSCode).  

**Insomnia:** [https://insomnia.rest/download](https://insomnia.rest/download)
**Postman:** [https://www.postman.com/downloads/](https://www.postman.com/downloads/)

## Documentação da API

A API permite a manipulação de itens e pedidos para heróis. As rotas e exemplos de uso estão detalhados abaixo.

### Rota `/products`

- **GET** `/products`: Retorna a lista de itens pré-cadastrados.

Retorno:

```json
[
  {
    "id": 1,
    "name": "Excalibur",
    "price": "10 peças de ouro",
    "orderId": 1
  },
  {
    "id": 2,
    "name": "Espada Justiceira",
    "price": "20 peças de ouro",
    "orderId": 1
  },
  {
    "id": 3,
    "name": "Lira de Orfeu",
    "price": "1 peça de ouro",
    "orderId": 2
  },
  {
    "id": 4,
    "name": "Armadura de Aquiles",
    "price": "1 peça de ouro",
    "orderId": 2
  },
  {
    "id": 5,
    "name": "Harpa de Dagda",
    "price": "15 peças de ouro",
    "orderId": 3
  }
]
```

- **GET** `/products/:id`: Retorna um item específico pelo ID.

Retorno da rota `/products/1`:

```json
{
  "id": 1,
  "name": "Excalibur",
  "price": "10 peças de ouro",
  "orderId": 1
}
```

- **POST** `/products`: Adiciona um novo item. Formato do body:

```json
{
  "name": "Balestra do Van Helsing",
  "price": "30 peças de ouro",
  "orderId": 1
}
```

- **PATCH** `/products`: Atualiza informações de um item existente. Formato do body:

```json
{
  "id": 1, 
  "name": "Novo nome do item",
  "price": "Novo preço do item",
  "orderId": 2 
}
```

- **DELETE** `/products/:id`: Deleta um item pelo ID. Retorna status `204` `NO_CONTENT`.

### Rota `/orders`

- **GET** `/orders`: Retorna a lista de todos os pedidos de compra dos itens.

### Rota `/login`

Permite que heróis façam login com um usuário pré-cadastrado.

- **POST** `/login`: Realiza login. Formato do body:

```json
{
  "username": "Hagar",
  "password": "terrível"
}
```

Exemplo de retorno:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJIYWdhciIsImlhdCI6MTczMDE1NDI2NX0.B622gI8l0QGlJD5BhEBKt1p2UJm4xNLMtmrgI4txeas"
}
```

## Testes

Para rodar os testes unitários e de integração, use o comando no terminal:

```json
npm run test:local
```

Caso queira ver a cobertura dos testes, use o comando:

```json
npm run test:coverage
```