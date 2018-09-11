# radiomaniac

### What you need
  1. last nodejs
  2. mongodb
  3. Telegram bot token

### How to use

mongodb login/password and telegram token put in `config/tokens.mjs` like:

```js
  export const tokens = {
    db: 'mongodb://yourdata',
    bot: 'yourtoken'
  }

```

`npm i` - install all packages

`npm start` - start application
