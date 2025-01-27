// app/watchlist/index.tsx
import React, { useEffect } from 'react';
import { View, FlatList, SafeAreaView, Pressable } from 'react-native';
import { styles } from './WatchlistScreen.styles';
import { useRouter } from 'expo-router';
import { StockCard, Typography } from '@components';
import { useWatchlistContext } from '@context';
import { useAlerts } from '@hooks';

export const WatchlistScreen = () => {
  const router = useRouter();
  const { watchlist, subscribeSymbol, unsubscribeSymbol } = useWatchlistContext();
  const { checkAlerts } = useAlerts();

  useEffect(() => {
    watchlist.forEach(stock => {
      subscribeSymbol(stock.symbol);
    });
    return () => {
      watchlist.forEach(stock => {
        unsubscribeSymbol(stock.symbol);
      });
    };
  }, [watchlist]);

  useEffect(() => {
    watchlist.forEach(stock => {
      checkAlerts(stock.symbol, stock.currentPrice);
    });
  }, [watchlist]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {!watchlist.length ? (
          <Typography size="xl">
            No alerts found! to add some go to{' '}
            <Pressable onPress={() => router.replace('/add-alert')}>
              <Typography size="xl">Add a New Alert</Typography>
            </Pressable>
          </Typography>
        ) : (
          <FlatList
            data={watchlist}
            keyExtractor={item => item.symbol}
            renderItem={({ item }) => (
              <StockCard
                symbol={item.symbol}
                price={item.currentPrice}
                percentage={item.changePct}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
