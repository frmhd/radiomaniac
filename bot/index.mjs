import { tokens } from '../config/tokens'
import Telegraf from 'telegraf'
import axios from 'axios'
import fs from 'fs'

const bot = new Telegraf(tokens.bot)
bot.start((ctx) => {
  console.log('started:', ctx.from.id)
  return ctx.reply('написать тут че он может')
})
bot.hears('привет', (ctx) => {
  axios.get('http://localhost:8000/get').then((data) => {
    data.data.map((item) => {
      fs.appendFileSync(
        'bot/europa.csv',
        `${item.radio}, ${item.track.song}, ${item.track.artist}, за неделю, ${item.countInfo.weekCount}\n`
      )
    })
    ctx.replyWithDocument({ source: fs.createReadStream('bot/europa.csv'), filename: '1.txt' })
  }
    // data.data.map(item => ctx.reply(item.radio))
  ).catch(err => console.log(err))
})

bot.startPolling()
