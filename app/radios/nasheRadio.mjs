import { postData } from '../utils/postAction'
import { nasheRoute } from '../radioRoutes'

const configuration = {
  radio: 'Nashe Radio',
  collection: 'nashe',
  containerName: '.container.playlist .contentLeft li',
  artistSelector: '.artist',
  songSelector: '.song',
  url: nasheRoute
}

const postAction = () => postData(configuration)

export default postAction
