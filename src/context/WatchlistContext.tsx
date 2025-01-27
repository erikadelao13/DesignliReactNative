import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import { FINNHUB_API_KEY } from '../../environment';
import { formatPercentageChange } from '../utils/formatUtils';

export interface TradeData {
  s: string;
  p: number;
  t: number;
  v: number;
}

interface WatchlistStock {
  symbol: string;
  currentPrice: number;
  referencePrice: number;
  changePct: number;
}

interface WatchlistContextProps {
  watchlist: WatchlistStock[];
  addToWatchlist: (symbol: string, initialPrice?: number) => void;
  subscribeSymbol: (symbol: string) => void;
  unsubscribeSymbol: (symbol: string) => void;
}

const WatchlistContext = createContext<WatchlistContextProps | undefined>(undefined);

export const WatchlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const socketRef = useRef<WebSocket | null>(null);

  const [trades, setTrades] = useState<TradeData[]>([]);

  const [watchlist, setWatchlist] = useState<WatchlistStock[]>([]);

  useEffect(() => {
    if (!FINNHUB_API_KEY) {
      return;
    }

    const ws = new WebSocket(`wss://ws.finnhub.io?token=${FINNHUB_API_KEY}`);
    socketRef.current = ws;

    ws.onopen = () => {
      // eslint-disable-next-line no-console
      console.log('Finnhub WebSocket connected');
    };

    ws.onmessage = event => {
      const data = JSON.parse(event.data) as {
        type?: string;
        data?: TradeData[];
      };
      if (data.type === 'trade' && data.data) {
        const formattedData = data.data ?? [];
        setTrades(prev => [...prev, ...formattedData]);
      }
    };

    ws.onerror = error => {
      // eslint-disable-next-line no-console
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    if (trades.length === 0) {
      return;
    }

    const latestBySymbol: Record<string, TradeData> = {};
    trades.forEach(trade => {
      latestBySymbol[trade.s] = trade;
    });

    setWatchlist(prevWatchlist =>
      prevWatchlist.map(stock => {
        const t = latestBySymbol[stock.symbol];
        if (t) {
          const newPrice = t.p;
          const ref = stock.referencePrice;
          return {
            ...stock,
            currentPrice: newPrice,
            changePct: formatPercentageChange(ref, newPrice),
          };
        }
        return stock;
      }),
    );
  }, [trades]);

  const subscribeSymbol = (symbol: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: 'subscribe', symbol }));
      // eslint-disable-next-line no-console
      console.log('Subscribed to:', symbol);
    }
  };

  const unsubscribeSymbol = (symbol: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: 'unsubscribe', symbol }));
      // eslint-disable-next-line no-console
      console.log('Unsubscribed from:', symbol);
    }
  };

  const addToWatchlist = (symbol: string, initialPrice = 0) => {
    setWatchlist(prev => {
      const alreadyInList = prev.some(s => s.symbol === symbol);
      if (alreadyInList) {
        return prev;
      }
      return [
        ...prev,
        {
          symbol,
          currentPrice: initialPrice,
          referencePrice: initialPrice,
          changePct: 0,
        },
      ];
    });
  };

  const value: WatchlistContextProps = {
    watchlist,
    addToWatchlist,
    subscribeSymbol,
    unsubscribeSymbol,
  };

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
};

export const useWatchlistContext = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlistContext must be used inside WatchlistProvider');
  }
  return context;
};
