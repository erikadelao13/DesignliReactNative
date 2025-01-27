import React from 'react';
import { Text, TextInputProps } from 'react-native';

/** Allowed sizes and their corresponding font sizes */
const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
};

type TypographySize = keyof typeof FONT_SIZES;

interface TypographyProps extends TextInputProps {
  size?: TypographySize;
  color?: string;
  children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({
  size = 'md', // default size to md (16)
  color = 'white', // default color black
  style,
  children,
  ...rest
}) => {
  const fontSize = FONT_SIZES[size];

  return (
    <Text style={[{ fontSize, color }, style]} {...rest}>
      {children}
    </Text>
  );
};
