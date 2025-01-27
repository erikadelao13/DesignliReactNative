// src/components/StockCard/StockCard.tsx
import React from 'react';
import { styles } from './StockCard.styles';
import { Typography } from '../Typography';
import { colors } from '@designSystem';
import { View } from 'react-native';

interface StockCardProps {
  symbol: string;
  price: number;
  percentage: number;
}

export const StockCard = ({ symbol, price, percentage }: StockCardProps) => {
  return (
    <View style={styles.card}>
      <Typography size="md" style={styles.symbol}>
        {symbol}
      </Typography>
      <Typography size="sm" style={styles.price}>
        ${price.toFixed(2)}
      </Typography>
      <Typography size="sm" style={{ color: percentage >= 0 ? colors.green1 : colors.red1 }}>
        {percentage.toFixed(2)}%
      </Typography>
    </View>
  );
};
