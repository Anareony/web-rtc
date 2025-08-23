import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import { Mic, MicOff, PhoneOff, Video, VideoOff } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { ROUTER_PATH } from "@/shared/router/path";

export const VideoChatPage = () => {
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
        video.current.onloadedmetadata = () => video.current?.play();
      } catch (err) {
        console.log("Error accessing media devices:" + err);
      }
    };

    initializeMedia();

    return () => {};
  }, []);

  return (
    <div className="flex flex-col justify-between items-center gap-2 h-full ">
      <div className="w-full h-[calc(100vh-100px)] flex justify-center">
        <div
          className={`w-full h-full object-contain rounded-md bg-cyan-500 ${
            !isVideoMuted ? "hidden" : null
          }`}
        />
        <video
          ref={video}
          muted={isAudioMuted}
          className={`h-full object-contain rounded-md ${
            isVideoMuted ? "hidden" : null
          }`}
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={toggleAudio} isActive={isAudioMuted}>
          {isAudioMuted ? <MicOff color="#621410" /> : <Mic color="#fff" />}
        </Button>
        <Button onClick={toggleVideo} isActive={isVideoMuted}>
          {isVideoMuted ? <VideoOff color="#621410" /> : <Video color="#fff" />}
        </Button>
        <NavLink
          to={ROUTER_PATH.TODO_LIST}
          className="flex justify-center items-center p-3 px-6 font-bold rounded-full bg-red-500 hover:bg-red-400"
        >
          <PhoneOff color="#fff" />
        </NavLink>
      </div>
    </div>
  );
};
