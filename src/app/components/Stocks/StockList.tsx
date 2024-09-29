"use client";
import { StockType, useStocks } from "./useStocks";
import {StockItem} from "./StockItem";

export function StockList() {
  const {stocks} = useStocks();
  console.log('🎸', '='.repeat(5), `stocks list`, stocks);

  return <section className="stocks-list">{
    stocks.map((xSymbol: StockType, index: number) => {
      return (<StockItem key={xSymbol.symbolName + index} stockIndex={index} stockItem={xSymbol} />);
    })
  }</section>;
}

