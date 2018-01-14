const mainRoutes = (app, db) => {
  app.post('/post/:collectionName', (req, res) => {
    const docs = req.body
    db.collection(req.params.collectionName).insertMany(docs)
    res.send('ok')
  })
  app.post('/delete', (req, res) => {
    db.collection('test').remove()
    res.send('deleted')
  })
  app.get('/get', (req, res) => {
    let dataArr = []
    const cursor = db.collection('test').find({}).sort({ week: -1 })
    cursor.forEach((item) => dataArr.push(item), () => res.send(dataArr))
  })
}

export default mainRoutes
