"use client";
import "./style.scss";
import { useEffect } from "react";
import { StockList } from "./Stocks/StockList";
import { useStocks } from "./Stocks/useStocks";

function WebSocketClient() {
  const {setWebSocket, onMessage, webSocket} = useStocks();

  useEffect(() => {
    // Create WebSocket connection.
    const wsConnection = new WebSocket("ws://localhost:8080");

    // Connection opened
    wsConnection.addEventListener("open", () => {
      console.log("Connected to the WebSocket server at ws://localhost:8080");
    });

    setWebSocket(wsConnection);
    console.log('🎸', '='.repeat(5), `wsConnection`, wsConnection);

    wsConnection.addEventListener("message", (event) => {
      onMessage(event);
    });

    return () => {
      webSocket?.close();
    };
  }, []);

  return <section>
    <h1>Stocks</h1>
    <StockList />
  </section>;
}

export default WebSocketClient;
