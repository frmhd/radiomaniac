import TelegramBot from 'node-telegram-bot-api';

import getAxiosConfig from '../../config/axios.config';
import radios from '../constants/radios';
import trackCounter from './trackCounter';
import getRadioWeekTrackList from './getRadioWeekTrackList';
import sendToChat from './sendToChat';

const telegramToken = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(telegramToken, { polling: true });

export default async () => {
  const instance = await getAxiosConfig();

  let count = 0;
  const maxCount = radios.length;

  const init = async () => {
    if (count < maxCount) {
      const radioWeekTrackList = await getRadioWeekTrackList(radios[count], instance);
      const radioWeekTrackListCounted = trackCounter(radioWeekTrackList);
      sendToChat(radioWeekTrackListCounted, radios[count].name, bot);

      count += 1;
      await init();
    }

    return undefined;
  };

  await init();
};
