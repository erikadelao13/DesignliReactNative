import { StyleSheet } from 'react-native';
import { colors, spaces } from '@designSystem';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.dark1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: spaces.xs,
    marginVertical: spaces.xs,
  },
  customValue: {
    marginTop: spaces.xs,
    marginBottom: 10,
  },
});
