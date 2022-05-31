import React from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { createMeasureData, isAndroidAndRTL } from '../../../utils';
import Stroke from '../Stoke';
import { HEIGHT_DEFAULT_CONTAINER_DIFF, HEIGHT_DEFAULT_CONTENT_FACTOR } from '../../../constants';
import { MeasureData } from '../../../types';

type Props = {
  data: MeasureData;
};

type StyleProps = {
  height: number;
};

const createStyles = ({ height }: StyleProps) => {
  const direction = isAndroidAndRTL() ? 'left' : 'right';

  return StyleSheet.create({
    measure: {
      position: 'absolute',
      [direction]: '2%',
      height: height * HEIGHT_DEFAULT_CONTENT_FACTOR,
      minHeight: height * HEIGHT_DEFAULT_CONTENT_FACTOR,
      top: `${HEIGHT_DEFAULT_CONTAINER_DIFF * 100}%`,
    },
  });
};

const MeasureView: React.FC<Props> = ({ data }) => {
  const { height } = useWindowDimensions();
  const styles = createStyles({ height });

  return (
    <View style={styles.measure}>
      {createMeasureData(data)
        .reverse()
        .map((labelValue, index) => (
          <Stroke
            key={`index=${index}`}
            value={labelValue}
            index={index}
            sectionSize={data.sectionSize}
          />
        ))}
    </View>
  );
};

export default MeasureView;
