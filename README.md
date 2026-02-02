# 📘 The Blog API

Uma **API RESTful de blog** construída com **NestJS** e **TypeScript**,
projetada para servir como backend de uma aplicação de blog
([The Blog](https://github.com/johny83br/the-blog-with-api)) , oferecendo
endpoints escaláveis e organizados para criação, leitura, atualização e exclusão
de recursos. Esta API pode ser usada tanto para fins de estudo quanto como base
para aplicações reais de blog ou CMS (Content Management System).

---

## 🚀 Sobre o Projeto

Este projeto é uma implementação de backend orientada a boas práticas de
arquitetura e desenvolvimento em Node.js usando o framework **NestJS**.

Ele inclui estrutura padrão para:

- Gerenciamento de posts e possivelmente usuários;
- Padrões organizacionais de pastas típicos do NestJS;
- Scripts de desenvolvimento e produção via npm;
- Configuração de ambiente através de `.env` (modelo já incluso).

---

## 🧠 Funcionalidades

Este projeto pode oferecer:

- 📄 **CRUD completo de posts** — criar, listar, atualizar e excluir posts;
- 🔐 **Possível integração de autenticação** (uso de **JWT**);
- 🛠 Organização modular seguindo os conceitos de controllers, services e
  modules;
- 🔁 Scripts úteis para iniciar o projeto em ambientes de desenvolvimento e
  produção;
- 🧪 Testes unitários e e2e configurados via NestJS.

---

## 🔃 Rotas

| Rota               | Método    | Descrição            | Aberta ou Fechada |
| ------------------ | --------- | -------------------- | ----------------- |
| /auth/login        | POST      | Autenticar usuário   | Aberta            |
| /users/            | POST      | Criar usuário        | Aberta            |
| /users/me          | PATCH     | Atualizar usuário    | Fechada (JWT)     |
| /users/me          | DELETE    | Apagar usuário       | Fechada (JWT)     |
| /users/me          | GET       | Ver dados do usuário | Fechada (JWT)     |
| /users/me/password | PATCH     | Atualizar senha      | Fechada (JWT)     |
| /posts/            | GET       | Ver todos os posts   | Aberta            |
| /posts/[slug]      | GET       | Ver um post          | Aberta            |
| /posts/me          | POST      | Criar post           | Fechada (JWT)     |
| /posts/me          | GET       | Posts de um usuário  | Fechada (JWT)     |
| /posts/me/[id]     | GET       | Post de um usuário   | Fechada (JWT)     |
| /posts/me/[id]     | PATCH     | Atualizar um post    | Fechada (JWT)     |
| /posts/me/[id]     | DELETE    | Apagar um post       | Fechada (JWT)     |
| /upload            | POST      | Enviar imagem        | Fechada (JWT)     |
| /uploads/img.jpg   | GET/NGINX | Ver imagem           | Aberta            |

---

## 🧩 Tecnologias Utilizadas

| Tecnologia         | Função                                                         |
| ------------------ | -------------------------------------------------------------- |
| **NestJS**         | Framework backend com suporte TypeScript                       |
| **TypeScript**     | Linguagem base do projeto                                      |
| **Node.js**        | Ambiente de execução JavaScript                                |
| **npm**            | Gerenciador de pacotes e dependências                          |
| **nginx**          | Servidor web                                                   |
| **pm2**            | Gerenciador de processos de Produção Node.js com Load Balancer |
| **Github Actions** | Para CI/CD automatizando o desenvolvimento, teste, e entrega   |

---

## ⚙️ Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/johny83br/the-blog-api.git
cd the-blog-api
npm install
```

---

## ▶️ Desenvolvimento

Para rodar o projeto em modo de desenvolvimento:

```bash
npm run start:dev
```

---

## 📦 Produção

Para executar a API em modo de produção:

```bash
npm run start:prod
```

---

## 🧪 Testes

O projeto já vem com configuração teste padrão do NestJS:

```bash
npm run test
npm run test:e2e
npm run test:cov
```

---

## 📁 Estrutura Básica

```plaintext
📦src
 ┣ 📂controllers    # Define endpoints
 ┣ 📂services       # Lógica de negócio
 ┣ 📂modules        # Agrupamento funcional
 ┣ 📂entities       # Modelos de dados
 ┣ main.ts          # Ponto de entrada do app
```

> Essa estrutura é padrão em projetos NestJS e facilita a escalabilidade.

---

## 💡 Contribuição

Contribuições são sempre bem-vindas! Se quiser adicionar mais recursos como
testes adicionais, abra uma _issue_ no repositório 😊

---

## 📄 Licença

Este projeto está sob a licença padrão do NestJS (MIT), permitindo uso e
adaptação conforme sua necessidade.
