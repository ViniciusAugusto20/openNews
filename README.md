# Open News

## :rocket:  Stack
Este projeto foi desenvolvido com as seguintes tecnologias:

- [React](https://pt-br.reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material-UI](http://material-ui.com/)
- [Redux](https://redux.js.org/)
- [Redux Sauce](https://github.com/jkeam/reduxsauce)

No desenvolvimento do projeto além das tecnologias já citadas, foi utilizado o padrão de Ducks juntamente com o  Redux Sauce. Além de o projeto também ser executado pensando em mobile first.

### Inicialização

__Frontend__
```js
  yarn install
```
Depois

```js
  yarn start
```

__Backend__

Para o backend deste projeto é necessário ter [Json-server](https://www.npmjs.com/package/json-server) instalado globalmente. Assim após já ter o mesmo instalado, para executar o projeto é necessário ir até a pasta mock (`src/mock`) e executar o comando abaixo:
```
json-server --watch db.json --port 8000
```

__Login__

Para fins de login, deve ser utilizado um dos usuários abaixo:

E-mail: `admin@admin.com`  / Senha: `123456`

E-mail:  `vinicius@admin.com` / Senha: `admin`



### Utilização

A tela inicial é composta por uma grade que contém apenas as notícias em que o usuário selecionou interesse em seu perfil. Há no menu lateral a opção de ver todas as noticias. É possível customizar alguns campos do usuário bem como a opção de adicionar ou remover interesses dentro da tela de perfil de usuário.
