"use client";

import { React, FC } from "react";

interface MicButtonProps {
  onTranscribe: (text: string) => void;
}

const MicButton: FC<MicButtonProps> = ({ onTranscribe }) => {
  const handleClick = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    const audioChunks: Blob[] = [];

    recorder.ondataavailable = e => audioChunks.push(e.data);
    recorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      const base64Audio = await blobToBase64(audioBlob);
      const res = await fetch("/api/speech", {
        method: "POST",
        body: JSON.stringify({ audio: base64Audio }),
      });
      const { transcript }: { transcript: string } = await res.json();
      onTranscribe(transcript);
    };

    recorder.start();
    setTimeout(() => recorder.stop(), 3000);
  };

  return <button onClick={handleClick}>🎤</button>;
};

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(",")[1]);
    reader.readAsDataURL(blob);
  });
}

export default MicButton;