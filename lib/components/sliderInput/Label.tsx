import React, { useCallback, useMemo } from 'react';
import { StyleSheet, TextInput, useWindowDimensions } from 'react-native';
import { LabelData, Range } from '../../types';

import { getFixedValue } from '../../utils/functions';

type Style = {
  color: string;
  fontScale: number;
};

const createStyles = ({ color, fontScale }: Style) =>
  StyleSheet.create({
    input: {
      width: '20%',
      minWidth: '20%',
      borderWidth: 1,
      padding: 4 * fontScale,
      textAlign: 'center',
      borderRadius: 6 * fontScale,
      fontSize: 18 * fontScale,
      fontWeight: 'bold',
      color,
    },
  });

type Props = {
  value: string;
  range: Range;
  data: LabelData;
  setValue: (value: string) => void;
};

const Label: React.FC<Props> = ({ value, range, data, setValue }) => {
  const { fontScale } = useWindowDimensions();
  const { color, fractionDigits, placeholder } = data;
  const styles = createStyles({ color, fontScale });

  const padValue = useMemo(
    () => getFixedValue(+value, range, fractionDigits, data.placeholder),
    [data.placeholder, fractionDigits, range, value],
  );

  const onChangeText = useCallback(
    (toValue: string) => setValue(getFixedValue(+toValue, range, fractionDigits, placeholder)),
    [fractionDigits, placeholder, range, setValue],
  );

  return (
    <TextInput
      editable={false}
      style={styles.input}
      selectionColor={color}
      onChangeText={onChangeText}
      value={padValue}
      placeholderTextColor={color}
      keyboardType="numeric"
    />
  );
};

export default Label;
