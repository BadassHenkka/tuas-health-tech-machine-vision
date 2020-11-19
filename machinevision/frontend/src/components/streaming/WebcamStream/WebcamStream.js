import React from 'react';

import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';

import { cameraGrowTimeout } from '../../../constants';

const WebcamStream = ({ user, camEnabled, grow }) => {
  return (
    <Grow in={grow} timeout={cameraGrowTimeout}>
      <Paper elevation={4}>
        {camEnabled && (
          <img
            src={`/video_feed?user=${user.username}`}
            alt={'Loading...'}
          ></img>
        )}
      </Paper>
    </Grow>
  );
};

export default WebcamStream;
