import * as faceApi from "face-api.js";

const loadModel = async (modelPath: string): Promise<void> => {
  await faceApi.nets.tinyFaceDetector.loadFromUri(modelPath);
  await faceApi.nets.faceLandmark68Net.loadFromUri(modelPath);
  await faceApi.nets.faceExpressionNet.loadFromUri(modelPath);
};

const streamVideo = (videoElement: HTMLVideoElement) => {
  navigator.getUserMedia(
    { video: {} },
    stream => (videoElement.srcObject = stream),
    err => console.error(err),
  );
};

const detectFace = (videoElement: HTMLVideoElement) => {
  videoElement.addEventListener("play", () => {
    const canvas: HTMLCanvasElement = faceApi.createCanvasFromMedia(videoElement);
    document.body.append(canvas);
    const displaySize = {
      width: videoElement.width,
      height: videoElement.height,
    };
    faceApi.matchDimensions(canvas, displaySize);
    setInterval(async () => {
      const detections = await faceApi
        .detectAllFaces(videoElement, new faceApi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
      // @ts-ignore
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      const resizeDetections = faceApi.resizeResults(detections, displaySize);
      faceApi.draw.drawDetections(canvas, resizeDetections);
      faceApi.draw.drawFaceLandmarks(canvas, resizeDetections);
      faceApi.draw.drawFaceExpressions(canvas, resizeDetections);
    }, 200);
  });
};

loadModel("models")
  .then(() => {
    const videoPlayer: HTMLVideoElement = document.getElementById("video") as HTMLVideoElement;
    if (!!videoPlayer) {
      streamVideo(videoPlayer);
      detectFace(videoPlayer);
    }
  })
  .catch(err => console.error(err));
