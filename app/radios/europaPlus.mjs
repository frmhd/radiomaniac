import { grab } from '../utils/grabbing'
import { week } from '../utils/dates'
import { europaRoute } from '../radioRoutes'
import async from 'async'
import axios from 'axios'

export const europaDataPost = () => {
  const configuration = {
    radio: 'Europa Plus',
    containerName: '.jp_container',
    artistSelector: '.jp-title .title',
    songSelector: '.jp-title span'
  }

  async.mapSeries(week(),
    (weekDate) => {
      const date = `${weekDate.year}-${weekDate.month}-${weekDate.day}`
      const tracks = grab({...configuration, date, url: europaRoute(date)})
      axios.post('http://localhost:8000/post', tracks)
    })
}
