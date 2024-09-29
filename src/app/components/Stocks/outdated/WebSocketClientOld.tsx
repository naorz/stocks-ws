"use client";
import { useEffect } from "react";
import { Stocks } from "./Stocks";
import { useStocks } from "./Stocks/useStocks";

// type WebSocketEvent = {
//   event: string,
//   stocks: [{string: string}]
// }


function WebSocketClient() {
  // const [socket, setSocket] = useState<WebSocket>();
  // const [symbolDataListData, setSymbolDataList] = useState();
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
      // console.log('🎸', '='.repeat(5), `incoming message`, event.data)
      onMessage(event);
      // const data = JSON.parse(event.data);

      // switch (data.event) {
      //   case 'connected':
      //     const symbolDataList = data.supportedSymbols.map((symbol: string) => {
      //       return {symbolName: symbol, subscribe: false} as SymbolData;
      //     });

      //     console.log('🎸', '='.repeat(5), `symbolDataList`, symbolDataList);
      //     setSymbolDataList(symbolDataList);
      //     break;
      //   case 'stocks-update':
      //     console.log('🎸', '='.repeat(5), `stocks-update`, data.stocks);
      //     Object.keys(data.stocks).forEach((symbol: string) => {
      //       const symbolData = data.stocks[symbol];
      //       console.log('🎸', '='.repeat(5), `+++ price updated for`, symbol, 'price', symbolData);
      //       console.log('🎸', '='.repeat(5), `symbolDataListData`, symbolDataListData);
      //       const instance = symbolDataListData?.find((xSymbol: SymbolData) => xSymbol.symbolName === symbol);
      //       if (instance) {
      //         instance.price = symbolData;
      //       }
      //     })

      //     setSymbolDataList([...symbolDataListData]);

      //     break;
      //   default:
      //     console.log('🎸', '='.repeat(5), `---- unsupported event`, data.event, 'data', data);
      //     break;
      // }
    });

    return () => {
      webSocket?.close();
    };
  }, []);

  return <Stocks />;
}

export default WebSocketClient;
