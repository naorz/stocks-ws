"use client";
import { useCallback, useMemo} from "react";
import { StockPriceStatus, StockType, useStocks } from "./useStocks";

type StockItemProps = {
  stockItem: StockType;
  stockIndex: number;
}

const priceStatusMapper = {
  [StockPriceStatus.up]: '🟢',
  [StockPriceStatus.down]: '🔻',
  [StockPriceStatus.none]: '🟰'
}

const parseFloatPrice = (price: number|undefined) => typeof price !== 'undefined' ? parseFloat(String(price)).toFixed(2) : '';

export function StockItem({stockItem, stockIndex}: StockItemProps) {
  const subscribeSymbol = useStocks(state => state.subscribeSymbol);
  
  const subscribeClick = useCallback((symbolName: string) => {
    subscribeSymbol(symbolName, stockIndex);
  }, [subscribeSymbol]);

  const className = useMemo(() => {
    return [
      'symbol',
      stockItem.subscribe ? 'subscribe' : ''
    ].join(' ');
   }, [stockItem.subscribe]);

   const price = useMemo(() => {
    const {priceMsg, prevPrice, currentPrice, priceStatus} = stockItem;
    if (priceMsg) return priceMsg;
    return (<>
        <div>{parseFloatPrice(prevPrice)}</div>
        <div>{parseFloatPrice(currentPrice)}</div>
        <div>{priceStatus ? priceStatusMapper[priceStatus] : 'N/A'}</div>
    </>)
   }, [stockItem.currentPrice, stockItem.priceMsg, stockItem.priceStatus]);

  return (
    <div className={className}>
      <div className="name"><span>Symbol:</span><span>{stockItem.symbolName}</span></div>
      <span className="is-subscribe">{stockItem.subscribe ? 'subscribed' : 'not subscribe'}</span>
      <span className={'price ' + stockItem.priceStatus || ''}>{price}</span>
      <div className="subscribe-btn">
        <button onClick={() => subscribeClick(stockItem.symbolName)} disabled={stockItem.subscribe}>{
          stockItem.subscribe ? 'subscribed' : 'subscribe'
        }</button>
      </div>
    </div>
  );
}

