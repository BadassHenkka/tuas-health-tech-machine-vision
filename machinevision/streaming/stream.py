import logging
import time
import cv2

import importlib.util

# Make a custom module out of estimator.py so we can import our own modified TFPoseEstimator code
spec = importlib.util.spec_from_file_location("module.name", "streaming/estimator.py")
estimator = importlib.util.module_from_spec(spec)
spec.loader.exec_module(estimator)

from tf_pose.networks import get_graph_path, model_wh
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
      logger.debug('initialization %s : %s' % ('mobilenet_v2_small', 'streaming/mobilenet_v2_small/graph_opt.pb'))

      w, h = model_wh('432x368')
      e = estimator.TfPoseEstimator('streaming/mobilenet_v2_small/graph_opt.pb', target_size=(w, h), trt_bool=False)

      logger.debug('cam read+')

      count = 0
      y1 = [0,0]
      frame = 0
      fps_time = 0

      i = 1
      count += 1

      humans = e.inference(image, resize_to_default=(w > 0 and h > 0))
      # In humans total num of detected person in frame
      image = estimator.TfPoseEstimator.draw_humans(image, humans, imgcopy=False)

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
      cv2.putText(image,
        "Error while trying to run detection - pose estimation is not running",
        (10, 15),  cv2.FONT_HERSHEY_SIMPLEX, 0.5,
        (0, 0, 255), 2)

      ret, jpeg = cv2.imencode('.jpg', image)

      return jpeg.tobytes()
