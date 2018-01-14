import { tokens } from '../config/tokens'
import Telegraf from 'telegraf'
import axios from 'axios'
import fs from 'fs'
import { host } from '../config/env'
const bot = new Telegraf(tokens.bot)

bot.hears('go', (ctx) => {
  const radios = ['nashe', 'europa']
  radios.map(radio => {
    axios.get(`${host}/get/${radio}`).then((data) => {
      const itemToWrite = (item) => {
        const dateList = Object.keys(item.countInfo)
        const printDate = dateList.map(date => `${date}\n`)
        const printDateCount = dateList.map(date => `${item.countInfo[date]}\n`)

        return `${item.track.song}, ${item.track.artist}, ${item.week}, "${printDate}", "${printDateCount}" \n`
      }

      data.data.map(item => fs.appendFile(`${radio}.csv`, itemToWrite(item)))
    }
    ).catch(err => console.log(err))
  })
})

bot.startPolling()
