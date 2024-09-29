
// {
//   "event": "subscribe",
//   "stocks": [
//       { "symbol": "I" }
//   ]
// }
enum WebSocketEventTopics {
  subscribe = "subscribe",
  stocks = "stocks"
}
export type WebSocketEvent = {
  event: WebSocketEventTopics,
  stocks: Array<{symbol: string}>
}

export function useStocksOld(webSocketInstance: WebSocket) {
  const subscribeSymbol = (symbol: string) => {
    console.log('🎸', '='.repeat(5), `subscribe to`, symbol);
    const subscribeEvent: WebSocketEvent = {
      event: WebSocketEventTopics.subscribe,
      stocks: [{symbol}]
    }
    webSocketInstance.send(JSON.stringify(subscribeEvent));
  };

  return {subscribeSymbol};
}