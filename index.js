const osmosis = require('osmosis');

const formatYesterday = () => {
  const today = new Date();
  const yesterday = new Date(today).setDate(today.getDate() - 1);
  const yesterdayDate = () => new Date(yesterday);
  
  const getYear = yesterdayDate().getFullYear();
  const getMonth = yesterdayDate().getMonth();
  const getDay = yesterdayDate().getDate();
  const formatDay = getDay.toString().length < 2 ? `0${getDay}` : getDay;
  
  return `${getYear}-${getMonth}-${formatDay}`;
};

const getUrl = () => `http://www.europaplus.ru/index.php?go=Playlist&date=${formatYesterday()}&time_start=00.00&time_stop=23.59&channel=europa&__ajax__=1&list_only=1`;

osmosis
  .get(getUrl())
  .data((data) => {
      const artists = data.artist;
      const formatData = data.song.map((item, index) => ({
          'song': item,
          'artist': artists[index]
        }));
        return console.log(formatData);
      })
  .log(console.log)
  // .error(console.log)
  // .debug(console.log)
