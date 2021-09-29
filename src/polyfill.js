// https://github.com/defunctzombie/node-process#browser-implementation
const process = require('process/browser');
// https://github.com/feross/buffer#usage
const Buffer = require('buffer/').Buffer;

if (typeof window !== 'undefined') {
  window.process = process;
  window.Buffer = Buffer;
} else {
  global.window = {
    navigator: {},
  };
}
