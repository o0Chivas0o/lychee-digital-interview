import { CSSProperties } from 'react';

export const flex = (justify: CSSProperties['justifyContent'], alignItems: CSSProperties['alignItems']): {
  display: CSSProperties['display'],
  justifyContent: CSSProperties['justifyContent'] | undefined,
  alignItems: CSSProperties['alignItems'] | undefined
} => {
  return {
    display: 'flex',
    justifyContent: justify,
    alignItems: alignItems,
  };
};

export const px2vw = (px: number, vw = 375): string => {
  return `${(px / vw) * 100}vw`;
};
