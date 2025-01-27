// app/add-alert/index.tsx
import React, { useState } from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Input } from '@components';
import { useAlerts } from '@hooks';
import { styles } from './AddAlertScreen.styles';
import { useWatchlistContext } from '@context';

export const AddAlertScreen = () => {
  const [symbol, setSymbol] = useState('');
  const [alertPrice, setAlertPrice] = useState('');

  const { addAlert } = useAlerts();
  const { addToWatchlist, subscribeSymbol } = useWatchlistContext();

  const router = useRouter();

  const handleAddAlert = () => {
    if (!symbol || !alertPrice) {
      return;
    }
    const priceNum = Number(alertPrice);

    // 1) Add an alert
    addAlert(symbol, priceNum);

    // 2) Add to watchlist so we can display it
    addToWatchlist(symbol, priceNum);

    // 3) Subscribe to the symbol in the socket
    subscribeSymbol(symbol);

    // 4) Optional: clear & navigate
    setSymbol('');
    setAlertPrice('');
    router.push('/watchlist');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Add a Stock/Crypto Alert</Text>
        <Input
          label="Symbol (e.g. BINANCE:BTCUSDT)"
          style={styles.input}
          value={symbol}
          onChangeText={setSymbol}
        />
        <Input
          label="Alert Price:"
          style={styles.input}
          value={alertPrice}
          onChangeText={setAlertPrice}
          keyboardType="numeric"
        />
        <Button title="Add Alert" onPress={handleAddAlert} />
      </View>
    </SafeAreaView>
  );
};
