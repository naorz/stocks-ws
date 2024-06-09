"use client";
import { useEffect, useRef } from "react";

function WebSocketClient() {
  let socket = new WebSocket("ws://localhost:8080");

  useEffect(() => {
    // Connection opened
    socket.addEventListener("open", () => {
      console.log("Connected to the WebSocket server at ws://localhost:8080");
    });

    return () => {
      socket.close();
    };
  }, []);

  return <div>WebSocket Client</div>;
}

export default WebSocketClient;
