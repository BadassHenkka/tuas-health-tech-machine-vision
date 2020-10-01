import React from 'react';
// https://www.npmjs.com/package/react-webcam
import Webcam from 'react-webcam';

// Placeholder component until we implement the stream from
// Jetson Nano
const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: 'user',
};

const WebcamStream = () => {
  return (
    <>
      <Webcam audio={false} videoConstraints={videoConstraints} />
    </>
  );
};

export default WebcamStream;
