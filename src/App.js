import './AppOutlets';
import './SdkInit';
import {getOutlet} from 'reconnect.js';
import * as AppActions from './AppActions';

const ActionOutlet = getOutlet('actions');

ActionOutlet.update({
  ...AppActions,
});

console.log('App initialized');
