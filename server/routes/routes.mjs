const mainRoutes = (app, db) => {
  app.post('/post/:collectionName', (req, res) => {
    const docs = req.body
    db.collection(req.params.collectionName).insertMany(docs)
    res.send('ok')
  })
  app.post('/delete/:radio', (req, res) => {
    db.collection(req.params.radio).remove()
    res.send('deleted')
  })
  app.get('/get/:radio', (req, res) => {
    let dataArr = []
    const cursor = db.collection(req.params.radio).find({}).sort({ week: -1 })
    cursor.forEach((item) => dataArr.push(item), () => res.send(dataArr))
  })
}

export default mainRoutes
