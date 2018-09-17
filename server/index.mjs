import express from 'express'
import MongoClient from 'mongodb'
import bodyParser from 'body-parser'

import fs from 'fs'
import path from 'path'

import axios from 'axios'
import Cron from 'cron/lib/cron'
import TelegramBot from 'node-telegram-bot-api'

import { host } from '../config/env'
import { tokens } from '../config/tokens'
import routes from './routes/index'

import europaPlusPost from '../app/radios/europaPlus'
import nasheRadioPost from '../app/radios/nasheRadio'

const app = express()
const port = 8000

app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}))
app.use(bodyParser.json({
  limit: '50mb'
}))

const telegramToken = process.env.TELEGRAM_TOKEN || tokens.bot
const mongoToken = process.env.MONGO_TOKEN || tokens.db

MongoClient.connect(mongoToken, (err, database) => {
  if (err) return console.log(err)
  routes(app, database)
  app.listen(port, () => {
    console.log('We are live on ' + port)

    const bot = new TelegramBot(telegramToken, { polling: true })

    const sendDataToChat = () => new Cron.CronJob('00 55 17 * * 1', async () => {
      await europaPlusPost()
      console.log('EUROPE data added to Mongo')
      await nasheRadioPost()
      console.log('NASHE data added to Mongo')

      const radios = ['nashe', 'europa']

      radios.map(radio => {
        axios.get(`${host}/get/${radio}`).then(({ data }) => {
          const itemToWrite = (item) => {
            const dateList = Object.keys(item.countInfo)
            const printDate = dateList.map(date => `${date}\n`)
            const printDateCount = dateList.map(date => `${item.countInfo[date]}\n`)

            return `${item.track.song}, ${item.track.artist}, ${item.week}, "${printDate}", "${printDateCount}" \n`
          }

          const fileData = data.map(item => itemToWrite(item))
          const filePath = path.resolve(process.cwd(), `./${radio}.csv`)

          fs.writeFileSync(filePath, fileData)
          console.log(`+++++ ${radio}.csv writed +++++`)

          bot.sendDocument('-1001331586104', fs.createReadStream(filePath))
            .then(() => {
              fs.unlinkSync(filePath)
              console.log(`----- ${radio}.csv deleted -----`)
            })
        })
          .then(() => axios.post(`${host}/delete/${radio}`))
          .then(() => console.log(`radio ${radio} deleted from Mongo`))
          .catch(err => console.log(err))
      })
    }, null, true, 'Europe/Moscow')

    sendDataToChat()
  })
})
