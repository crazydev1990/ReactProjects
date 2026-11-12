import React, { useState, useEffect, useRef } from "react";

function TeamsMeeting() {
  // 1. Meeting states
  const [inMeeting, setInMeeting] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  // 2. Chat states
  const [messages, setMessages] = useState([
    {
      sender: "Rahul (Team Lead)",
      text: "Hello everyone! Welcome to the sprint call."
    },
    {
      sender: "Priya",
      text: "Hi! My screen and audio are ready."
    }
  ]);

  const [chatInput, setChatInput] = useState("");
  const [mediaError, setMediaError] = useState("");

  // 3. Refs
  const videoRef = useRef(null);
  const cameraStreamRef = useRef(null);
  const screenStreamRef = useRef(null);

  // 4. Stop all media streams
  const stopAllStreams = () => {
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      cameraStreamRef.current = null;
    }

    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      screenStreamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsScreenSharing(false);
  };

  // 5. Start camera and microphone
  useEffect(() => {
    let isCancelled = false;

    const startCamera = async () => {
      try {
        setMediaError("");

        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error(
            "Camera access is not supported. Use HTTPS or localhost."
          );
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });

        // If the component was closed before permission was granted
        if (isCancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        cameraStreamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        setIsCamOn(true);
        setIsMicOn(true);
      } catch (error) {
        console.error("Camera access error:", error);

        setMediaError(
          error.message || "Unable to access camera or microphone."
        );
      }
    };

    if (inMeeting) {
      startCamera();
    }

    return () => {
      isCancelled = true;

      if (cameraStreamRef.current) {
        cameraStreamRef.current.getTracks().forEach((track) => {
          track.stop();
        });

        cameraStreamRef.current = null;
      }

      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach((track) => {
          track.stop();
        });

        screenStreamRef.current = null;
      }
    };
  }, [inMeeting]);

  // 6. Microphone mute / unmute
  const toggleMic = () => {
    const audioTrack =
      cameraStreamRef.current?.getAudioTracks()[0];

    if (!audioTrack) {
      setMediaError("Microphone is not available.");
      return;
    }

    audioTrack.enabled = !audioTrack.enabled;
    setIsMicOn(audioTrack.enabled);
  };

  // 7. Camera on / off
  const toggleCamera = () => {
    const videoTrack =
      cameraStreamRef.current?.getVideoTracks()[0];

    if (!videoTrack) {
      setMediaError("Camera is not available.");
      return;
    }

    videoTrack.enabled = !videoTrack.enabled;
    setIsCamOn(videoTrack.enabled);
  };

  // 8. Stop screen sharing
  const stopScreenShare = () => {
    if (screenStreamRef.current) {
      const screenStream = screenStreamRef.current;

      // Clear the reference before stopping tracks
      screenStreamRef.current = null;

      screenStream.getTracks().forEach((track) => {
        track.stop();
      });
    }

    setIsScreenSharing(false);

    // Show camera stream again
    if (videoRef.current && cameraStreamRef.current) {
      videoRef.current.srcObject = cameraStreamRef.current;
    }
  };

  // 9. Start / stop screen sharing
  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      stopScreenShare();
      return;
    }

    try {
      setMediaError("");

      if (!navigator.mediaDevices?.getDisplayMedia) {
        throw new Error("Screen sharing is not supported in this browser.");
      }

      const screenStream =
        await navigator.mediaDevices.getDisplayMedia({
          video: true
        });

      // Do not continue if the user has already left the meeting
      if (!inMeeting) {
        screenStream.getTracks().forEach((track) => track.stop());
        return;
      }

      screenStreamRef.current = screenStream;

      if (videoRef.current) {
        videoRef.current.srcObject = screenStream;
      }

      setIsScreenSharing(true);

      // Detect when the user clicks the browser's Stop sharing button
      const screenTrack = screenStream.getVideoTracks()[0];

      if (screenTrack) {
        screenTrack.addEventListener(
          "ended",
          stopScreenShare,
          { once: true }
        );
      }
    } catch (error) {
      console.error("Screen sharing error:", error);

      setMediaError(
        error.message || "Unable to share your screen."
      );
    }
  };

  // 10. Send chat message
  const sendChatMessage = (event) => {
    event.preventDefault();

    const messageText = chatInput.trim();

    if (!messageText) {
      return;
    }

    setMessages((previousMessages) => [
      ...previousMessages,
      {
        sender: "You",
        text: messageText
      }
    ]);

    setChatInput("");
  };

  // 11. Leave meeting
  const leaveMeeting = () => {
    stopAllStreams();
    setInMeeting(false);
  };

  // 12. Rejoin meeting screen
  if (!inMeeting) {
    return (
      <div
        style={{
          maxWidth: "450px",
          margin: "40px auto",
          padding: "30px",
          backgroundColor: "#0f172a",
          borderRadius: "20px",
          border: "2px solid #4f46e5",
          color: "#fff",
          textAlign: "center",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <h3 style={{ color: "#818cf8" }}>
          You left the Teams meeting 📞
        </h3>

        <p
          style={{
            fontSize: "13px",
            color: "#94a3b8",
            marginBottom: "20px"
          }}
        >
          Call ended. Click below to rejoin.
        </p>

        <button
          onClick={() => setInMeeting(true)}
          style={{
            padding: "12px 24px",
            backgroundColor: "#4f46e5",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          🔄 Rejoin Meeting
        </button>
      </div>
    );
  }

  // 13. Main meeting UI
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#0f172a",
        borderRadius: "20px",
        border: "2px solid #4f46e5",
        color: "#fff",
        fontFamily: "Arial, sans-serif"
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #1e293b",
          paddingBottom: "12px",
          marginBottom: "15px",
          gap: "10px",
          flexWrap: "wrap"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}
        >
          <span
            style={{
              backgroundColor: "#4f46e5",
              padding: "6px 10px",
              borderRadius: "8px",
              fontWeight: "bold"
            }}
          >
            T
          </span>

          <strong style={{ fontSize: "16px" }}>
            Daily Standup Meeting
          </strong>
        </div>

        <span
          style={{
            fontSize: "12px",
            color: "#4ade80",
            fontWeight: "bold"
          }}
        >
          🟢 Meeting Active
        </span>
      </div>

      {/* Media error message */}
      {mediaError && (
        <div
          style={{
            backgroundColor: "#7f1d1d",
            color: "#fecaca",
            padding: "10px",
            borderRadius: "8px",
            fontSize: "13px",
            marginBottom: "15px"
          }}
        >
          {mediaError}
        </div>
      )}

      {/* Video grid and chat */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "15px",
          marginBottom: "15px"
        }}
      >
        {/* Video section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          }}
        >
          <div
            style={{
              backgroundColor: "#020617",
              borderRadius: "14px",
              height: "280px",
              position: "relative",
              overflow: "hidden",
              border: "2px solid #334155",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: isScreenSharing ? "none" : "scaleX(-1)",
                display:
                  isCamOn || isScreenSharing ? "block" : "none"
              }}
            />

            {!isCamOn && !isScreenSharing && (
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  backgroundColor: "#4f46e5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  fontWeight: "bold"
                }}
              >
                YOU
              </div>
            )}

            <span
              style={{
                position: "absolute",
                bottom: "10px",
                left: "10px",
                backgroundColor: "rgba(0,0,0,0.7)",
                padding: "4px 10px",
                borderRadius: "6px",
                fontSize: "12px"
              }}
            >
              {isScreenSharing
                ? "🖥️ You are presenting screen"
                : `You ${isMicOn ? "🎤" : "🔇"}`}
            </span>
          </div>

          {/* Simulated participants */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px"
            }}
          >
            <div
              style={{
                backgroundColor: "#020617",
                padding: "15px",
                borderRadius: "12px",
                border: "1px solid #1e293b",
                textAlign: "center"
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#0284c7",
                  margin: "0 auto 6px",
                  lineHeight: "40px",
                  fontWeight: "bold"
                }}
              >
                R
              </div>

              <div style={{ fontSize: "12px", fontWeight: "bold" }}>
                Rahul (Host) 🎤
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#020617",
                padding: "15px",
                borderRadius: "12px",
                border: "1px solid #1e293b",
                textAlign: "center"
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#db2777",
                  margin: "0 auto 6px",
                  lineHeight: "40px",
                  fontWeight: "bold"
                }}
              >
                P
              </div>

              <div style={{ fontSize: "12px", fontWeight: "bold" }}>
                Priya 🔇
              </div>
            </div>
          </div>
        </div>

        {/* Chat panel */}
        <div
          style={{
            backgroundColor: "#020617",
            borderRadius: "14px",
            border: "1px solid #1e293b",
            padding: "12px",
            display: "flex",
            flexDirection: "column",
            height: "380px",
            boxSizing: "border-box"
          }}
        >
          <div
            style={{
              fontSize: "13px",
              fontWeight: "bold",
              borderBottom: "1px solid #1e293b",
              paddingBottom: "8px",
              color: "#818cf8"
            }}
          >
            💬 Meeting Chat
          </div>

          <div
            style={{
              flexGrow: 1,
              overflowY: "auto",
              padding: "10px 0",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              textAlign: "left"
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#0f172a",
                  padding: "8px 10px",
                  borderRadius: "8px",
                  fontSize: "12px"
                }}
              >
                <strong
                  style={{
                    color: "#38bdf8",
                    display: "block",
                    marginBottom: "2px"
                  }}
                >
                  {msg.sender}
                </strong>

                <span style={{ color: "#cbd5e1" }}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          <form
            onSubmit={sendChatMessage}
            style={{ display: "flex", gap: "6px" }}
          >
            <input
              type="text"
              value={chatInput}
              onChange={(event) => setChatInput(event.target.value)}
              placeholder="Type a message..."
              style={{
                flex: 1,
                minWidth: 0,
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #334155",
                backgroundColor: "#0f172a",
                color: "#fff",
                fontSize: "12px",
                outline: "none"
              }}
            />

            <button
              type="submit"
              style={{
                padding: "8px 12px",
                backgroundColor: "#4f46e5",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "12px"
              }}
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Meeting controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          backgroundColor: "#020617",
          padding: "12px",
          borderRadius: "16px",
          border: "1px solid #1e293b",
          flexWrap: "wrap"
        }}
      >
        <button
          onClick={toggleMic}
          style={{
            padding: "10px 18px",
            borderRadius: "10px",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
            backgroundColor: isMicOn ? "#1e293b" : "#ef4444",
            color: "#fff"
          }}
        >
          {isMicOn ? "🎤 Mute" : "🔇 Unmute"}
        </button>

        <button
          onClick={toggleCamera}
          style={{
            padding: "10px 18px",
            borderRadius: "10px",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
            backgroundColor: isCamOn ? "#1e293b" : "#ef4444",
            color: "#fff"
          }}
        >
          {isCamOn ? "📷 Stop Video" : "🚫 Start Video"}
        </button>

        <button
          onClick={toggleScreenShare}
          style={{
            padding: "10px 18px",
            borderRadius: "10px",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
            backgroundColor: isScreenSharing ? "#22c55e" : "#38bdf8",
            color: "#000"
          }}
        >
          {isScreenSharing ? "🛑 Stop Sharing" : "🖥️ Share Screen"}
        </button>

        <button
          onClick={leaveMeeting}
          style={{
            padding: "10px 22px",
            borderRadius: "10px",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
            backgroundColor: "#dc2626",
            color: "#fff"
          }}
        >
          📞 Leave Call
        </button>
      </div>
    </div>
  );
}

export default TeamsMeeting;