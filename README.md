# Node.js Blog CRUD Application

Este é um projeto Node.js para criar um CRUD (Create, Read, Update, Delete) para uma aplicação de blog. O projeto utiliza MongoDB como banco de dados e inclui um Dockerfile e um docker-compose para facilitar a implantação e execução.

## Pré-requisitos

Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina antes de prosseguir.

- [Docker Installation](https://docs.docker.com/get-docker/)
- [Docker Compose Installation](https://docs.docker.com/compose/install/)

## Configuração do Ambiente

1. Clone este repositório:

    ```bash
    git clone git@github.com:Bigtrade-Fintech/teste-tecnico-bigtrade.git
    ```

2. Navegue até o diretório do projeto:

    ```bash
    cd teste-tecnico-bigtrade
    ```

3. As variáveis de ambiente estão presentes no docker-compose.yml

## Docker

O projeto inclui um Dockerfile e um docker-compose.yaml para facilitar a configuração e execução do ambiente. Para iniciar o aplicativo, execute o seguinte comando:

```bash
docker compose up -d
```

O aplicativo estará acessível em http://localhost:3000.

# Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

- **src/**: Contém o código-fonte da aplicação.
  - **controllers/**: Controladores para lidar com as operações CRUD.
  - **models/**: Modelos de dados MongoDB.
  - **routes/**: Rotas da aplicação.
  - **index.js**: Ponto de entrada da aplicação.
- **docker-compose.yml**: Arquivo de configuração do Docker Compose.

# API Endpoints

A API oferece os seguintes endpoints:

## Usuários:

- `POST /users`: Criar um novo usuário.
- `PUT /users/:id`: Atualizar informações do usuário.
- `GET /users/:id`: Retorna os dados do usuário de acordo com o id
- `DELETE /users/:id`: Excluir um usuário.

  ```json
    {
      "id": 1, // Deve ter um id único por usúario
      "displayName": "John Doe",
      "email": "john@email.com", // Deve ser um email único
      "password": "123456",
    }
  ```

## Posts:

- `POST /posts`: Criar um novo post.
- `GET /posts`: Obter todos os posts.
- `GET /posts/:id`: Obter um post específico.
- `PUT /posts/:id`: Atualizar um post.
- `DELETE /posts/:id`: Excluir um post.

  ```json
  {
    "id": 30,
    "title": "Título da postagem",
    "content": "Texto da postagem",
    "userId": 1, // Id do usuário que fez o post
    "published": "2021-08-01T20:01:00.000Z",
    "updated": "2021-08-01T21:10:00.000Z",
  }
  ```

Consulte a documentação dos endpoints para obter detalhes sobre os dados de entrada/saída.

# Entrega

Para realizar a entrega, o cadidato deverá abrir um PR para a main com seu nome

# Diferenciais

Serão considerados diferenciais, caso o candidato consiga aplicar as seguintes práticas:

- Realizar o projeto em Typescript.
- Programação Orientada a Objetos (POO).
- Princípios SOLID
- Testes (unitários e/ou de integração)

