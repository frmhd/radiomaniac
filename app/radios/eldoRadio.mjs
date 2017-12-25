import { grab } from '../utils/grabbing'
import { week } from '../utils/dates'
import { europaRoute } from '../radioRoutes'

export const europaDataPost = () => {
  const configuration = {
    radio: 'Eldoradio',
    containerName: '.jp_container',
    artistSelector: '.jp-title .title',
    songSelector: '.jp-title span'
  }

  week().map((weekDate) => {
    const date = `${weekDate.year}-${weekDate.month}-${weekDate.day}`
    grab({...configuration, date, url: europaRoute(date)})
  })
}
