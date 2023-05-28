# 🚀 LGPD

O presente repositório contém o código do back-end com aplicação de regras da LGPD desenvolvido durante a aula de Segurança no Desenvolvimento de Aplicações da FATEC.

Selecione uma opção abaixo para saber mais:

- [Como executar o projeto localmente;](#execucao_local)
- [Rotas disponíveis.](#rotas)

<span id="execucao_local">

## ✨ Como executar o projeto localmente

Para iniciar o projeto localmente, execute os comandos a seguir:

```
# Clone este repositório com o Git
git clone https://github.com/gioliveirass/fatec-SDA-lgpd.git

# Acesse a pasta do projeto e instale as dependências
cd fatec-SDA-lgpd
yarn

# Duplique o arquivo .env.config, renomeie para .env e preencha com as informações necessárias

# Utilize o comando do TypeORM para dar o run da migration e sincronizar as entidades
yarn typeorm migration:run -d ./src/data-source.ts

# Inicie o Projeto
yarn dev
```

<span id="rotas">

## ✨ Rotas disponíveis

Em construção...
