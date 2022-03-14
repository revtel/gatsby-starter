import {useEffect} from 'react';

const useFacebookPixel = (props) => {
  const {pixelId} = props;
  useEffect(() => {
    const fbPixelScript = document.createElement('script');
    fbPixelScript.async = true;
    fbPixelScript.innerHTML = `!function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${pixelId}');
    fbq('track', 'PageView');`;

    const fbPixelNoScriptTag = document.createElement('img');
    const fbPixelImgTag = document.createElement('img');
    fbPixelImgTag.height = 1;
    fbPixelImgTag.width = 1;
    fbPixelImgTag.style.display = 'none';
    fbPixelImgTag.src = `https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`;
    fbPixelNoScriptTag.appendChild(fbPixelImgTag);

    document.head.appendChild(fbPixelScript);
    document.head.appendChild(fbPixelNoScriptTag);
  }, [pixelId]);
};

export default useFacebookPixel;
