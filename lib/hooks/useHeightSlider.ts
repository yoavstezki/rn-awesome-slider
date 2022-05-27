import { useCallback, useMemo, useRef, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { normalize } from '../utils/functions';
import { Range } from '../types';
import { HEIGHT_DEFAULT_CONTENT_FACTOR } from '../constants';

type Props = {
  range: Range;
  initialValue: number;
  onValueChange?: (value: string) => void;
};

const useHeightSlider = ({ range, initialValue, onValueChange }: Props) => {
  const { height } = useWindowDimensions();
  const [value, setValue] = useState('');

  const scrollViewRef = useRef<ScrollView>(null);

  const contentRange = useMemo(() => {
    return {
      from: 0,
      to: height * HEIGHT_DEFAULT_CONTENT_FACTOR - 8,
    };
  }, [height]);

  const scrollTo = useCallback(
    (toValue: number) => {
      const normalizedValue = normalize(toValue, range, contentRange);
      scrollViewRef.current?.scrollTo({ y: normalizedValue, animated: true });
    },
    [contentRange, range],
  );

  const onContentSizeChange = useCallback(() => {
    scrollTo(initialValue);
    setValue(initialValue.toString());
  }, [initialValue, scrollTo]);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const toValue = event.nativeEvent.contentOffset.y;
      const normalizedValue = normalize(toValue, contentRange, range);
      setValue(normalizedValue.toString());
      onValueChange && onValueChange(normalizedValue.toString());
    },
    [contentRange, onValueChange, range],
  );

  return { value, setValue, scrollViewRef, onContentSizeChange, onScroll };
};

export default useHeightSlider;
