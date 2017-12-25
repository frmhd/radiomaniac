import { tokens } from '../config/tokens'
import express from 'express'
import MongoClient from 'mongodb'
import bodyParser from 'body-parser'
import routes from './routes/index'

const app = express()
const port = 8000

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

MongoClient.connect(tokens.db, (err, database) => {
  if (err) return console.log(err)
  routes(app, database)
  app.listen(port, () => {
    console.log('We are live on ' + port)
  })
})
