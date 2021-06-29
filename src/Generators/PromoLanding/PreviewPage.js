import React from 'react';
import {message} from 'antd';
import PromoLanding from './index.js';

function FromLocalStorage() {
  const [preview, setPreview] = React.useState(null);

  React.useEffect(() => {
    function doPeriodicTask() {
      let nextPreview;
      try {
        nextPreview = JSON.parse(window.localStorage.getItem('preview'));
      } catch (ex) {
        nextPreview = null;
      }

      if (preview && nextPreview.timestamp !== preview.timestamp) {
        message.info('Preview is updating...');
      }

      setPreview(nextPreview);
    }

    const timer = setInterval(doPeriodicTask, 1500);

    return () => {
      clearInterval(timer);
    };
  }, [preview]);

  if (!preview) {
    return (
      <div style={{padding: 20}}>
        <h2 style={{marginTop: 60, textAlign: 'center'}}>
          Waiting Preview Data...
        </h2>
      </div>
    );
  }

  return <PromoLanding key={preview.timestamp} pageContext={preview} />;
}

export default FromLocalStorage;
