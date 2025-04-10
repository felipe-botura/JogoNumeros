import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import JogoDeChute from './components/JogoDeChute';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <JogoDeChute />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
});
