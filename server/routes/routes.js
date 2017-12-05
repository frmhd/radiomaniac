module.exports = (app, db) => {
  app.post('/post', (req, res) => {
    console.log(req)
    const data = {tracks: req.body}
    db.collection('test').insert(data, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' })
        console.log(err)
      } else {
        res.send(result.ops[0])
        console.log('OOOOOOKAAAAAAAAY')
      }
    })
  })
}
