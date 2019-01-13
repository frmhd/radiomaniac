/**
 * function for gets array with dates of fetching tracklists
 *
 * @param {number} [daysCount=7] - which days we want to fetch
 * @returns {{date: string, value: number}[]}
 */
const getDates = (daysCount = 7) => {
  const dates = [];

  for (let index = 1; index <= daysCount; index++) {
    const date = new Date();
    date.setDate(date.getDate() - index);
    dates.push({ date: date.toLocaleDateString(), value: index });
  }

  return dates;
};

const getRadioWeekTrackList = async ({ id }, instance) => {
  const dates = getDates();

  const fetchTrackList = async () => Promise.all(
    dates.map(async ({ date, value }) => {
      const data = await instance.post('/playlist', {
        day: value,
        radio_id: id,
      });

      return {
        date,
        tracks: data.data.list,
      };
    }),
  );

  const trackList = await fetchTrackList();

  const formattedTrackList = trackList
    .map(({ date, tracks }) => ({
      date,
      tracks: tracks.map(({ title_info: { artist, song, title_prepared: songFull } }) => ({
        artist,
        song,
        songFull,
      })),
    }));

  return formattedTrackList;
};

export default getRadioWeekTrackList;
