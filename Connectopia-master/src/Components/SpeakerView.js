import React, { useEffect, useMemo, useRef, useState } from "react";
import {BsFillMicFill,BsFillCameraVideoFill, BsFillMicMuteFill,BsFillCameraVideoOffFill,BsGraphUp,BsFillChatLeftTextFill} from 'react-icons/bs'

import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
  Constants,
  usePubSub
} from "@videosdk.live/react-sdk";

import Controls from "./Controls";
import ParticipantView from "./ParticipantView";
import Hls from "hls.js";
import Whiteboard from "./Whiteboard";
import ExcalidrawBoard from "./Excalidraw";
import Participants from "./Participants";


function SpeakerView() {
  //Get the participants and hlsState from useMeeting
  const { participants, hlsState } = useMeeting();
  const [showParticipants, setShowParticipants] = useState(true);
  //Filtering the host/speakers from all the participants
  const speakers = useMemo(() => {
    const speakerParticipants = [...participants.values()].filter(
      (participant) => {
        return participant.mode === Constants.modes.CONFERENCE;
      }
    );
    return speakerParticipants;
  }, [participants]);
  
  //Filtering the viewers from all the participants
  const viewers = useMemo(() => {
    const viewersParticipants = [...participants.values()].filter(
      (participant) => {
        return participant.mode === Constants.modes.VIEWER;
      }
    );
    return viewersParticipants;
  }, [participants]);

  const playerRef = useRef(null);
  //Getting the hlsUrls
  const { hlsUrls, leave,toggleMic, toggleWebcam, startHls, stopHls} = useMeeting();
  //Playing the HLS stream when the downstreamUrl is present and it is playable
  
const handleToggleParticipants = () => {
    setShowParticipants((prevShow) => !prevShow);
  };

  useEffect(() => {
    if (hlsUrls.downstreamUrl && hlsState === "HLS_PLAYABLE") {
      if (Hls.isSupported()) {
        const hls = new Hls({
          capLevelToPlayerSize: true,
          maxLoadingDelay: 4,
          minAutoBitrate: 0,
          autoStartLoad: true,
          defaultAudioCodec: "mp4a.40.2",
        });

        let player = document.querySelector("#hlsPlayer");

        hls.loadSource(hlsUrls.downstreamUrl);
        hls.attachMedia(player);
      } else {
        if (typeof playerRef.current?.play === "function") {
          playerRef.current.src = hlsUrls.downstreamUrl;
          playerRef.current.play();
        }
      }
  }
  }, [hlsUrls, hlsState, playerRef.current]);
  

  return (
    <div className=""> 
    <div className="d-flex flex-row">
      {/* Controls for the meeting */}
      {showParticipants && (
        <Participants/>
      )}
      
      {hlsState !== "HLS_PLAYABLE" ? (
        <div>
          <p>HLS has not started yet or is stopped</p>
        </div>
      ) : (
        hlsState === "HLS_PLAYABLE" && (
          <div className="container mt-4 mb-4 rounded border-none">
            
            <video
              ref={playerRef}
              id="hlsPlayer"
              autoPlay={true}
              controls
              style={{ width: "100%", height: "100%" }}
              playsinline
              playsInline
              muted={true}
              playing
              onError={(err) => {
                console.log(err, "hls video error");
              }}
            ></video>
          </div>
        )
      )}
      </div>
      <Controls />
      <button onClick={handleToggleParticipants}>
        {showParticipants ? "Hide Participants" : "Show Participants"}
      </button>
      
    </div>
  );
}

export default SpeakerView
