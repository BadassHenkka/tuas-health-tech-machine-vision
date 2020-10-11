import React from 'react';

const WebcamStream = ({ user }) => {
  return (
    <img src={`/video_feed?user=${user.username}`} alt={'Loading...'}></img>
  );
};

export default WebcamStream;
