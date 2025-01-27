import React from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import { styles } from './Input.styles';
import { Typography } from '../Typography';

interface InputProps extends TextInputProps {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, style, ...textInputProps }) => {
  return (
    <View style={styles.container}>
      <Typography size="sm" color={'white'} style={styles.label}>
        {label}
      </Typography>
      <TextInput style={[styles.input, style]} {...textInputProps} />
    </View>
  );
};
