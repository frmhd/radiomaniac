const cheerio = require('cheerio');
const axios = require('axios');
const R = require('ramda');
const fs = require('fs');

const formatYesterday = () => {
  const today = new Date();
  const yesterday = new Date(today).setDate(today.getDate() - 1);

  const getYear = new Date(yesterday).getFullYear();
  const getMonth = new Date(yesterday).getMonth() + 1;
  const getDay = new Date(yesterday).getDate();
  const formatDate = date => date.toString().length < 2 ? `0${date}` : date;

  return `${getYear}-${formatDate(getMonth)}-${formatDate(getDay)}`;
};

const getUrl = () => `http://www.europaplus.ru/index.php?go=Playlist&date=${formatYesterday()}&time_start=00.00&time_stop=23.59&channel=europa&__ajax__=1&list_only=1`;

axios.get(getUrl()).then(data => {
  const $ = cheerio.load(data.data);
  const tracks = $('.jp_container').map((i, elem) => {
    const track = {
      time: $(elem).find('.time').text(),
      artist: $(elem).find('.jp-title .title').text(),
      song: $(elem).find('.jp-title span').text()
    }
    
    return track;
  });

  R.map((i, elem) => fs.appendFileSync("hello.csv", `${elem.time}, ${elem.song}, ${elem.artist}\n`), tracks);

});
