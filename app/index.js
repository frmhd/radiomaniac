const cheerio = require('cheerio')
const axios = require('axios')
const R = require('ramda')
const fs = require('fs')

const formatYesterday = () => {
  const today = new Date()
  const yesterday = new Date(today).setDate(today.getDate() - 1)

  const getYear = new Date(yesterday).getFullYear()
  const getMonth = new Date(yesterday).getMonth() + 1
  const getDay = new Date(yesterday).getDate()
  const formatDate = date => date.toString().length < 2 ? `0${date}` : date

  return `${getYear}-${formatDate(getMonth)}-${formatDate(getDay)}`
}

const getUrl = () => `http://www.europaplus.ru/index.php?go=Playlist&date=${formatYesterday()}&time_start=00.00&time_stop=23.59&channel=europa&__ajax__=1&list_only=1`

axios.get(getUrl()).then(data => {
  const $ = cheerio.load(data.data)
  const containers = $('.jp_container')

  const tracks = R.map((i, elem) => {
    const findText = selector =>
      $(elem).find(selector)
        .text()
        .replace(/[.,']/g, '')
        .replace('&', 'and')

    return ({
      artist: findText('.jp-title .title'),
      song: findText('.jp-title span')
    })
  }, containers).get()

  const countedTracks = [...tracks.reduce((mp, o) => {
    if (!mp.has(o.song)) mp.set(o.song, Object.assign({ count: 0 }, o))
    mp.get(o.song).count++
    return mp
  }, new Map()).values()]

  const byCount = R.descend(R.prop('count'))
  const sortedTracks = R.sort(byCount, countedTracks)

  // axios.post('http://localhost:8000/post', JSON.stringify(sortedTracks))
  fs.unlinkSync('europa.csv')
  R.map((elem) => fs.appendFileSync('europa.csv', `${elem.count}, ${elem.song}, ${elem.artist}\n`), sortedTracks)
})
