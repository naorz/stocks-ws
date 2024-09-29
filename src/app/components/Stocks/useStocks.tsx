"use client";
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export enum StockPriceStatus {
  up = 'up',
  down = 'down',
  none = 'none',
}

export enum StockPriceMessage {
  fetching = 'fetching...',
  subscribe = 'subscribe for price'
}

export type StockType = {
  symbolName: string
  prevPrice?: number
  currentPrice?: number
  priceMsg?: StockPriceMessage
  priceStatus?: StockPriceStatus
  subscribe: boolean
}

export interface StocksState {
  webSocket: WebSocket | null
  setWebSocket: (ws: WebSocket) => void
  stocks: Array<StockType>
  subscribeSymbol: (symbol: string, symbolIndex: number) => void
  onMessage: (wsEvent: MessageEvent) => void
}

export enum WebSocketEventTopics {
  connected = "connected",
  subscribe = "subscribe",
  stocksUpdate = "stocks-update"
}

export type WebSocketEvent = {
  event: WebSocketEventTopics,
  stocks: Array<{symbol: string} | {[key: string]: number}>
}

// example: {event: "stocks-update", stocks: {IMD: 435.37}}


export const useStocks = create<StocksState>()(
  devtools(
    persist(
      (set) => ({
        stocks: [],
        webSocket: null,
        setWebSocket: (webSocket) => set(() => ({ webSocket })),
        subscribeSymbol: (symbolName: string, symbolIndex: number) => set((state) => {
          const stock = state.stocks.find((stock: StockType, index) => stock.symbolName === symbolName && symbolIndex === index);
          if (!stock || !state.webSocket) return state;

          stock.subscribe = true;
          stock.priceMsg = StockPriceMessage.fetching;
          stock.priceStatus = StockPriceStatus.none;

          const subscribeEvent: WebSocketEvent = {
            event: WebSocketEventTopics.subscribe,
            stocks: [{symbol: symbolName}]
          }
          state.webSocket.send(JSON.stringify(subscribeEvent));
          return { stocks: [...state.stocks] };
        }),

        /**
         * @name onMessage
         * @description Handle incoming messages from the websocket
         */
        onMessage: (wsEvent: MessageEvent) => set((state) => {
          const stockEventData = JSON.parse(wsEvent.data);
          console.log('🎸', '='.repeat(5), `incoming message`, stockEventData);

          switch (stockEventData.event) {
            // on connected - set supported symbols
            case WebSocketEventTopics.connected:
              // remove dup symbols
              // const stockList = stockEventData.supportedSymbols
              // TODO: check ts error
              const stockList = [...new Set(stockEventData.supportedSymbols)]
                .map<string[]>((symbolName: string) => {
                  return { symbolName, subscribe: false, priceMsg: StockPriceMessage.subscribe }
                })
              return { stocks: stockList }

            // on symbol updated
            case WebSocketEventTopics.stocksUpdate:
              console.log('🎸', '='.repeat(5), `stock update`, stockEventData);
            state.stocks.forEach((xStock: StockType) => {
              if (!xStock.subscribe) return;
              const price = stockEventData.stocks[xStock.symbolName];
              if (typeof price !== 'number') return;
              xStock.prevPrice = xStock.currentPrice;
              xStock.currentPrice = price;
              if (typeof xStock.prevPrice === 'undefined') {
                delete xStock.priceMsg;
                xStock.priceStatus = StockPriceStatus.none;
              } else {
                xStock.priceStatus = xStock.prevPrice === price ? StockPriceStatus.none : (xStock.prevPrice < price ? StockPriceStatus.up : StockPriceStatus.down)
              }
            })
            return { stocks: [...state.stocks] }

            // Default case
            default:
              console.log('🛑', '='.repeat(5), `unsupported event stockEventData.event`, stockEventData.event)
              return state;
          }
        }),
      }),
      {
        name: 'stocks-storage',
      },
    ),
  ),
)