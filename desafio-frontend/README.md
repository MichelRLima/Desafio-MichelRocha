# Desafio Técnico (FRONT) - Plataforma de Disciplinas em React

## Propósito do Projeto
O projeto foi criado como parte de um teste técnico para uma vaga de desenvolvedor júnior. O frontend consiste em uma plataforma React na qual é possível adicionar disciplinas com nota e data de criação por bimestre. Existem quatro disciplinas (Biologia, Artes, Geografia e Sociologia) e quatro bimestres.

## Instalação do Projeto
Para instalar o projeto, siga os passos abaixo:

1. Clone o repositório: `git clone https://github.com/MichelRLima/Desafio-Front`
2. Navegue até o diretório do projeto: `cd desafio-frontend`
3. Instale as dependências: `npm install`

## Execução do Projeto Localmente
O projeto roda na porta local:3000. Utilize o seguinte comando para iniciar o servidor de desenvolvimento:

```bash
npm start
```

## Acesso ao Aplicativo

[Acesse o aplicativo no navegador em http://localhost:3000.](http://localhost:3000)

## Estrutura do Projeto

O projeto está organizado da seguinte maneira:

- `src/components/BimestreComponent`: Componente que representa cada bimestre.
- `src/components/DisciplinaComponent`: Componente que representa uma disciplina.
- `src/components/MainContainer`: Componente principal que inclui quatro componentes `BimestreComponent`.
- Cada componente possui arquivos `tsx` e módulos CSS associados.

## Principais Tecnologias Utilizadas

- React
- TypeScript
- Axios (para consumir a API)
- React-Icons (biblioteca de ícones)
- Tooltip (biblioteca de alertas)
- Swal (biblioteca de alertas pop-up)

## Exemplo/Demonstração

[Demo do Projeto](https://front-desafiotecnico.netlify.app)

## Desafio Backend: API com Node.js
[Repositório do projeto](https://github.com/MichelRLima/Desafio-Backend)

