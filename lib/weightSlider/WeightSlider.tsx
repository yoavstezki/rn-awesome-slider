import React from 'react';
import { ScrollViewProps, StyleSheet, View } from 'react-native';

import LabelContainer from '../components/sliderInput/LabelContainer';
import Lottie from '../components/lottie/Lottie';
import Label from '../components/sliderInput/Label';
import HorizontalSlider from '../components/slider/horizontal/HorizontalSlider';
import useWeightSlider from '../hooks/useWeightSlider';
import { noop } from '../utils/functions';
import {
  WEIGHT_DEFAULT_COLOR,
  WEIGHT_FRACTION_DIGITS,
  WEIGHT_INITIAL_VALUE,
  WEIGHT_MAX_VALUE,
  WEIGHT_MIN_VALUE,
} from '../constants';
import { CursorData, Gender, LabelData, MeasureData } from '../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lottieContainer: { flex: 1 },
  sliderContainer: {
    justifyContent: 'space-between',
    minHeight: 120,
    height: '15%',
  },
});

type Props = {
  gender?: Gender;
  measureData?: Partial<MeasureData>;
  labelData?: Partial<LabelData>;
  cursorData?: Partial<CursorData>;
  onValueChange?: (value: string) => void;
  onSlidingStart?: ScrollViewProps['onMomentumScrollBegin'];
  onSlidingEnd?: ScrollViewProps['onMomentumScrollEnd'];
};

const WeightSlider: React.FC<Props> = ({
  gender = 'male',
  measureData = {},
  labelData = {},
  cursorData = {},
  onValueChange = noop,
  onSlidingStart = noop,
  onSlidingEnd = noop,
}) => {
  const {
    range = { from: WEIGHT_MIN_VALUE, to: WEIGHT_MAX_VALUE },
    step = 10,
    sectionSize = 10,
    initialValue = WEIGHT_INITIAL_VALUE,
  } = measureData;

  const {
    hint = 'Cm',
    color = WEIGHT_DEFAULT_COLOR,
    fractionDigits = WEIGHT_FRACTION_DIGITS,
    placeholder = range.from.toString(),
  } = labelData;

  const { color: cursorColor = WEIGHT_DEFAULT_COLOR } = cursorData;

  const { value, setValue, scrollViewRef, onContentSizeChange, onScroll } = useWeightSlider({
    range,
    initialValue,
    onValueChange,
  });

  return (
    <View style={styles.container}>
      <Lottie
        gender={gender}
        kind={'horizontal'}
        value={value}
        fromRange={range}
        toRange={{ from: 1, to: 0 }}
      />

      <View style={styles.sliderContainer}>
        <LabelContainer hint={hint}>
          <Label
            range={range}
            value={value}
            setValue={setValue}
            data={{ color, fractionDigits, placeholder, hint }}
          />
        </LabelContainer>

        <HorizontalSlider
          ref={scrollViewRef}
          measureData={{ range, step, sectionSize, initialValue }}
          cursorData={{ color: cursorColor }}
          onContentSizeChange={onContentSizeChange}
          onScroll={onScroll}
          onSlidingStart={onSlidingStart}
          onSlidingEnd={onSlidingEnd}
        />
      </View>
    </View>
  );
};

export default WeightSlider;
