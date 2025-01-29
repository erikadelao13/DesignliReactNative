import { StyleSheet } from 'react-native';
import { spaces } from '@designSystem';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: spaces.xs,
    borderRadius: spaces.xxs,
    marginTop: spaces.xxs,
    borderColor: 'white',
  },
  label: {
    marginBottom: spaces.xs,
  },
  dropdownContainer: {},
});
