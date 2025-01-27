import { StyleSheet } from 'react-native';
import { colors, spaces } from '@designSystem';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.dark4,
    marginBottom: spaces.xs,
    padding: spaces.sm,
    borderRadius: 6,
    elevation: 2,
  },
  symbol: {
    fontWeight: 'bold',
    marginBottom: spaces.xs,
    color: 'white',
  },
  price: {
    color: 'white',
    marginBottom: spaces.xs,
  },
  percentage: {
    fontSize: 12,
  },
});
