import logging
import time
import cv2
from tf_pose.estimator import TfPoseEstimator
from tf_pose.networks import get_graph_path
import GPUtil

from alarms.models import Alarm


logger = logging.getLogger('TfPoseEstimator-WebCam')
logger.setLevel(logging.DEBUG)
ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('[%(asctime)s] [%(name)s] [%(levelname)s] %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


class VideoCamera(object):
  def __init__(self):
    self.cam = cv2.VideoCapture(0)

  def __del__(self):
    self.cam.release()

  def get_frame(self, *args, **kwargs):
    cam = self.cam
    ret_val, image = cam.read()

    try:
      # First check for Nvidia GPU with gputil
      # If nvidia GPU is available -> pose estimation will run
      deviceID = GPUtil.getFirstAvailable()

      logger.debug('initialization %s : %s' % ('mobilenet_thin', get_graph_path('mobilenet_thin')))
      e = TfPoseEstimator(get_graph_path('mobilenet_thin'), target_size=(432, 368), trt_bool=False)
      logger.debug('cam read+')

      count = 0
      y1 = [0,0]
      frame = 0
      fps_time = 0
      w, h = 432, 368

      i =1
      count+=1

      humans = e.inference(image, resize_to_default=(w > 0 and h > 0))
      # In humans total num of detected person in frame
      image = TfPoseEstimator.draw_humans(image, humans, imgcopy=False)

      for human in humans:
        # we select one person from num of person
        for i in range(len(humans)):
          try:
            '''
            To detect fall we have used y coordinate of head.
            Coordinates of head in form of normalize form.
            We convert normalized points to relative point as per the image size.
            y1.append(y) will store y coordinate to compare with previous point.
            We have used try and except because many time pose estimator cann't predict head point.

            '''
            #human.parts contains all the detected body parts
            a = human.body_parts[0]   # human.body_parts[0] is for head point coordinates
            x = a.x*image.shape[1]   # x coordinate relative to image 
            y = a.y*image.shape[0]   # y coordinate relative to image
            y1.append(y)   # store value of y coordinate in list to compare two frames
          except:
            pass
          if ((y - y1[-2]) > 25):
          # it's distance between frame and comparing it with thresold value 
            cv2.putText(image, "Fall Detected", (20,50), cv2.FONT_HERSHEY_COMPLEX, 2.5, (0,0,255), 
                2, 11)
            #You can set count for get that your detection is working
            print("fall detected.",i+1, count)
            new_alarm = Alarm(message="Fall detected!")
            new_alarm.save()

      cv2.putText(image,
        "FPS: %f" % (1.0 / (time.time() - fps_time)),
        (10, 10),  cv2.FONT_HERSHEY_SIMPLEX, 0.5,
        (0, 255, 0), 2)
      fps_time = time.time()

      ret, jpeg = cv2.imencode('.jpg', image)

      return jpeg.tobytes()
    except:
      # if there's no Nvidia GPU available
      # try block will fail and the pose estimation won't run
      # so we'll just return regular camera image
      cv2.putText(image,
        "No NVIDIA GPU detected - pose estimation is not running",
        (10, 15),  cv2.FONT_HERSHEY_SIMPLEX, 0.5,
        (0, 0, 255), 2)

      ret, jpeg = cv2.imencode('.jpg', image)

      return jpeg.tobytes()
