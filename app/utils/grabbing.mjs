import cheerio from 'cheerio'
import needle from 'needle'

export const grab = async (configuration) => {
  const { date, url, radio, containerName, artistSelector, songSelector } = configuration

  const data = await needle('get', url)
  const $ = cheerio.load(data.body)
  const containers = $(containerName)

  const tracks = containers.map((i, elem) => {
    const findText = selector =>
      $(elem).find(selector)
        .text()
        .toLowerCase()
        .replace(/[.,']/g, '')
        .replace('&', 'and')
        .replace('pi_', '')

    const track = { radio, date, track: { artist: findText(artistSelector), song: findText(songSelector) } }
    return track
  }).get()

  return tracks
}
