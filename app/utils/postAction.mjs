import { grab } from '../utils/grabbing'
import { week } from '../utils/dates'
import { host } from '../../config/env'
import axios from 'axios'

export const postData = (configuration) => {
  // TODO: refactor this!
  let newArr = []
  const postTracks = async (arr, i) => {
    let count = i
    const weekDate = arr[count]
    const maxCount = arr.length

    if (count < maxCount) {
      const date = `${weekDate.year}-${weekDate.month}-${weekDate.day}`
      const dayTrack = await grab({...configuration, date, url: configuration.url(date)})

      const countedDayTracks = [
        ...dayTrack.reduce((prev, currentItem) => {
          if (!prev.has(currentItem.track.song)) {
            prev.set(currentItem.track.song, Object.assign({ countInfo: { [date]: 0 } }, currentItem))
          }
          prev.get(currentItem.track.song).countInfo[date]++
          return prev
        }, new Map()).values()
      ]

      newArr = newArr.concat(countedDayTracks)
      postTracks(arr, ++count)
    } else {
      const countedWeekTracks = [
        ...newArr.reduce((prev, currentItem) => {
          if (!prev.has(currentItem.track.song)) {
            prev.set(currentItem.track.song, currentItem)
          }

          const prevCountInfo = prev.get(currentItem.track.song).countInfo
          const currentCountInfo = currentItem.countInfo
          const mergeCountInfo = Object.assign(prevCountInfo, currentCountInfo)

          const prevCountList = Object.values(mergeCountInfo)
          const prevCountSum = prevCountList.reduce((sum, current) => {
            return sum + current
          }, 0)

          prev.get(currentItem.track.song).week = prevCountSum
          return prev
        }, new Map()).values()
      ]
      axios.post(`${host}/post/${configuration.collection}`, countedWeekTracks)
    }
  }

  postTracks(week(), 0)
}
