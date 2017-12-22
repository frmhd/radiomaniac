import cheerio from 'cheerio'
import axios from 'axios'
import R from 'ramda'
import fs from 'fs'

const formatYesterday = () => {
  const today = new Date()
  const yesterday = new Date(today).setDate(today.getDate() - 1)

  const getYear = new Date(yesterday).getFullYear()
  const getMonth = new Date(yesterday).getMonth() + 1
  const getDay = new Date(yesterday).getDate()
  const formatDate = date => date.toString().length < 2 ? `0${date}` : date

  return `${getYear}-${formatDate(getMonth)}-${formatDate(getDay)}`
}

const yesterdayDate = formatYesterday()

const getUrl = () => `http://www.europaplus.ru/index.php?go=Playlist&date=${yesterdayDate}&time_start=00.00&time_stop=23.59&channel=europa&__ajax__=1&list_only=1`

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
      radio: 'Europa Plus',
      date: yesterdayDate,
      track: {
        artist: findText('.jp-title .title'),
        song: findText('.jp-title span')
      }
    })
  }, containers).get()

  const countedTracks = [...tracks.reduce((mp, o) => {
    if (!mp.has(o.track.song)) mp.set(o.track.song, Object.assign({ count: 0 }, o))
    mp.get(o.track.song).count++
    return mp
  }, new Map()).values()]

  const byCount = R.descend(R.prop('count'))
  const sortedTracks = R.sort(byCount, countedTracks)
  console.log(countedTracks)

  axios.post('http://localhost:8000/post', sortedTracks).then(console.log('posted'))
  // fs.unlinkSync('europa.csv')
  // R.map((elem) => fs.appendFileSync('europa.csv', `${elem.count}, ${elem.song}, ${elem.artist}\n`), sortedTracks)
})
