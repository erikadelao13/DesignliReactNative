import { View, Dimensions, Pressable } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useRouter } from 'expo-router';
import { Typography } from '@components';
import { styles } from './ChartScreen.styles';
import { useWatchlistContext } from '@context';
import React from 'react';

export const ChartScreen = () => {
  const router = useRouter();
  const { watchlist } = useWatchlistContext();

  const labels = watchlist.map(stock => stock.symbol);
  const prices = watchlist.map(stock => stock.currentPrice);
  return (
    <View style={styles.container}>
      {!watchlist.length ? (
        <Typography size="xl">
          No alerts found! to add some go to{' '}
          <Pressable onPress={() => router.replace('/add-alert')}>
            <Typography size="xl">Add a New Alert</Typography>
          </Pressable>
        </Typography>
      ) : (
        <>
          <LineChart
            data={{
              labels,
              datasets: [{ data: prices }],
            }}
            width={Dimensions.get('window').width - 32}
            height={250}
            chartConfig={{
              backgroundGradientFrom: 'white',
              backgroundGradientTo: 'white',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
          />
        </>
      )}
    </View>
  );
};
