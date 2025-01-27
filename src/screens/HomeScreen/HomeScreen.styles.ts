import { StyleSheet } from 'react-native';
import { colors, spaces } from '@designSystem';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.dark1,
  },
  subTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: spaces.xs,
  },
  animation: {
    width: '50%',
    height: '50%',
  },
});
