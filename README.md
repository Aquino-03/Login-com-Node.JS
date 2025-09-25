# Sistema de Login com Node.js e JWT

Este é um projeto de um sistema de login e autenticação de usuários construído com Node.js, Express e MySQL. A autenticação é baseada em JSON Web Tokens (JWT) e as senhas são armazenadas de forma segura utilizando `bcrypt`.

## Funcionalidades

-   **Cadastro de Usuários:** Permite que novos usuários se registrem no sistema.
-   **Criptografia de Senhas:** As senhas são hasheadas com `bcrypt` antes de serem salvas no banco de dados.
-   **Autenticação com JWT:** Após o login, um token JWT é gerado para o usuário, permitindo o acesso a rotas protegidas.
-   **Estrutura de Projeto Organizada:** O código é dividido em rotas, configuração de banco de dados e lógica do servidor para fácil manutenção.

## Tecnologias Utilizadas

-   **Backend:** Node.js, Express.js
-   **Banco de Dados:** MySQL (com o driver `mysql2`)
-   **Autenticação:** JSON Web Token (`jsonwebtoken`)
-   **Criptografia:** `bcrypt`
-   **Variáveis de Ambiente:** `dotenv`
-   **Frontend:** HTML, CSS, JavaScript

## Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
-   [Node.js](https://nodejs.org/en/)
-   [NPM](https://www.npmjs.com/) (geralmente vem com o Node.js)
-   Um servidor de banco de dados MySQL.

## Instalação e Configuração

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    ```

2.  **Navegue até o diretório do projeto:**
    ```bash
    cd login-com-node.js
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Configure o banco de dados:**
    -   Crie um banco de dados no seu servidor MySQL.
    -   Importe o arquivo `BD_Login.sql` para criar a tabela de usuários necessária.

5.  **Configure as variáveis de ambiente:**
    -   Crie um arquivo `.env` na raiz do projeto.
    -   Adicione as seguintes variáveis de ambiente, substituindo pelos seus valores:
        ```
        DB_HOST=localhost
        DB_USER=seu_usuario_mysql
        DB_PASSWORD=sua_senha_mysql
        DB_DATABASE=seu_banco_de_dados
        JWT_SECRET=sua_chave_secreta_para_jwt
        ```

## Como Executar o Projeto

Para iniciar o servidor, execute o seguinte comando:

```bash
npm start
