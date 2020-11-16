import React from 'react';
import Webcam from 'react-webcam';

import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';

import { cameraGrowTimeout } from '../../../constants';

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: 'user',
};

const WebcamStream = ({ camEnabled, grow }) => {
  return (
    <Grow in={grow} timeout={cameraGrowTimeout}>
      <Paper elevation={4}>
        {camEnabled && (
          <Webcam audio={false} videoConstraints={videoConstraints} />
        )}
      </Paper>
    </Grow>
  );
};

export default WebcamStream;
