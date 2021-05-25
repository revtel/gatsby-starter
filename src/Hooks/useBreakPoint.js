import React from 'react';

function useScrollBreakpoint(breakpoint) {
  const [passBreakpoint, setPassBreakpoint] = React.useState(false);

  React.useEffect(() => {
    if (!breakpoint) {
      return;
    }

    function onScroll() {
      if (window.scrollY > breakpoint) {
        if (!passBreakpoint) {
          setPassBreakpoint(true);
        }
      } else {
        if (passBreakpoint) {
          setPassBreakpoint(false);
        }
      }
    }

    function cleanUp() {
      window.removeEventListener('scroll', onScroll);
    }

    window.addEventListener('scroll', onScroll);

    return cleanUp;
  }, [passBreakpoint, breakpoint]);

  return {
    passBreakpoint,
  };
}

export default useScrollBreakpoint;
