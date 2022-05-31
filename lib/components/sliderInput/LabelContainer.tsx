import React, { FC, PropsWithChildren } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { isAndroidAndRTL } from '../../utils';

type Styles = {
  fontScale: number;
};

const createStyles = ({ fontScale }: Styles) => {
  const direction = isAndroidAndRTL() ? 'left' : 'right';

  return StyleSheet.create({
    container: {
      alignSelf: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    hintContainer: {
      width: 30,
      position: 'absolute',
      bottom: 0,
      textAlign: 'left',
      [direction]: -40,
    },
    hint: {
      fontSize: 10 * fontScale,
    },
  });
};

type Props = {
  hint: string;
};

const LabelContainer: FC<PropsWithChildren<Props>> = ({ hint, children }) => {
  const { fontScale } = useWindowDimensions();
  const styles = createStyles({ fontScale });

  return (
    <View style={styles.container}>
      {children}
      <View style={styles.hintContainer}>
        <Text numberOfLines={1} style={styles.hint}>
          {hint}
        </Text>
      </View>
    </View>
  );
};

export default LabelContainer;
