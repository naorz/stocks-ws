"use client";
import { useEffect, useRef } from "react";

function WebSocketClient() {
  const socket = useRef<any>(null);

  useEffect(() => {
    // Create WebSocket connection.
    socket.current = new WebSocket("ws://localhost:8080");

    // Connection opened
    socket.current.addEventListener("open", () => {
      console.log("Connected to the WebSocket server at ws://localhost:8080");
    });

    return () => {
      socket.current.close();
    };
  }, []);

  return <div>WebSocket Client</div>;
}

export default WebSocketClient;
