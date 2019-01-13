const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const sendToChat = (radioTrackList, radioName, bot) => {
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
