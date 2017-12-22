import tokens from '../config/tokens'
import express from 'express'
import {MongoClient} from 'mongodb'
import bodyParser from 'body-parser'

const app = express()
const port = 8000

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

MongoClient.connect(tokens.url, (err, database) => {
  if (err) return console.log(err)
  require('../server/routes')(app, database)
  app.listen(port, () => {
    console.log('We are live on ' + port)
  })
})
