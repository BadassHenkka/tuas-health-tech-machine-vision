import axios from 'axios';

import {
  headersConfigWithToken,
  headersConfigWithTokenAndCookie,
} from './auth';

export const fetchAlarmList = async (token) => {
  const response = await axios.get(
    '/api/alarm/list',
    headersConfigWithToken(token)
  );
  return response;
};

export const acknowledgeAlarm = async (alarmId, token) => {
  const response = await axios.put(
    `/api/alarm/${alarmId}/detail`,
    null,
    headersConfigWithTokenAndCookie(token)
  );
  return response;
};
