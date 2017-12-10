const tokens = require('../config/tokens')
const Telegraf = require('telegraf')
const axios = require('axios')

const bot = new Telegraf(tokens.TOKEN)
bot.start((ctx) => {
  console.log('started:', ctx.from.id)
  return ctx.reply('написать тут че он может')
})
bot.command('help', (ctx) => ctx.reply('Try send a sticker!'))
bot.hears('radio', (ctx) => {
  ctx.reply('Держи')
  console.log(`держи answer`)
  // axios.get('http://localhost:8000/get').then(data => console.log(data)).catch(err => console.log(err))
})

bot.startPolling()
