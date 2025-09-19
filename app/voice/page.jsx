// "use client";
// import { motion, useAnimation } from "framer-motion";
// import { useEffect, useRef, useState } from "react";

// export default function AnimatedAmoeba() {
//   const controls = useAnimation();
//   const wsRef = useRef(null);
//   const audioContextRef = useRef(null);
//   const [status, setStatus] = useState("Disconnected");
//   const [transcript, setTranscript] = useState("");
//   const [isSpeaking, setIsSpeaking] = useState(false);

//   const randomize = () => {
//     const x = (Math.random() - 0.5) * 50;
//     const y = (Math.random() - 0.5) * 50;
//     const borderRadius = `${Math.floor(Math.random() * 50) + 30}% ${
//       Math.floor(Math.random() * 50) + 30
//     }%`;
//     const gradients = [
//       "linear-gradient(135deg, #1E3C72, #2A5298)",
//       "linear-gradient(135deg, #2980B9, #6DD5FA)",
//       "linear-gradient(135deg, #56CCF2, #2F80ED)",
//       "linear-gradient(135deg, #1CB5E0, #000851)",
//       "linear-gradient(135deg, #3A7BD5, #00D2FF)",
//       "linear-gradient(135deg, #4facfe, #00f2fe)",
//       "linear-gradient(135deg, #005C97, #363795)",
//     ];
//     const background = gradients[Math.floor(Math.random() * gradients.length)];
//     return {
//       x,
//       y,
//       borderRadius,
//       background,
//       boxShadow: `0px 20px 60px rgba(0,0,0,0.2)`,
//       transition: { duration: 1, ease: "easeInOut" },
//     };
//   };

//   const speakText = (text) => {
//     if (!window.speechSynthesis) return;

//     // Cancel any previous speech
//     window.speechSynthesis.cancel();

//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = "en-US"; // or "hi-IN" for Hindi
//     utterance.pitch = 1; // 0–2
//     utterance.rate = 1; // 0.1–10
//     utterance.volume = 1; // 0–1

//     utterance.onstart = () => setIsSpeaking(true);
//     utterance.onend = () => setIsSpeaking(false);
//     window.speechSynthesis.speak(utterance);
//   };

//   useEffect(() => {
//     wsRef.current = new WebSocket("ws://localhost:8000/ws");

//     wsRef.current.onopen = () => {
//       setStatus("Connected");
//       startStreaming();
//     };

//     wsRef.current.onmessage = (event) => {
//       console.log("Transcript:", event.data);
//       setTranscript((prev) => prev + " " + event.data);
//       let msg = event.data;
//       console.log(msg);
//       if (msg.length > 0) speakText(msg);
//     };

//     wsRef.current.onclose = () => setStatus("Disconnected");
//     wsRef.current.onerror = () => setStatus("Error");

//     return () => {
//       wsRef.current?.close();
//       if (audioContextRef.current) {
//         audioContextRef.current.close();
//       }
//     };
//   }, []);

//   const startStreaming = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       audioContextRef.current = new AudioContext();
//       const source = audioContextRef.current.createMediaStreamSource(stream);
//       const processor = audioContextRef.current.createScriptProcessor(
//         4096,
//         1,
//         1
//       );

//       source.connect(processor);
//       processor.connect(audioContextRef.current.destination);

//       processor.onaudioprocess = (e) => {
//         if (isSpeaking) return;
//         if (wsRef.current?.readyState === WebSocket.OPEN) {
//           const inputData = e.inputBuffer.getChannelData(0);
//           const int16 = new Int16Array(inputData.length);
//           for (let i = 0; i < inputData.length; i++) {
//             const s = Math.max(-1, Math.min(1, inputData[i]));
//             int16[i] = s * 0x7fff;
//           }
//           wsRef.current.send(int16.buffer);
//         }
//       };
//     } catch (err) {
//       console.error("Mic error:", err);
//       setStatus("Mic error");
//     }
//   };

//   useEffect(() => {
//     const animate = async () => {
//       while (true) {
//         await controls.start(randomize());
//       }
//     };
//     animate();
//   }, [controls]);

//   return (
//     <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-200 to-blue-200 overflow-hidden">
//       <motion.div animate={controls} className="rounded-full w-64 h-64" />
//       <p className="mt-4 text-lg font-semibold text-blue-800">{status}</p>
//       {/* <div className="mt-4 p-2 max-w-sm text-blue-900 bg-white/40 rounded-lg overflow-y-auto h-32">
//         {transcript || "Speak to see the transcript here..."}
//       </div> */}
//     </div>
//   );
// }
"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function AnimatedAmoeba() {
  const controls = useAnimation();
  const wsRef = useRef(null);
  const audioContextRef = useRef(null);
  const currentSourceRef = useRef(null); // ✅ Store current audio source

  const [status, setStatus] = useState("Disconnected");
  const [transcript, setTranscript] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // ✅ Amoeba animation randomizer
  const randomize = () => {
    const x = (Math.random() - 0.5) * 50;
    const y = (Math.random() - 0.5) * 50;
    const borderRadius = `${Math.floor(Math.random() * 50) + 30}% ${
      Math.floor(Math.random() * 50) + 30
    }%`;
    const gradients = [
      "linear-gradient(135deg, #1E3C72, #2A5298)",
      "linear-gradient(135deg, #2980B9, #6DD5FA)",
      "linear-gradient(135deg, #56CCF2, #2F80ED)",
      "linear-gradient(135deg, #1CB5E0, #000851)",
      "linear-gradient(135deg, #3A7BD5, #00D2FF)",
      "linear-gradient(135deg, #4facfe, #00f2fe)",
      "linear-gradient(135deg, #005C97, #363795)",
    ];
    const background = gradients[Math.floor(Math.random() * gradients.length)];
    return {
      x,
      y,
      borderRadius,
      background,
      boxShadow: "0px 20px 60px rgba(0,0,0,0.2)",
      transition: { duration: 1, ease: "easeInOut" },
    };
  };

  // ✅ Decode base64 and play audio
  const playAudio = async (base64Data) => {
    try {
      const audioData = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
      const buffer = await audioContextRef.current.decodeAudioData(
        audioData.buffer.slice(0)
      );
      const source = audioContextRef.current.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContextRef.current.destination);
      source.start(0);

      // Track source for stopping
      currentSourceRef.current = source;
      setIsPlaying(true);

      source.onended = () => {
        setIsPlaying(false);
        currentSourceRef.current = null;
      };
    } catch (err) {
      console.error("Audio playback error:", err);
      setIsPlaying(false);
    }
  };

  // ✅ Stop currently playing audio
  const stopAudio = () => {
    if (currentSourceRef.current) {
      currentSourceRef.current.stop();
      currentSourceRef.current.disconnect();
      currentSourceRef.current = null;
      setIsPlaying(false);
    }
  };

  // ✅ Handle WebSocket messages
  const handleMessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type === "audio") {
        setTranscript((prev) => prev + " " + data.text);
        playAudio(data.audio);
      } else if (data.type === "error") {
        // console.error("Server error:", data.message);
      } else {
        setTranscript((prev) => prev + " " + event.data);
      }
    } catch {
      setTranscript((prev) => prev + " " + event.data);
    }
  };

  // ✅ Start microphone streaming
  const startStreaming = async () => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.error("WebSocket not connected");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);

      source.connect(processor);
      processor.connect(audioContext.destination);

      processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        const int16 = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
          int16[i] = Math.max(-1, Math.min(1, inputData[i])) * 0x7fff;
        }
        if (wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(int16.buffer);
        }
      };
      setIsStreaming(true);
    } catch (err) {
      console.error("Mic error:", err);
      setStatus("Mic error");
    }
  };

  // ✅ WebSocket lifecycle
  useEffect(() => {
    wsRef.current = new WebSocket("ws://localhost:8000/ws");

    wsRef.current.onopen = () => setStatus("Connected");
    wsRef.current.onmessage = handleMessage;
    wsRef.current.onclose = () => {
      setStatus("Disconnected");
      setIsStreaming(false);
    };
    wsRef.current.onerror = () => setStatus("Error");

    return () => {
      if (wsRef.current?.readyState === WebSocket.OPEN) wsRef.current.close();
      if (audioContextRef.current?.state !== "closed") audioContextRef.current.close();
      stopAudio();
    };
  }, []);

  // ✅ Amoeba animation loop
  useEffect(() => {
    const animate = async () => {
      while (true) {
        await controls.start(randomize());
      }
    };
    animate();
  }, [controls]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-200 to-blue-200 overflow-hidden">
      <motion.div animate={controls} className="rounded-full w-64 h-64" />
      <p className="mt-4 text-lg font-semibold text-blue-800">{status}</p>
      <p className="mt-2 text-sm text-blue-700 max-w-xl text-center">
        {transcript || "Speak to see the transcript here..."}
      </p>

      {!isStreaming && status === "Connected" && (
        <button
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={startStreaming}
        >
          Start Voice Bot
        </button>
      )}

      {isPlaying && (
        <button
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={stopAudio}
        >
          Stop Audio
        </button>
      )}
    </div>
  );
}
