// app/add-alert/index.tsx
import React, { useState } from 'react';
import { View, Text, Button, SafeAreaView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Input, Dropdown, Typography } from '@components';
import { useAlerts } from '@hooks';
import { styles } from './AddAlertScreen.styles';
import { useWatchlistContext } from '@context';
interface SymbolItem {
  id: string;
  label: string;
}

export const AddAlertScreen = () => {
  const [symbol, setSymbol] = useState<SymbolItem>({ id: '', label: '' });
  const [showCustomSymbol, setShowCustomSymbol] = useState(false);
  const [customSymbol, setCustomSymbol] = useState('');
  const [alertPrice, setAlertPrice] = useState('');
  const [openSelect, setOpenSelect] = useState<string | null>(null);
  const handleToggle = (selectId: string) => {
    if (openSelect === selectId) {
      setOpenSelect(null);
    } else {
      setOpenSelect(selectId);
    }
  };

  const { addAlert } = useAlerts();
  const { addToWatchlist, subscribeSymbol } = useWatchlistContext();

  const router = useRouter();

  const handleAddAlert = () => {
    const finalSymbol = showCustomSymbol ? customSymbol : symbol.label;
    if (!finalSymbol || !alertPrice) {
      return;
    }

    const priceNum = Number(alertPrice);

    addAlert(finalSymbol, priceNum);
    addToWatchlist(finalSymbol, priceNum);
    subscribeSymbol(finalSymbol);

    setSymbol({ id: '', label: '' });
    setCustomSymbol('');
    setAlertPrice('');
    router.push('/watchlist');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Add a Stock/Crypto Alert</Text>
        {/*IMPORTANT: I'm hardcoding the values on the dropdown, because with the symbols endpoint I'm not receiving any stream data, just with these 2 */}
        {/*It was a known issue on github: https://github.com/finnhubio/Finnhub-API/issues/65 */}
        {/*If you desire to test another token, I left an optional input component*/}
        <Dropdown
          data={[
            { id: '1', label: 'BINANCE:BTCUSDT' },
            { id: '2', label: 'BINANCE:ETHUSDT' },
          ]}
          selectedValue={symbol}
          onSelect={val => setSymbol(val)}
          isOpen={openSelect === 'symbol'}
          onToggle={() => handleToggle('symbol')}
          label={'Symbol (e.g. BINANCE:BTCUSDT)'}
        />
        <Pressable
          style={styles.customValue}
          onPress={() => setShowCustomSymbol(!showCustomSymbol)}>
          <Typography size="sm" color="#1876F3">
            Type a custom value
          </Typography>
        </Pressable>
        {showCustomSymbol && (
          <Input
            label="Type a Symbol (e.g. BINANCE:BTCUSDT)"
            style={styles.input}
            value={customSymbol}
            onChangeText={setCustomSymbol}
          />
        )}
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
