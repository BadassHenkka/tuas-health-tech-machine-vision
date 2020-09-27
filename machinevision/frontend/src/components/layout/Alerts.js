import React, { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { useAlert } from 'react-alert';

import { errorState, messageState } from '../../store';

const Alerts = () => {
  const alert = useAlert();
  const errorStatus = useRecoilValue(errorState);
  const resetError = useResetRecoilState(errorState);
  const message = useRecoilValue(messageState);
  const resetMessage = useResetRecoilState(messageState);

  useEffect(() => {
    if (errorStatus.status) {
      if (errorStatus.msg.name)
        alert.error(`Name: ${errorStatus.msg.name.join()}`);
      if (errorStatus.msg.email)
        alert.error(`Email: ${errorStatus.msg.email.join()}`);
      if (errorStatus.msg.message)
        alert.error(`Message: ${errorStatus.msg.message.join()}`);
      if (errorStatus.msg.username)
        alert.error(errorStatus.msg.username.join());
      if (errorStatus.msg.non_field_errors) {
        alert.error(errorStatus.msg.non_field_errors.join());
      }
      resetError();
    }
    if (message) {
      if (message.loginSuccess) {
        alert.success(message.loginSuccess);
      }
      if (message.logoutSuccess) {
        alert.success(message.logoutSuccess);
      }
      if (message.registerSuccess) {
        alert.success(message.registerSuccess);
      }
      if (message.passwordsDontMatch) {
        alert.info(message.passwordsDontMatch);
      }
      resetMessage();
    }
  }, [errorStatus, message]);

  return <></>;
};

export default Alerts;
