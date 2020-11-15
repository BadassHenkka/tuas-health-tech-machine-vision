import dayjs from 'dayjs';

const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

// use dayjs to guess user timezone based on browser
const userTimezone = dayjs.tz.guess();

export const formatTime = (time) => {
  const convertedTime = dayjs(time).tz(userTimezone);
  const formattedTime = convertedTime.format('dddd, MMMM D YYYY, h:mm:ss');
  return formattedTime;
};
