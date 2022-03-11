import React from 'react';
import Spinner from 'rev.sdk.js/Components/Spinner';
import LoadingGif from '../../../static/loading.gif';

function GlobalSpinner() {
  return (
    <Spinner
      imageUrl={LoadingGif}
      spinnerStyle={{animation: 'unset', width: 150, height: 150}}
      style={{backgroundColor: 'transparent'}}
    />
  );
}

export default GlobalSpinner;
