export type Gender = 'male' | 'female';
export type MeasureKind = 'vertical' | 'horizontal';
export type Size = 'small' | 'medium' | 'large';

export interface Colorize {
  color: string;
}

export type Range = {
  from: number;
  to: number;
};

export interface LabelData extends Colorize {
  hint: string;
  fractionDigits: number;
  placeholder: string;
}

export interface CursorData extends Colorize {}

export interface DividerData extends Colorize {}

export type MeasureData = {
  range: Range;
  step: number;
  sectionSize: number;
  initialValue: number;
};
