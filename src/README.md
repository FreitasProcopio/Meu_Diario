# Dear Diary

**Dear Diary** é um aplicativo de diário digital que permite ao usuário criar, visualizar e editar notas de forma fácil e intuitiva. O objetivo é criar um ambiente onde o usuário possa registrar suas experiências, pensamentos e ideias de maneira organizada, com a capacidade de editar ou excluir as notas a qualquer momento.

## Tecnologias Utilizadas

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: JSON Server (para emular uma API RESTful localmente)
- **Banco de Dados**: JSON (com os arquivos `notes.json` e `register.json`)

## Funcionalidades

- **Criar Notas**: O usuário pode adicionar novas notas com título e conteúdo.
- **Visualizar Notas**: As notas criadas são listadas e podem ser visualizadas em miniaturas.
- **Editar Notas**: O usuário pode editar o conteúdo das notas já criadas.
- **Excluir Notas**: O sistema permite deletar notas.
- **Simulação de API REST**: Utiliza o `json-server` para simular uma API que armazena os dados nos arquivos `register.json` e `notes.json`.

## Como Rodar o Projeto

### Passo 1: Instalar Dependências

1. Clone o repositório:
    ```bash
    git clone https://github.com/usuario/dear-diary.git
    cd dear-diary
    ```

2. Instale as dependências necessárias (caso ainda não tenha feito):
    ```bash
    npm install
    ```

### Passo 2: Rodar o JSON Server

Este projeto utiliza o `json-server` para emular uma API e armazenar os dados de notas em um arquivo JSON.

Para rodar a aplicação localmente, é necessário executar dois servidores JSON Server, um para cada porta.

1. Instale em sua máquina o JSON SERVER

    - npm install -g json-server@0.17.4  (npm)  
    - yarn global add json-server@0.17.4  (yarn)

    [Repositório do JSON SERVER](https://github.com/typicode/json-server/tree/v0)


2. Para rodar o primeiro servidor, utilize o comando:
    ```bash
    json-server --watch register.json --port 3000
    ```

3. Para rodar o segundo servidor, utilize o comando:
    ```bash
    json-server --watch notes.json --port 3001
    ```

### Atenção!

- Certifique-se de que o `notes.json` e `register.json` estão no diretório correto e que os servidores estão rodando nas portas especificadas.
- Ambos os servidores devem estar em execução para garantir que o aplicativo funcione corretamente.

## Contribuições

Sinta-se à vontade para fazer contribuições! Se você tiver sugestões ou melhorias, crie um pull request ou abra um issue para discussão.

