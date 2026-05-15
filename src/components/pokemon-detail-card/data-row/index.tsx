import React from 'react';
import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import  styles  from './styles';

type DataRowProps = {
  label: string;
  value: string | number;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
};

const DataRow = ({ label, value, style, labelStyle, valueStyle }: DataRowProps) => (
  <View style={[styles.dataRow, style]}>
    <Text style={[styles.dataLabel, labelStyle]}>{label}</Text>
    <Text style={[styles.dataValue, valueStyle]}>{value}</Text>
  </View>
);

export default DataRow;