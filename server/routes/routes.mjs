import R from 'ramda'
import yesterday from '../../app/index'

export default (app, db) => {
  app.post('/post', (req, res) => {
    let docs = req.body
    docs.map((item, i) => {
      db.collection('test').findOneAndUpdate(
        { 'track.song': item.track.song },
        {
          $set: { new: false }
        },
        null,
        (err, res) => {
          if (R.isNil(res.value)) {
            db.collection('test').insertOne({...item, new: true})
          }
          if (err) console.log(err)
        }
      )
    })
  })
  app.get('/get', (req, res) => {
    db.collection('test').find({date: yesterday()}).toArray(function (err, docs) {
      console.log(err)
      console.log(docs)
    })
  })
}
