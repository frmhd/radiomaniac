import { postData } from '../utils/postAction'
import { europaRoute } from '../radioRoutes'

const configuration = {
  radio: 'Europa Plus',
  collection: 'europa',
  containerName: '.jp_container',
  artistSelector: '.jp-title .title',
  songSelector: '.jp-title span',
  url: europaRoute
}

postData(configuration)
