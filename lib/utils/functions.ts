import { MeasureData, Range } from '../types';

export const normalize = (value: number, fromRange: Range, toRange: Range) => {
  const { from: from1, to: to1 } = fromRange;
  const { from: from2, to: to2 } = toRange;

  return ((value - from1) * (to2 - from2)) / (to1 - from1) + from2;
};

export const getFixedValue = (
  value: number,
  range: Range,
  fractionDigits: number,
  placeholder?: string,
): string => {
  const max = Math.max(range.to, range.from);
  const min = Math.min(range.to, range.from);
  const fixValue = +value.toFixed(fractionDigits);

  if (fixValue > max) {
    return max.toString();
  }

  if (fixValue <= min) {
    return placeholder || min.toString();
  }
  return fixValue.toString();
};

export const noop = () => {};

export const createMeasureData = (data: MeasureData) => {
  const length = ((data.range.to - data.range.from) / data.step) * data.sectionSize;
  return Array.from({ length: length + 1 }, (_, i) =>
    normalize(i, { from: 0, to: length }, data.range),
  );
};
