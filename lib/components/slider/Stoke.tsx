import React, { FC, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MeasureKind, Size } from '../../types';
import { Colors } from '../../constants/colors';

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
};

const createStyles = ({ kind, size }: StyleProps) => {
  const isVertical = kind === 'vertical';
  return StyleSheet.create({
    container: {
      flex: 1,
      ...(isVertical && {
        alignSelf: 'flex-end',
        justifyContent: 'space-between',
      }),
    },
    stroke: {
      height: isVertical ? 1 : sizeToMeasurement[size],
      width: isVertical ? sizeToMeasurement[size] : 1,
      marginHorizontal: isVertical ? 0 : 3,
      backgroundColor: Colors.GRAY,
    },
    label: {
      position: 'absolute',
      flex: 1,
      alignSelf: 'center',
      top: isVertical ? '-80%' : '60%',
      ...(isVertical && { right: '140%' }),
    },
    text: {
      textAlign: 'center',
      minWidth: 30,
    },
  });
};

const Stroke: FC<Props> = ({ kind = 'vertical', value, index, sectionSize }) => {
  const data = useMemo(() => {
    let size: Size = 'small';
    if (index % sectionSize === 0) {
      size = 'large';
    } else if (index % (sectionSize / 2) === 0) {
      size = 'medium';
    }

    return { size, index };
  }, [index, sectionSize]);

  const styles = createStyles({ ...data, kind });

  return (
    <View style={styles.container}>
      <View style={styles.stroke} />
      <View style={styles.label}>
        {data.size === 'large' && <Text style={styles.text}>{value}</Text>}
      </View>
    </View>
  );
};

export default Stroke;
