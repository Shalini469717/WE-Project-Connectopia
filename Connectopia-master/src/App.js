import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import { useEffect, useMemo, useRef } from "react"
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
  Constants,
} from "@videosdk.live/react-sdk";

import { authToken, createMeeting } from "./API";


import JoinScreen from "./Components/JoinScreen";


import ReactPlayer from "react-player";

import ParticipantView from "./Components/ParticipantView";
import Controls from "./Components/Controls";
import SpeakerView from "./Components/SpeakerView";
import ViewerView from "./Components/ViewerView";
import Container from "./Components/Container";
import Messages from "./Components/Messages";
import MeetingView from "./Components/Meetingview";




function App() {


  const [meetingId, setMeetingId] = useState(null);
  //State to handle the mode of the participant i.e. CONFERNCE or VIEWER
  const [mode, setMode] = useState("CONFERENCE");

  //Getting MeetingId from the API we created earlier
  // check create-meeting in API.js
  const getMeetingAndToken = async (id) => {
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

  // when the meeting is left
  const onMeetingLeave = () => {
    setMeetingId(null);
  };

 

  return (
    <div className="">
      
    {authToken && meetingId ? (
      <MeetingProvider
        config={{
          meetingId,
          micEnabled: false,
          webcamEnabled: false,
          name: "John Doe",
          mode: mode,
        }}
        token={authToken}
      >
        <MeetingConsumer>
          {() => (
            <>
              <Container meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
            </>
          )}
        </MeetingConsumer>
      </MeetingProvider>
    ) : (
      <JoinScreen getMeetingAndToken={getMeetingAndToken} setMode={setMode} />
    )}
  </div>
);
}
export default App;
