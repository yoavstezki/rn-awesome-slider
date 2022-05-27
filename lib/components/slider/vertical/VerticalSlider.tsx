import React, { forwardRef } from 'react';
import { ScrollView, ScrollViewProps, StyleSheet, useWindowDimensions, View } from 'react-native';
import LabelContainer from '../../sliderInput/LabelContainer';
import Label from '../../sliderInput/Label';
import { HEIGHT_DEFAULT_CONTENT_FACTOR } from '../../../constants';
import { CursorData, DividerData, LabelData, Range } from '../../../types';

type Props = {
  range: Range;
  value: string;
  cursorData: CursorData;
  dividerData: DividerData;
  labelData: LabelData;
  setValue: (value: string) => void;
  onContentSizeChange: ScrollViewProps['onContentSizeChange'];
  onScroll: ScrollViewProps['onScroll'];
  onSlidingStart?: ScrollViewProps['onMomentumScrollBegin'];
  onSlidingEnd?: ScrollViewProps['onMomentumScrollEnd'];
};

type Styles = {
  height: number;
  dividerColor: string;
  cursorColor: string;
};

const createStyles = ({ height, dividerColor, cursorColor }: Styles) =>
  StyleSheet.create({
    container: {
      paddingVertical: Math.round(height * HEIGHT_DEFAULT_CONTENT_FACTOR + 4),
    },
    content: {
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    },
    divider: {
      width: '70%',
      height: 1,
      backgroundColor: dividerColor,
    },
    stroke: {
      width: '10%',
      height: 3,
      backgroundColor: cursorColor,
    },
  });

const VerticalSlider = forwardRef<ScrollView, Props>(
  (
    {
      range,
      value,
      labelData,
      cursorData,
      dividerData,
      setValue,
      onContentSizeChange,
      onScroll,
      onSlidingStart,
      onSlidingEnd,
    },
    ref,
  ) => {
    const { height } = useWindowDimensions();
    const styles = createStyles({
      height,
      cursorColor: cursorData.color,
      dividerColor: dividerData.color,
    });

    return (
      <ScrollView
        ref={ref}
        onContentSizeChange={onContentSizeChange}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.container}
        onMomentumScrollBegin={onSlidingStart}
        onMomentumScrollEnd={onSlidingEnd}>
        <View style={styles.content}>
          <LabelContainer hint={labelData.hint}>
            <Label value={value} range={range} data={labelData} setValue={setValue} />
          </LabelContainer>
          <View style={styles.divider} />
          <View style={styles.stroke} />
        </View>
      </ScrollView>
    );
  },
);

export default VerticalSlider;
