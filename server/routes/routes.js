const yesterday = require('../../app/index')

module.exports = (app, db) => {
  app.post('/post', (req, res) => {
    // console.log(req.body)
    let docs = req.body
    db.collection('test').insertMany(docs, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' })
        console.log(err)
      } else {
        res.send(result.ops[0])
        console.log('OOOOOOKAAAAAAAAY')
      }
    })
  })
  app.get('/get', (req, res) => {
    db.collection('test').find({date: yesterday()}).toArray(function (err, docs) {
      console.log(err)
      console.log(docs)
    })
  })
}
