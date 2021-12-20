const jwt = require('jsonwebtoken');

const certs = {
  'bc36e546-f24a-4635-a77b-eecb20602504':
    '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA8oPMlKMnG9Uvyr8SMSLf\n5N7pl2ciEL+OWkAYngAzV1Y492cH8PWWFCibpiXU6iNlBbP/py2O6p8xfMHX1vGC\nF9uFU//iqc5RBbaCYL1kxczQbCt69tPLdyv3/6FNfMioc62Cym77rEVIa4uRLJl0\nTB/BJ89beCoL7BO6U1szGz3oVn+4igsc8GQRJOaZkZXY0JIBqB7dTHBgiq1R444e\nx/Tl1M6E9w45PxzowLOn1GWv6X5wyOSX1z+g60ErmDdxuu3N3lm2fJr9W+mjFgMv\no4V9tBQmABaWO573I82IJymxt3C6B1g9Co9P1Thk5zMxtm33Om2FrizinUZbnQAt\nqQIDAQAB\n-----END PUBLIC KEY-----\n',
  'd4601977-6244-4a01-87dd-af0c1855886a':
    '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyrIO/j+qbZfDlbLaTF+T\nQC38LVv8FVaXV4RPwNwSL/3QQA04HO1lnA8eXf2jV3RbI3WVey9jgDxjIidGAQQ0\nEJawXX7lPKWj56gDWBjPID7z+32DXicPww7vAgP8KD/GD00bwDnrnPCEveZQ9fAX\n+9zJpDNLRZlZ+GdgwOP55dIUFaOGeS1GP3jCBcy9auRzthBV4CO2Y/WzC69yL+4W\ngBPY/cIEc49vZ/Xyyo2mP36+fHzJc9eQ+moRczJ/hlCUe6DPfC99ojMFxXyd9SkD\n6BvTdnI5Bw+DPd4MCQj6KeSTuWTVfi2zsL2ooX0e8oLqmdhKqEB7T9LAr2efJkBG\nQQIDAQAB\n-----END PUBLIC KEY-----\n',
  'df9885fa-942b-40c0-988c-9c3af76694bc':
    '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx/+UkGLNQVRBXXW894io\nkDf7irGQ8rNPzsp+9N4ylVrkES93OL95E/rOdoK0Z8kCuwPOvKfc1QmgBFoJjMMa\nxI3zLDdDTl9QRIS1e1akecuAdzMj53X/t98Z2pgcT1paoDSkHh7qgYRKmt1xpU7f\nbKrogjdzqTv3vsnB3tQU2P1+9UJtH3+1BoAVhyiusFqXLH0o6Rp7drMbVYbvyj19\nnRwcBZz9gtO/bWyYGz0KUtFkm/vc31JmCARif7Tb4vc6FsmjGCgaQ9OSbJLgmYS7\nZeVLFomyLKZuDeyAbS0rfzjC6Cf5heu6F2F44MdRoq+QK88nZ19fOpcJk1CkYPty\nSQIDAQAB\n-----END PUBLIC KEY-----\n',
  '1a7f2fbe-5112-4450-b7f1-27187d6030fb':
    '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnPPHuzGJ8M9eZVr2f/CU\nrzFzyPQ0Ks9R31abO2B6qSOKQb/7aLQC7kOB02wWckyqpKhMRHTVbpKBJXYI1sga\n/iAaFfDyJ8+RVH3+hbpF1+/Bv7AteGJSZe2Etyi4kFXSZs2pDNOgUS6zvrkdQTlI\nqSst6MGJNKiaF1OpsmYlwAzJF37YAbrkuNOC1nbQorKkqQzSDa9667ZiEGoU65TG\nWP0FWwuzSBJGb8AOVNIEdIUaEdTrimoENzJOJR+RHeRGPLpU/Fe7TRj/RLyixDB6\nHp/ZyYHW3Su7N3YBu2vZnp42d29E1UMFCU6k/5uoWR6rvosxCL1FkfaoXvpQ78oD\nmQIDAQAB\n-----END PUBLIC KEY-----\n',
};

function decodeToken(token, {verify = true} = {}) {
  return new Promise((resolve, reject) => {
    const decoded = jwt.decode(token, {complete: true});
    if (!verify) {
      return decoded.payload;
    }

    const cert = certs[decoded.header.kid];
    jwt.verify(token, cert, function (err, decoded) {
      if (err) {
        reject(err);
        return;
      }
      resolve(decoded);
    });
  });
}

export {decodeToken};
