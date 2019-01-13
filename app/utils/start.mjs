import getAxiosConfig from '../../config/axios.config';
import radios from '../constants/radios';
import trackCounter from './trackCounter';
import getRadioWeekTrackList from './getRadioWeekTrackList';
import sendToChat from './sendToChat';

export default async () => {
  const instance = await getAxiosConfig();

  let count = 0;
  const maxCount = radios.length;

  /**
   * recursive function for fetch and send to chat info of every radio station in {radios} array
   */
  const init = async () => {
    if (count < maxCount) {
      const radioWeekTrackList = await getRadioWeekTrackList(radios[count], instance);
      const radioWeekTrackListCounted = trackCounter(radioWeekTrackList);
      sendToChat(radioWeekTrackListCounted, radios[count].name);

      count += 1;
      await init();
    }

    return undefined;
  };

  await init();
};
