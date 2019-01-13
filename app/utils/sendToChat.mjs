import TelegramBot from 'node-telegram-bot-api';

const telegramToken = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(telegramToken, { polling: true });
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

/**
 * Format and send recieved data to telegram chat as files
 *
 * @param {Array} radioTrackList
 * @param {string} radioName
 */
const sendToChat = (radioTrackList, radioName) => {
  const itemToWrite = (trackInfo) => {
    const dateList = Object.keys(trackInfo.countInfo);
    const printDate = dateList.map(date => `${date}\n`);
    const printDateCount = dateList.map(date => `${trackInfo.countInfo[date]}\n`);

    return `${trackInfo.song}, ${trackInfo.artist}, ${trackInfo.week}, "${printDate}", "${printDateCount}" \n`;
  };

  const fileData = radioTrackList.map(item => itemToWrite(item)).join(',');

  const buffer = Buffer.from(fileData);

  bot.sendDocument(CHAT_ID, buffer, {}, {
    filename: `${radioName}.csv`,
    contentType: 'text/plain',
  });
};

export default sendToChat;
