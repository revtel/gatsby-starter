import React from 'react';

const breakpoints = {
  // mobile
  xs: 480,
  // pad
  lg: 992,
  // desktop
  xl: 1080,
  // larger desktop
};

function useDimension() {
  const [rwd, setRwd] = React.useState('mobile');
  const [dimension, setDimension] = React.useState({});
  const detectDimension = React.useCallback(() => {
    const nextDimension = {};
    if (typeof window !== undefined) {
      nextDimension.innerWidth = window.innerWidth;
      nextDimension.innerHeight = window.innerHeight;
      nextDimension.outerWidth = window.outerWidth;
      nextDimension.outerHeight = window.outerHeight;
      setDimension(nextDimension);

      if (nextDimension.innerWidth <= breakpoints.xs) {
        setRwd('mobile');
      } else if (nextDimension.innerWidth <= breakpoints.lg) {
        setRwd('pad');
      } else {
        setRwd('desktop');
      }
    }
  }, []);
  const onResize = React.useCallback(() => {
    detectDimension();
  }, [detectDimension]);

  React.useEffect(() => {
    try {
      detectDimension();
      window.addEventListener('resize', onResize);
      return () => {
        window.removeEventListener('resize', onResize);
      };
    } catch (ex) {
      // bypass
    }
  }, [onResize, detectDimension]);

  return {
    dimension,
    rwd, // return 'mobile' || 'pad' ||'desktop'
  };
}

export default useDimension;
