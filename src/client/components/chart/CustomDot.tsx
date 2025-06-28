import React from 'react';
import type { PriceHistoryPoint } from './PriceHistoryChart.tsx';

type CustomDotProps = {
  cx?: number;
  cy?: number;
  isActive?: boolean;
  payload: {
    result?: PriceHistoryPoint['result'];
    [key: string]: unknown;
  };
};

export const CustomDot: React.FC<CustomDotProps> = (props) => {
  const { cx, cy, payload, isActive } = props;
  const color = payload.result !== undefined ? (payload.result ? '#4caf50' : '#ff0000') : '#b0bec5';

  return (
    <circle cx={cx} cy={cy} r={isActive ? 6 : 4} fill={color} stroke={color} strokeWidth={2} />
  );
};
