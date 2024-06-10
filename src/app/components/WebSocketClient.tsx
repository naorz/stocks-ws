"use client";
import { useEffect, useState } from "react";

function WebSocketClient() {
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    // Create WebSocket connection.
    const wsConnection = new WebSocket("ws://localhost:8080");

    // Connection opened
    wsConnection.addEventListener("open", () => {
      console.log("Connected to the WebSocket server at ws://localhost:8080");
    });

    setSocket(wsConnection);

    return () => {
      socket?.close();
    };
  }, []);

  return <div>WebSocket Client</div>;
}

export default WebSocketClient;
