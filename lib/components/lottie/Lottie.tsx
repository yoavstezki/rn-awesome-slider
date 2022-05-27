import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

import { getFixedValue, normalize } from '../../utils/functions';
import { Gender, MeasureKind, Range } from '../../types';

const BASE_LOTTIE_URL = '../../assets/lotteries';

const genderToSource: Record<Gender, Record<MeasureKind, any>> = {
  male: {
    horizontal: require(`${BASE_LOTTIE_URL}/male_weight.json`),
    vertical: require(`${BASE_LOTTIE_URL}/male_height.json`),
  },
  female: {
    horizontal: require(`${BASE_LOTTIE_URL}/female_weight.json`),
    vertical: require(`${BASE_LOTTIE_URL}/female_height.json`),
  },
};

type Props = {
  gender: Gender;
  kind: MeasureKind;
  value: string;
  fromRange: Range;
  toRange?: Range;
};

const styles = StyleSheet.create({
  lottieContainer: { flex: 1 },
});

const Lottie: React.FC<Props> = ({
  gender,
  kind,
  value,
  fromRange,
  toRange = { from: 0, to: 1 },
}) => {
  const progress = useMemo(() => {
    const normalizedValue = normalize(+value, fromRange, toRange);
    return +getFixedValue(normalizedValue, toRange, 10, '0');
  }, [fromRange, toRange, value]);

  const source = useMemo(() => genderToSource[gender][kind], [gender, kind]);

  return (
    <View style={styles.lottieContainer}>
      <LottieView source={source} progress={progress} />
    </View>
  );
};

export default Lottie;
