# Desafio Técnico (Front e Backend) - Projeto React e API criada com Node.js

## Propósito do Projeto
Esse projeto foi desenvolvido como um teste técnico para a vaga de desenvolvedor júnior. Este repositório contém os dois projetos; no entanto, também há um repositório individual para o front-end e outro para o back-end.

[Repositório front-end](https://github.com/MichelRLima/Desafio-Front)

[Repositório back-end](https://github.com/MichelRLima/Desafio-Backend)

## Instalação do Projeto
### Instalação do projeto front-end
1. Clone o repositório: `git clone https://github.com/MichelRLima/Desafio-MichelRocha`
2. Navegue até o diretório do projeto: `cd desafio-frontend`
3. Instale as dependências: `npm install`

### Execução do Projeto Localmente
O projeto roda na porta local:3000. Utilize o seguinte comando para iniciar o servidor de desenvolvimento:

```bash
npm start
```
### Acesso ao Aplicativo

[Acesse o aplicativo no navegador em http://localhost:3000.](http://localhost:3000)

### Estrutura do Projeto

O projeto está organizado da seguinte maneira:

- `src/components/BimestreComponent`: Componente que representa cada bimestre.
- `src/components/DisciplinaComponent`: Componente que representa uma disciplina.
- `src/components/MainContainer`: Componente principal que inclui quatro componentes `BimestreComponent`.
- Cada componente possui arquivos `tsx` e módulos CSS associados.

### Principais Tecnologias Utilizadas

- React
- TypeScript
- Axios (para consumir a API)
- React-Icons (biblioteca de ícones)
- Tooltip (biblioteca de alertas)
- Swal (biblioteca de alertas pop-up)

## Demonstração

[Link do projeto front-end](https://front-desafiotecnico.netlify.app)


***
### Instalação do projeto back-end

Certifique-se de ter o Node.js e o npm instalados.

```bash
npm install
```

### Configuração do Ambiente de Desenvolvimento
O projeto utiliza o banco de dados PostgreSQL. Configure a variável de ambiente DATABASE_URL com os dados de acesso ao banco de dados.

### Execução Local
Navegue até o diretório do projeto: `cd desafio-backend` e execute o seguinte comando:

```bash
npm run dev
```

### Estrutura do Projeto

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

### Principais Tecnologias Utilizadas
- Node.js (Express)
- TypeScript
- Prisma
- Swagger (para documentação)
- PostgreSQL

### Documentação da API
A documentação da API pode ser encontrada [aqui](https://desafio-backend-fd7h.onrender.com/api-docs/)


***

