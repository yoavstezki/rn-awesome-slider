import React, { useMemo } from 'react';
import { ScrollViewProps, StyleSheet, useWindowDimensions, View } from 'react-native';
import {
  HEIGHT_DEFAULT_CONTINUER_FACTOR,
  HEIGHT_DEFAULT_SECTION_SIZE,
  HEIGHT_DEFAULT_STEP,
  HEIGHT_FRACTION_DIGITS,
  HEIGHT_INITIAL_VALUE,
  HEIGHT_MAX_VALUE,
  HEIGHT_MIN_VALUE,
} from '../constants';
import { getFixedValue, noop, normalize } from '../utils';
import { Colors } from '../constants/colors';
import VerticalSlider from '../components/slider/vertical/VerticalSlider';
import useHeightSlider from '../hooks/useHeightSlider';
import MeasureView from '../components/slider/vertical/MeasureView';
import Lottie from '../components/lottie/Lottie';
import { CursorData, DividerData, LabelData, MeasureData, Gender } from '../types';

type StyleProps = {
  height: number;
  width: number;
  lottieHeight: number;
};

const createStyles = ({ height, width, lottieHeight }: StyleProps) =>
  StyleSheet.create({
    container: {
      height: height * HEIGHT_DEFAULT_CONTINUER_FACTOR,
      minHeight: height * HEIGHT_DEFAULT_CONTINUER_FACTOR,
    },
    lottieContainer: {
      position: 'absolute',
      bottom: 0,
      height: lottieHeight,
      width: width,
      zIndex: -1,
    },
  });

type Props = {
  gender?: Gender;
  measureData?: Partial<MeasureData>;
  labelData?: Partial<LabelData>;
  cursorData?: Partial<CursorData>;
  dividerData?: Partial<DividerData>;
  onValueChange?: (value: string) => void;
  onSlidingStart?: ScrollViewProps['onMomentumScrollBegin'];
  onSlidingEnd?: ScrollViewProps['onMomentumScrollEnd'];
};

const HeightSlider: React.FC<Props> = ({
  gender = 'male',
  measureData = {},
  labelData = {},
  cursorData = {},
  dividerData = {},
  onValueChange = noop,
  onSlidingStart = noop,
  onSlidingEnd = noop,
}) => {
  const {
    range = { from: HEIGHT_MIN_VALUE, to: HEIGHT_MAX_VALUE },
    step = HEIGHT_DEFAULT_STEP,
    sectionSize = HEIGHT_DEFAULT_SECTION_SIZE,
    initialValue = HEIGHT_INITIAL_VALUE,
  } = measureData;

  const {
    hint = 'Cm',
    color = Colors.FRENCH_VIOLET,
    fractionDigits = HEIGHT_FRACTION_DIGITS,
    placeholder = range.from.toString(),
  } = labelData;

  const { color: cursorColor = Colors.FRENCH_VIOLET } = cursorData;

  const { color: dividerColor = Colors.GRAY } = dividerData;

  const { height, width } = useWindowDimensions();
  const { value, setValue, scrollViewRef, onScroll, onContentSizeChange } = useHeightSlider({
    range,
    initialValue,
    onValueChange,
  });

  const lottieHeight = useMemo(() => {
    const to = height * HEIGHT_DEFAULT_CONTINUER_FACTOR;
    const normalizeValue = normalize(+value, range, { from: 0, to: to });
    return +getFixedValue(normalizeValue, { from: range.from, to: to }, 0);
  }, [height, range, value]);

  const styles = createStyles({ height, width, lottieHeight });

  return (
    <View style={styles.container}>
      <MeasureView data={{ range, step, sectionSize, initialValue }} />

      <VerticalSlider
        ref={scrollViewRef}
        range={range}
        value={value}
        labelData={{ hint, color, fractionDigits, placeholder }}
        cursorData={{ color: cursorColor }}
        dividerData={{ color: dividerColor }}
        setValue={setValue}
        onContentSizeChange={onContentSizeChange}
        onScroll={onScroll}
        onSlidingStart={onSlidingStart}
        onSlidingEnd={onSlidingEnd}
      />

      <View style={styles.lottieContainer}>
        <Lottie gender={gender} kind={'vertical'} value={range.to.toString()} fromRange={range} />
      </View>
    </View>
  );
};

export default HeightSlider;
