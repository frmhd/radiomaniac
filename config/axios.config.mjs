import axios from 'axios';
import cheerio from 'cheerio';

const TARGET_URL = 'http://the-radio.ru';

export default async () => {
  const html = await axios.get(TARGET_URL);
  const cookies = html.headers['set-cookie'].join('; ');
  const token = cheerio.load(html.data)('head').find('[name="_token"]').attr('content');

  return axios.create({
    baseURL: TARGET_URL,
    timeout: 5000,
    headers: {
      'X-CSRF-TOKEN': token,
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Cookie: cookies,
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
    },
  });
};
