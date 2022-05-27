import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { HeightSlider, WeightSlider } from 'rn-awesome-slider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 44,
    paddingBottom: Platform.OS === 'ios' ? 44 : 12,
    backgroundColor: '#ffffff',
  },
  contentContainerStyle: {},
});

export default function App() {
  return (
    <View style={styles.container}>
      {/*<WeightSlider*/}
      {/*  measureData={{ range: { from: 40, to: 240 }, step: 20, sectionSize: 6, initialValue: 120 }}*/}
      {/*  labelData={{ color: '#EE6000FF' }}*/}
      {/*  cursorData={{ color: '#EE6000FF' }}*/}
      {/*/>*/}
      <HeightSlider
        gender={'female'}
        measureData={{ range: { from: 0, to: 160 }, step: 10, sectionSize: 10, initialValue: 65 }}
        labelData={{ placeholder: '00' }}
        dividerData={{ color: 'blue' }}
        cursorData={{ color: 'blue' }}
      />
    </View>
  );
}
