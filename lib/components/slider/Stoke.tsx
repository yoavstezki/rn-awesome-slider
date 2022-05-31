import React, { FC, useMemo } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { MeasureKind, Size } from '../../types';
import { Colors } from '../../constants/colors';
import { isAndroidAndRTL } from '../../utils';

const sizeToMeasurement: Record<Size, number> = {
  small: 7,
  medium: 14,
  large: 21,
};

type Props = {
  kind?: MeasureKind;
  value: number;
  index: number;
  sectionSize: number;
};

type StyleProps = {
  kind: MeasureKind;
  size: Size;
  fontScale: number;
};

const createStyles = ({ kind, size, fontScale }: StyleProps) => {
  const isVertical = kind === 'vertical';

  const androidAndRTL = isAndroidAndRTL();
  const alignSelf = androidAndRTL ? 'flex-start' : 'flex-end';
  const flexDirection = androidAndRTL ? 'row-reverse' : 'row';

  return StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
      ...(isVertical && {
        flexDirection: flexDirection,
        alignSelf: alignSelf,
        justifyContent: 'space-between',
      }),
    },
    stroke: {
      height: isVertical ? 1 : sizeToMeasurement[size],
      width: isVertical ? sizeToMeasurement[size] : 1,
      marginHorizontal: isVertical ? 0 : 3,
      backgroundColor: Colors.GRAY,
    },
    textVertical: {
      minHeight: fontScale * 18,
      textAlign: 'center',
      minWidth: '10%',
    },
    textHorizontal: {
      position: 'absolute',
      alignSelf: 'center',
      top: '60%',
      textAlign: 'center',
      minWidth: fontScale * 30,
    },
  });
};

const Stroke: FC<Props> = ({ kind = 'vertical', value, index, sectionSize }) => {
  const { fontScale } = useWindowDimensions();
  const data = useMemo(() => {
    let size: Size = 'small';
    if (index % sectionSize === 0) {
      size = 'large';
    } else if (index % (sectionSize / 2) === 0) {
      size = 'medium';
    }

    return { size, index };
  }, [index, sectionSize]);

  const styles = createStyles({ ...data, kind, fontScale });

  return (
    <View style={styles.container}>
      {data.size === 'large' && (
        <Text style={[kind === 'vertical' ? styles.textVertical : styles.textHorizontal]}>
          {value}
        </Text>
      )}
      <View style={styles.stroke} />
    </View>
  );
};

export default Stroke;
