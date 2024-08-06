# muralis-etapa-tecnica

Projeto gerenciador de despesas da etapa técnica para estágio Além do Sistema na Muralis Tecnologia.

# Status do Projeto

Concluído

# Tabela de conteúdos
<!--ts-->
   * [Instalação e inicialização](#instalação-e-inicialização)
      * [Pré-Requisitos](#pré-requisitos)
      * [Rodando a aplicação](#rodando-a-aplicação)
   * [Como usar](#como-usar)
      * [Endpoints](#endpoints)
      * [Ids para consulta](#ids-para-consulta)
   * [Modelo de dados](#modelo-de-dados)
   * [Testes](#testes)
   * [Tecnologias](#tecnologias)
   * [Dependências](#dependências)
   * [Autor](#autor)
   * [Considerações](#considerações)
<!--te-->

# Instalação e inicialização

## Pré-requisitos

Antes de começar, é necessário ter instalado em sua máquina as seguintes ferramentas:
[Node.js](https://nodejs.org/en) e [Docker](https://www.docker.com/).

## Rodando a aplicação

```bash
# Clone este repositório: 
$ git clone https://github.com/leonardobuckalves/muralis-etapa-tecnica

# Acesse a pasta do projeto no terminal/cmd:
$ cd muralis-etapa-tecnica

# Instale as dependências:
$ npm install

# Inicialize o container:
$ docker-compose up

# Execute a aplicação:
$ npm start
```

# Como usar

## Endpoints

Listar despesas

- **GET** '/api/despesas/'

Criar despesa

- **POST** '/api/despesas/'
  - Exemplo de json:
{
    "valor": 100,
    "data_compra": "01-08-2024 22:45:00",
    "descricao": "Viagem Nuporanga",
    "categorias_id": 1,
    "tipos_pagamento_id": 3
}

## Ids para consulta

- tipo_pagamento_id:
  
![modelo tipo_pagamento para post](https://github.com/user-attachments/assets/08ef7f93-32c6-4d33-83c6-dc12d9576094)

- despesas:
  
![modelo categoria para post](https://github.com/user-attachments/assets/5e1b212a-01db-4c20-95e3-2e9702a6e41d)


# Modelo de dados

![Modelo de dados MySQL](https://github.com/user-attachments/assets/4e72113b-54bf-4fbd-9b00-de8005230cac)

# Testes

- Teste GET sem lançamentos

![teste get sem lançamentos](https://github.com/user-attachments/assets/5e75e926-c045-4775-8114-bd00936addcf)

- Teste GET com lançamentos

  ![exemplo get sucess](https://github.com/user-attachments/assets/89ddcf37-725d-40b4-abfe-834bc1ba44cd)

- Teste POST (êxito)

  ![exemplo post sucess](https://github.com/user-attachments/assets/b0a6f63b-ec19-498e-8d4c-2086477f25e4)

- Teste POST (erro)

![exemplo validações post error](https://github.com/user-attachments/assets/dad01295-25a9-4518-a737-077b3890984b)

![exemplo validações post error2](https://github.com/user-attachments/assets/30382fe7-82f2-4ae3-a96c-68f1c4fd2cc8)

# Tecnologias

- [Node.js](https://nodejs.org/en)

- [Docker](https://www.docker.com/)

# Dependências

Bibliotecas utilizadas

- [body-parser](https://www.npmjs.com/package/body-parser)
- [date-fns](https://www.npmjs.com/package/date-fns)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [express-validator](https://www.npmjs.com/package/express-validator)
- [mysql2](https://www.npmjs.com/package/mysql2)
- [nodemon](https://www.npmjs.com/package/nodemon)

# Autor

<img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/109763968?v=4" width="100px;" alt=""/>
 <br />

[Leonardo Buck Alves](https://github.com/leonardobuckalves)

[![Linkedin Badge](https://img.shields.io/badge/-LeonardoBuckAlves-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/leonardobuckalves/)](https://www.linkedin.com/in/leonardobuckalves/) 
[![Gmail Badge](https://img.shields.io/badge/-leonadobuckalves@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:leonardobuckalves@gmail.com)](mailto:leonardobuckalves@gmail.com)

# Considerações

[Muralis Tecnologia](https://www.muralis.com.br/)
