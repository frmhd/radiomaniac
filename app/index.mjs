import express from 'express';
import Cron from 'cron';

import start from './utils/start';

const app = express();
const port = 8000;

/**
 * Start the app in 10AM every monday
 */
const startApp = () => new Cron.CronJob('00 00 10 * * 1', start, null, true, 'Europe/Moscow');

app.listen(port, () => {
  startApp();
});
