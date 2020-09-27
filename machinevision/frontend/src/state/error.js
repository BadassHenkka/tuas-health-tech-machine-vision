import { atom } from 'recoil';

// STATE FOR ERROR STATUS AND MESSAGE USED IN ALERT COMPONENT
export const errorState = atom({
  key: 'errorState',
  default: {
    status: null,
    msg: null,
  },
});
