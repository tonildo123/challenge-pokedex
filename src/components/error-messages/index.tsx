import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import styles from './styles';

const ErrorMessage = ({ message }: { message: string }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{message}</Text>
  </View>
);


export default ErrorMessage;