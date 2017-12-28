import { tokens } from '../config/tokens'
import Telegraf from 'telegraf'
import axios from 'axios'
// import fs from 'fs'
const bot = new Telegraf(tokens.bot)

bot.start((ctx) => {
  console.log('started:', ctx.from.id)
  return ctx.reply('Нажми на кнопку блять!', Telegraf.Markup
    .keyboard([
      ['😎 Жира мне!'], // Row1 with 2 buttons
      ['😒 Димон', '😤 Заебал'], // Row2 with 2 buttons
      ['👉🏽 Иди', '🛌 Спать'] // Row3 with 3 buttons
    ])
    .resize()
    .extra()
  )
})
bot.hears('😎 Жира мне!', (ctx) => {
  axios.get('http://localhost:8000/get').then((data) => {
    const text = (number) => data.data.slice(0, number).map((item, index) =>
      `<b>${index + 1}. ${item.track.song.toUpperCase()}</b>
      (<i>${item.track.artist}</i>)
      <b>${item.week} раз</b> \n \n`
    ).toString()
    const replyItemData = (number) => {
      return `
        <b>===== TOP-${number} за неделю =====</b>

        ${text(number).replace(/,/g, '')}
      `
    }

    ctx.replyWithHTML(replyItemData(5).trim())
  }
  ).catch(err => console.log(err))
})

bot.startPolling()
