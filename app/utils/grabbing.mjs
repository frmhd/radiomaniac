import cheerio from 'cheerio'
import needle from 'needle'

export const grab = (configuration) => {
  const { date, url, radio, containerName, artistSelector, songSelector } = configuration

  needle('get', url).then(data => {
    const $ = cheerio.load(data.body)
    const containers = $(containerName)

    const tracks = containers.map((i, elem) => {
      const findText = selector =>
        $(elem).find(selector)
          .text()
          .replace(/[.,']/g, '')
          .replace('&', 'and')

      return ({
        radio,
        date,
        track: {
          artist: findText(artistSelector),
          song: findText(songSelector)
        }
      })
    }).get()

    const countedTracks = [
      ...tracks.reduce((mp, o) => {
        if (!mp.has(o.track.song)) mp.set(o.track.song, Object.assign({ count: 0 }, o))
        mp.get(o.track.song).count++
        return mp
      }, new Map()).values()
    ]

    return countedTracks
  })
}
