import R from 'ramda'

const mainRoutes = (app, db) => {
  app.post('/post', (req, res) => {
    const docs = req.body
    docs.map((item, i) => {
      db.collection('test').findOneAndUpdate(
        { 'track.song': item.track.song, 'track.artist': item.track.artist },
        {
          $set: { [`countInfo.${item.date}`]: item.count },
          $inc: { 'countInfo.weekCount': item.count }
        },
        null,
        (err, res) => {
          if (R.isNil(res.value)) {
            console.log('insert')
            db.collection('test').insertOne({
              radio: item.radio,
              countInfo: {
                [item.date]: item.count,
                weekCount: item.count
              },
              track: {
                artist: item.track.artist,
                song: item.track.song
              }
            })
          } else {
            console.log('updated')
          }
          if (err) {
            console.log(err)
          }
        }
      )
    })
    res.send('ok')
  })
  app.post('/delete', (req, res) => {
    db.collection('test').remove()
    res.send('deleted')
  })
  app.get('/get', (req, res) => {
    let dataArr = []
    const cursor = db.collection('test').find({})
    cursor.forEach((item) => dataArr.push(item), () => res.send(dataArr))
  })
}

export default mainRoutes
