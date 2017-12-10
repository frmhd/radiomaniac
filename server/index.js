const tokens = require('../config/tokens')
const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
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
