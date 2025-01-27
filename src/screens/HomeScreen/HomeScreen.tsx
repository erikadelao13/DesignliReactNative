import { View } from 'react-native';
import { Typography } from '@components';
import LottieView from 'lottie-react-native';
import { Link } from 'expo-router';
import { styles } from './HomeScreen.styles';
import React from 'react';

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Typography size="xl">Welcome to the Stock App!</Typography>
      <LottieView
        source={require('../../../assets/images/StockAnimation.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      <Link style={styles.subTitle} href="./watchlist">
        Go to Watchlist
      </Link>
      <Link style={styles.subTitle} href="./add-alert">
        Add a New Alert
      </Link>
      <Link style={styles.subTitle} href="./chart">
        View Chart
      </Link>
    </View>
  );
};
