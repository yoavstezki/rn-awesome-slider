# React Native Awesome Sliders

## Installation

```
yarn add rn-awesome-slider

# or

npm install rn-awesome-slider
```

## Height Slider

A Height slider is a design component that enables the selection of height between custom ranges.
<br/>As a rule of thumb, the component height equals the screen height multiplied by 0.6

![preview](https://github.com/yoavstezki/rn-awesome-sliders/blob/master/preview-height.gif)

## Properties

| Property | Description | Type | 
| -------- | -------- | ---- |
| `gender` | Gender of the lottie to display <br/>Default `male`.   | [Gender](https://github.com/yoavstezki/rn-awesome-sliders/blob/master/lib/types/index.ts#L1) | No | |
| `measureData.range` | The measure range. <br/>Default `from: 40`, `to: 240`.   | [Range](https://github.com/yoavstezki/rn-awesome-sliders/blob/master/lib/types/index.ts#L9) | No | |
| `measureData.step`| The measure step. <br/>Default `10`  | number | No | |
| `measureData.sectionSize` | The number of lines in each section. <br/>Default `6` | number | No | |
| `measureData.initialValue` |Initial maximum value of the slider. <br/>Half of the `range.to`.| number | No | |
| `labelData.hint` | The hint text below the label.<br/>Default value is `Kg`. | string | No | |
| `labelData.color` | The color of the label text <br/>Default value is `#8503e3`. | [color](https://reactnative.dev/docs/colors) | No | |
| `labelData.fractionDigits` | The digits fraction to display on the text label <br/>Default value is `0`. | number | No | |
| `labelData.placeholder` | The text to display on the text label when slider on minimum value. <br/>Default value is `range.from`. | number | No | |
| `cursorData.color` | The color of the cursor<br/>Default value is `#8503e3`. | [color](https://reactnative.dev/docs/colors) | No | |
| `dividerData.color` | The color of the divider<br/>Default value is `#bababa`. | [color](https://reactnative.dev/docs/colors) | No | |
| `onSlidingStart` | Callback that is called when the user picks up the slider.<br/>The initial value is passed as an argument to the callback handler. | function | No | |
| `onSlidingEnd` | Callback that is called when the user releases the slider, regardless if the value has changed.<br/>The current value is passed as an argument to the callback handler. | function | No | |
| `onValueChange` | Callback continuously called while the user is dragging the slider. | function | No | |

## Usage

```javascript
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { WeightSlider } from 'rn-awesome-slider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 44,
    paddingBottom: Platform.OS === 'ios' ? 44 : 12,
    backgroundColor: '#ffffff',
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <WeightSlider
        measureData={{ range: { from: 40, to: 240 }, step: 20, sectionSize: 6, initialValue: 120 }}
        labelData={{ color: '#EE6000FF' }}
        cursorData={{ color: '#EE6000FF' }}
      />
    </View>
  );
}

```

## Weight Slider

A weight slider is a design component that enables the selection of weight between custom ranges.

![preview](https://github.com/yoavstezki/rn-awesome-sliders/blob/master/preview-weight.gif)

## Properties

| Property | Description | Type | 
| -------- | -------- | ---- |
| `gender` | Gender of the lottie to display <br/>Default `male`.   | [Gender](https://github.com/yoavstezki/rn-awesome-sliders/blob/master/lib/types/index.ts#L1) | No | |
| `measureData.range` | The measure range. <br/>Default `from: 0`, `to: 160`.   | [Range](https://github.com/yoavstezki/rn-awesome-sliders/blob/master/lib/types/index.ts#L9) | No | |
| `measureData.step`| The measure step. <br/>Default `10`  | number | No | |
| `measureData.sectionSize` | The number of lines in each section. <br/>Default `10` | number | No | |
| `measureData.initialValue` |Initial maximum value of the slider. <br/>Half of the `range.to`.| number | No | |
| `labelData.hint` | The hint text below the label.<br/>Default value is `Cm`. | string | No | |
| `labelData.color` | The color of the label text <br/>Default value is `#8503e3`. | [color](https://reactnative.dev/docs/colors) | No | |
| `labelData.fractionDigits` | The digits fraction to display on the text label <br/>Default value is `0`. | number | No | |
| `labelData.placeholder` | The text to display on the text label when slider on minimum value. <br/>Default value is `range.from`. | number | No | |
| `cursorData.color` | The color of the cursor<br/>Default value is `#8503e3`. | [color](https://reactnative.dev/docs/colors) | No | |
| `onSlidingStart` | Callback that is called when the user picks up the slider.<br/>The initial value is passed as an argument to the callback handler. | function | No | |
| `onSlidingEnd` | Callback that is called when the user releases the slider, regardless if the value has changed.<br/>The current value is passed as an argument to the callback handler. | function | No | |
| `onValueChange` | Callback continuously called while the user is dragging the slider. | function | No | |

## Usage

```javascript
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { HeightSlider } from 'rn-awesome-slider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 44,
    paddingBottom: Platform.OS === 'ios' ? 44 : 12,
    backgroundColor: '#ffffff',
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <HeightSlider
        gender={'female'}
        measureData={{ range: { from: 0, to: 160 }, step: 10, sectionSize: 10, initialValue: 65 }}
        labelData={{ placeholder: '00' }}
        dividerData={{ color: 'blue' }}
        cursorData={{ color: 'blue' }}
      />
    </View>
  );
}
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
