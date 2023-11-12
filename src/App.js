import React, { useState } from 'react';
import { Recorder } from 'react-voice-recorder';
import 'react-voice-recorder/dist/index.css'
import "./App.css";
import axios from 'axios'


const App = () => {
  const [audioDetails, setAudioDetails] = useState({
    url: null,
    blob: null,
    chunks: null,
    duration: { h: 0, m: 0, s: 0 }
  });
  const [transcription, setTranscription] = useState('');


  const handleAudioStop = (data) => {
    console.log(data);
    setAudioDetails(data);
    console.log(data)
  };
const handleCountDown=(data)=>{

}
    const handleAudioUpload = async () => {
        if (audioDetails.blob) {
            const formData = new FormData();
            formData.append('audio', audioDetails.blob, 'audio.webm');

            try {
                const response = await axios.post('http://localhost:3000/transcribe', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setTranscription(response.data.transcription);
                console.log("transcription result", transcription)
            } catch (error) {
                console.error('Error uploading the audio file:', error);
            }
        } else {
            console.error('No audio to upload');
        }
    };


  const handleReset = () => {
    setAudioDetails({
      url: null,
      blob: null,
      chunks: null,
      duration: { h: 0, m: 0, s: 0 }
    });
  };

  return (
      <div style={{display:"flex", flexDirection:"column"}}>
            <textarea
                style={{height:80, flexGrow:1}}
                className="text-area"
                placeholder="Voice-to-text output will appear here..."
                value={transcription}
           / >


        <div style={{height:"10%"}} >
          <Recorder
              record={true}
              title={"New recording"}
              audioURL={audioDetails.url}
              showUIAudio
              handleAudioStop={data => handleAudioStop(data)}
              handleAudioUpload={data => handleAudioUpload(data)}
              handleCountDown={data => handleCountDown(data)}
              handleReset={() => handleReset()}
              mimeTypeToUseWhenRecording={"audio/webm"}
          />
        </div>
      </div>
  );
};

export default App;
