const tracksCounter = (weekTracks) => {
  let weekTracksCounted = [];

  weekTracks.map(({ date, tracks }) => {
    const countedDayTracks = [
      ...tracks.reduce((prev, currentItem) => {
        if (!prev.has(currentItem.songFull)) {
          prev.set(currentItem.songFull, Object.assign({ countInfo: { [date]: 0 } }, currentItem));
        }
        prev.get(currentItem.songFull).countInfo[date] += 1;
        return prev;
      }, new Map()).values(),
    ];
    weekTracksCounted = weekTracksCounted.concat(countedDayTracks);

    return undefined;
  });

  const overallWeekTracks = weekTracksCounted.reduce((prev, currentItem) => {
    if (!prev.has(currentItem.songFull)) {
      prev.set(currentItem.songFull, currentItem);
    }

    const prevCountInfo = prev.get(currentItem.songFull).countInfo;
    const currentCountInfo = currentItem.countInfo;
    const mergeCountInfo = Object.assign(prevCountInfo, currentCountInfo);

    const prevCountList = Object.values(mergeCountInfo);
    const prevCountSum = prevCountList.reduce((sum, current) => sum + current, 0);

    prev.get(currentItem.songFull).week = prevCountSum;

    return prev;
  }, new Map()).values();

  const overallWeekTracksSorted = Array.from(overallWeekTracks).sort((a, b) => {
    if (a.week < b.week) return 1;
    if (a.week > b.week) return -1;
    return 0;
  });

  return overallWeekTracksSorted;
};

export default tracksCounter;
