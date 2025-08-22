import { useEffect, useRef, useState } from "react";

export const VideoRoomPage = () => {
  const video = useRef<HTMLVideoElement>(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  const toggleAudio = () => {
    if (!video.current?.srcObject) return;

    const stream = video.current.srcObject as MediaStream;
    stream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setIsAudioMuted((prev) => !prev);
  };

  const toggleVideo = () => {
    if (!video.current?.srcObject) return;

    const stream = video.current.srcObject as MediaStream;
    stream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setIsVideoMuted((prev) => !prev);
  };

  useEffect(() => {
    const initializeMedia = async () => {
      try {
        const localStream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 },
          audio: true,
        });

        if (!video.current) return;

        video.current.srcObject = localStream;
        video.current.onloadedmetadata = function (e) {
          video.current?.play();
        };
      } catch (err) {
        console.log("Error accessing media devices:" + err);
      }
    };

    initializeMedia();
  }, []);

  return (
    <>
      <button onClick={toggleAudio}>mute</button>
      <button onClick={toggleVideo}>toggle video</button>

      <video ref={video} id="video" playsInline muted={isAudioMuted}>
        Video stream not available.
      </video>
    </>
  );
};
