const fs = require('fs');

function config() {
  const data = {};
  if (process.env.REV_ENV === 'stg') {
    data.clientId = 'yaslab';
    data.authHost = 'https://auth-stg.revtel-api.com/v4';
    data.jstoreHost = 'https://jstorage-stg.revtel-api.com/v1';
    data.uploadHost = 'https://storage-stg.revtel-api.com/v3';
    data.articleEditorHost = 'https://console.revtel2.com/article/editor';
  } else {
    data.clientId = 'yaslab';
    data.authHost = 'https://auth.revtel-api.com/v4';
    data.jstoreHost = 'https://jstorage.revtel-api.com/v1';
    data.uploadHost = 'https://storage.revtel-api.com/v3';
    data.articleEditorHost = 'https://console-prod.netlify.com/article/editor';
  }

  fs.writeFileSync('./data.json', JSON.stringify(data, null, 2), 'utf8');
  console.log('done');
}

config();
