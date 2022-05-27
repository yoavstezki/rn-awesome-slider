import { useCallback, useRef, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { normalize } from '../utils/functions';
import { Range } from '../types';

type Props = {
  range: Range;
  initialValue: number;
  onValueChange?: (value: string) => void;
};

const useWeightSlider = ({ range, initialValue, onValueChange }: Props) => {
  const { width } = useWindowDimensions();
  const [value, setValue] = useState('');

  const sliderWidthRef = useRef<number | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollTo = useCallback(
    (toValue: number) => {
      const normalizedValue = normalize(toValue, range, { from: 0, to: sliderWidthRef.current! });
      scrollViewRef.current?.scrollTo({ x: normalizedValue, animated: true });
    },
    [range],
  );

  const onContentSizeChange = useCallback(
    (contentWidth: number, _: number) => {
      sliderWidthRef.current = contentWidth - width;
      scrollTo(initialValue);
      setValue(initialValue.toString());
    },
    [initialValue, scrollTo, width],
  );

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const toValue = event.nativeEvent.contentOffset.x;
      const normalizedValue = normalize(toValue, { from: 0, to: sliderWidthRef.current! }, range);
      setValue(normalizedValue.toString());
      onValueChange && onValueChange(normalizedValue.toString());
    },
    [onValueChange, range],
  );

  return { value, setValue, scrollViewRef, onContentSizeChange, onScroll };
};

export default useWeightSlider;
