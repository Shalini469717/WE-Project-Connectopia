import { useEffect, useMemo, useRef, useState } from "react"
import {BsFillMicFill,BsFillCameraVideoFill, BsCameraVideoFill} from 'react-icons/bs'
import {TbScreenShare} from 'react-icons/tb'
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
  Constants,
} from "@videosdk.live/react-sdk";

function Controls() {
  const { leave, toggleMic, toggleWebcam, startHls, stopHls,end,enableScreenShare, disableScreenShare, toggleScreenShare } = useMeeting();
  return (
    <div>
      <button className="btn btn-danger me-2" onClick={() => leave()}>Leave</button>
      {/* <button className="btn btn-danger" onClick={() => end()}>end</button> */}
      &emsp;|&emsp;
      
      <button className="btn btn-light me-2" onClick={() => toggleMic()}><BsFillMicFill/></button>
      <button className="btn btn-light" onClick={() => toggleWebcam()}><BsFillCameraVideoFill/></button>
      &emsp;|&emsp;
      {/* <button className="btn btn-light me-2" onClick={() => toggleScreenShare()}><TbScreenShare/></button> */}
    </div>
  );
}

export default Controls
