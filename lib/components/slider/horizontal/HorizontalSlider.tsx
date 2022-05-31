import React, { forwardRef } from 'react';
import { ScrollView, ScrollViewProps, StyleSheet, useWindowDimensions, View } from 'react-native';
import Stroke from '../Stoke';
import { createMeasureData, isAndroidAndRTL } from '../../../utils';
import { CursorData, MeasureData } from '../../../types';

type Props = {
  measureData: MeasureData;
  cursorData: CursorData;
  onContentSizeChange: ScrollViewProps['onContentSizeChange'];
  onScroll: ScrollViewProps['onScroll'];
  onSlidingStart: ScrollViewProps['onMomentumScrollBegin'];
  onSlidingEnd: ScrollViewProps['onMomentumScrollEnd'];
};

type Styles = {
  cursorColor: string;
  width: number;
  fontScale: number;
};

const createStyles = ({ cursorColor, width, fontScale }: Styles) => {
  return StyleSheet.create({
    contentContainer: {
      paddingHorizontal: width / 2 - 3.5,
      ...(isAndroidAndRTL() && { flexDirection: 'row-reverse' }),
    },
    scrollView: {
      flexDirection: 'row',
      minHeight: 50,
    },
    cursor: {
      position: 'absolute',
      alignSelf: 'center',
      bottom: '30%',
      height: '110%',
      width: 3 * fontScale,
      backgroundColor: cursorColor,
    },
  });
};

const HorizontalSlider = forwardRef<ScrollView, Props>(
  (
    { measureData, cursorData, onContentSizeChange, onScroll, onSlidingStart, onSlidingEnd },
    ref,
  ) => {
    const { width, fontScale } = useWindowDimensions();
    const styles = createStyles({ cursorColor: cursorData.color, width, fontScale });

    return (
      <View>
        <View style={styles.cursor} />

        <ScrollView
          ref={ref}
          contentContainerStyle={styles.contentContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
          scrollEventThrottle={16}
          onContentSizeChange={onContentSizeChange}
          onScroll={onScroll}
          onMomentumScrollBegin={onSlidingStart}
          onMomentumScrollEnd={onSlidingEnd}>
          {createMeasureData(measureData).map((labelValue, index) => (
            <Stroke
              key={`index-${index}`}
              kind={'horizontal'}
              value={labelValue}
              index={index}
              sectionSize={measureData.sectionSize}
            />
          ))}
        </ScrollView>
      </View>
    );
  },
);

export default HorizontalSlider;
