import { useEffect, useState } from 'react';
import { getFooterHeight } from '../methods/getFooterHeight.ts';

export const useMinHeight = () => {
  const [wrapperHeight, setWrapperHeight] = useState(0);
  useEffect(() => {
    setWrapperHeight(getFooterHeight() + 50);
  }, []);

  return window.innerHeight - wrapperHeight;
};
