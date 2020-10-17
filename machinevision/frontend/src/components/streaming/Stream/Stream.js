import React, { useRef } from 'react';
import Webcam from 'react-webcam';

import * as posenet from '@tensorflow-models/posenet';

import './Stream.css';

import { drawKeypoints, drawSkeleton } from '../../../utils/posenet';

const Stream = () => {
  const webcamRef = useRef();
  const canvasRef = useRef();

  const poseNet = async () => {
    const net = await posenet.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.5, // higher scale = better detections, requires more performance
    });

    // detect pose every 500ms
    setInterval(() => {
      detectPose(net);
    }, 500);
  };

  const detectPose = async (net) => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      const pose = await net.estimateSinglePose(video);
      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
    }
  };

  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext('2d');
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(pose['keypoints'], 0.5, ctx);
    drawSkeleton(pose['keypoints'], 0.5, ctx);
  };

  poseNet();

  return (
    <>
      <Webcam ref={webcamRef} className='webcam' audio={false} />
      <canvas ref={canvasRef} className='detection-draw-canvas' />
    </>
  );
};

export default Stream;
