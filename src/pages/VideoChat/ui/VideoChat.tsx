import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import { Mic, MicOff, PhoneOff, User, Video, VideoOff } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { ROUTER_PATH } from "@/shared/router/path";

export const VideoChatPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream>(null);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  const trackListenersRef = useRef<
    Array<{
      track: MediaStreamTrack;
      onEnded: () => void;
    }>
  >([]);

  const attachTrackListeners = (stream: MediaStream) => {
    trackListenersRef.current.forEach(({ track, onEnded }) => {
      track.removeEventListener("ended", onEnded);
    });
    trackListenersRef.current = [];

    const addForTrack = (track: MediaStreamTrack) => {
      const onEnded = () => {
        stopMedia();
      };
      track.addEventListener("ended", onEnded);
      trackListenersRef.current.push({ track, onEnded });
    };

    stream.getTracks().forEach(addForTrack);
  };

  const toggleAudio = () => {
    if (!streamRef.current) return;
    streamRef.current.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setIsAudioMuted((prev) => !prev);
  };

  const toggleVideo = () => {
    if (!streamRef.current) return;
    streamRef.current.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setIsVideoMuted((prev) => !prev);
  };

  const initializeMedia = async () => {
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = localStream;
        streamRef.current = localStream;
      }

      setIsAudioMuted(false);
      setIsVideoMuted(false);
      attachTrackListeners(localStream);
    } catch (err) {
      console.log("Error accessing media devices:" + err);
      setIsAudioMuted(true);
      setIsVideoMuted(true);
    }
  };

  const stopMedia = async () => {
    if (streamRef.current) {
      trackListenersRef.current.forEach(({ track, onEnded }) => {
        track.removeEventListener("ended", onEnded);
      });
      trackListenersRef.current = [];
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsAudioMuted(true);
    setIsVideoMuted(true);
  };

  useEffect(() => {
    initializeMedia();
    return () => {
      stopMedia();
    };
  }, []);

  return (
    <div className="flex flex-col justify-between items-center gap-2 h-full ">
      <div className="w-full h-[calc(100vh-80px)] flex justify-center items-center relative">
        {isVideoMuted && (
          <div className="absolute flex justify-center items-center w-full h-full bg-cyan-500 rounded-md">
            <User size={56} color="#fff" />
          </div>
        )}
        <video
          ref={videoRef}
          muted={isAudioMuted}
          className={`h-full object-contain rounded-md`}
          playsInline
          autoPlay
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
          onClick={stopMedia}
          className="flex justify-center items-center p-3 px-6 font-bold rounded-full bg-red-500 hover:bg-red-400"
        >
          <PhoneOff color="#fff" />
        </NavLink>
      </div>
    </div>
  );
};
