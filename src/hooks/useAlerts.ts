import { useState } from 'react';

interface AlertItem {
  symbol: string;
  alertPrice: number;
}

export function useAlerts() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  const addAlert = (symbol: string, alertPrice: number) => {
    setAlerts(prev => [...prev, { symbol, alertPrice }]);
  };

  const checkAlerts = (symbol: string, currentPrice: number) => {
    const triggered = alerts.filter(a => a.symbol === symbol && currentPrice >= a.alertPrice);
    if (triggered.length) {
      // eslint-disable-next-line no-console
      console.log('ALERT TRIGGERED for', symbol);
    }
  };

  return {
    alerts,
    addAlert,
    checkAlerts,
  };
}
