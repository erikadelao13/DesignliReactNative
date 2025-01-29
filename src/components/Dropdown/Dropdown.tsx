import React, { useState, useRef } from 'react';
import {
  StyleProp,
  FlatList,
  ViewProps,
  View,
  StyleSheet,
  Platform,
  Pressable,
} from 'react-native';
import { Typography } from '../Typography';
import { Portal } from '@gorhom/portal';
import { styles } from './Dropdown.styles';
interface ISelectComponent<T> {
  label: string;
  data: Array<T>;
  onSelect: (value: T) => void;
  selectedValue?: T;
  isOpen: boolean;
  onToggle: () => void;
}

export interface SelectedItem {
  id?: string | number;
  label: string;
}

export const Dropdown = <T extends { id?: string | number; label: string; value?: string }>({
  label,
  data,
  onSelect,
  selectedValue,
  isOpen,
  onToggle,
}: ISelectComponent<T>) => {
  const [layout, setLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const anchorRef = useRef<View>(null);

  const handleOpen = () => {
    if (anchorRef.current) {
      anchorRef.current.measureInWindow((x, y, width, height) => {
        setLayout({ x, y, width, height });
        onToggle();
      });
    } else {
      onToggle();
    }
  };

  const absolutePosition: StyleProp<ViewProps> = {
    position: 'absolute',
    zIndex: 9999,
    elevation: 9999,
    top: layout.y + layout.height,
    left: layout.x,
    width: layout.width,
  } as ViewProps;

  const handleSelect = (item: T) => {
    onSelect(item);
    onToggle();
  };

  return (
    <View>
      <Typography style={styles.label} size="sm" color={'white'}>
        {label}
      </Typography>
      <Pressable onPress={handleOpen} ref={anchorRef} style={styles.pressable}>
        <Typography style={styles.label} size="sm" color={'white'}>
          {selectedValue?.label ? selectedValue.label : 'Select'}
        </Typography>
      </Pressable>
      {isOpen && (
        <Portal>
          <Pressable style={StyleSheet.absoluteFillObject} onPress={() => onToggle()} />
          <View
            style={{
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: 8,
              backgroundColor: 'white',
              maxHeight: Platform.OS === 'android' ? 200 : 300,
              ...absolutePosition,
            }}>
            <FlatList
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled
              data={data}
              keyExtractor={item => item.label}
              renderItem={({ item }) => (
                <Pressable onPress={() => handleSelect(item)} style={{ paddingVertical: 10 }}>
                  <Typography size="sm" color={'black'}>
                    {item.label}
                  </Typography>
                </Pressable>
              )}
            />
          </View>
        </Portal>
      )}
    </View>
  );
};
