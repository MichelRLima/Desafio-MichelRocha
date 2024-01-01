# Desafio Técnico (BACKEND) - API com Node.js

## Propósito do Projeto
Esse projeto foi criado para o desafio tecnico proposta para criaçao de uma API com funcionalidade de listagem, inclusão e exclusão de dados.

## Instalação do Projeto

Certifique-se de ter o Node.js e o npm instalados.

```bash
npm install
```

## Configuração do Ambiente de Desenvolvimento
O projeto utiliza o banco de dados PostgreSQL. Configure a variável de ambiente DATABASE_URL com os dados de acesso ao banco de dados.

## Execução Local
Execute o projeto localmente com o seguinte comando:

```bash
npm run dev
```

## Estrutura do Projeto

src/
- controllers/
    - CreateResultadoController.ts
    - ListDisciplinaController.ts
    - RemoveDisciplinaController.ts
- services/
    - CreateResultadoService.ts
    - ListDisciplinaService.ts
    - RemoveDisciplinaService.ts
- prisma/
    - index.ts
- models/
    - interfaces/
    - DisciplinaRequest.ts
    - RemoveDisciplinaRequest.ts
- routes.ts
- server.ts


## Tecnologias Principais
- Node.js (Express)
- TypeScript
- Prisma
- Swagger (para documentação)
- PostgreSQL

## Documentação da API
A documentação da API pode ser encontrada [aqui](https://desafio-backend-fd7h.onrender.com/api-docs/)

## Desafio Front: Projeto em React e TypeScript
[Repositório do projeto](https://github.com/MichelRLima/Desafio-Front)