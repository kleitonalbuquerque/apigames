# API de Games

Esta API é utilizada para criar, editar e excluir games.

## Endpoints

### GET /games

Endpoint que lista todos os games

#### Parametros

Nenhum

#### Respostas

##### OK! 200

Caso essa resposta aconteça você vai receber a listagem de games.

Exemplo de resposta:

```
{
    "game": [
        {
            "id": 1,
            "title": "Call of Duty MW",
            "year": 2019,
            "price": 60
        },
        {
            "id": 2,
            "title": "God of War",
            "year": 2015,
            "price": 90
        },
        {
            "id": 3,
            "title": "MK 11",
            "year": 2017,
            "price": 50
        }
    ]
}
```

#### Falha na autenticação! 401

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token inválido, Token expirado.

Exemplo de resposta:

```
{
    "err": "Token inválido!"
}
```

### GET /game/:id

Endpoint que lista um game por id

### POST /game

Endpoint que cria um game

### DELETE /game/:id

Endpoint que exclui um game

### PUT /game/:id

Endpoint que edita/atualiza um game

### POST /auth

Endpoint de login

#### Parametros

e-mail: E-mail do usuário cadastrado no sistema.

password: Senha do usuário cadastrado no sistema, com aquele determinado e-mail.

Exemplo:

```
{
    "email": "mariana@mail.com",
    "password": "nodejs<3"
}
```

#### Respostas

##### OK! 200

Caso essa resposta aconteça você vai receber o token JWT para conseguir acessar endpoints protegidos na API.

Exemplo de resposta:

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYXJpYW5hQG1haWwuY29tIiwiaWF0IjoxNjQyNzAxNTU0LCJleHAiOjE2NDI4NzQzNTR9.eTYOZagDifnQ-ZEKI9mTj2DIqP5Dc1xI_py3i18uI3o"
}
```

#### Falha na autenticação! 401

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Senha ou e-mail incorretos.

Exemplo de resposta:

```
{
    "err": "Credenciais inválidas!"
}
```
