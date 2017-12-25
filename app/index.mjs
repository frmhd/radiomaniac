import cron from 'node-cron'
import axios from 'axios'

import { europaDataPost } from './radios/europaPlus'

// cron.schedule('* * * * *', () => {
//   console.log('running a task every minute')
// })
europaDataPost()

// axios.get('http://localhost:8000/get').then(res => console.log(res.data)).catch(err => console.log(err))
// axios.post('http://localhost:8000/delete').then(console.log(`delete signal`))
// fs.unlinkSync('europa.csv')
// R.map((elem) => fs.appendFileSync('europa.csv', `${elem.count}, ${elem.track.song}, ${elem.track.artist}\n`), sortedTracks)
