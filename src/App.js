import './AppOutlets/index';
import './AppOutlets/custom';
import './SdkInit';
import {getOutlet} from 'reconnect.js';
import * as AppActions from './AppActions/index';
import * as CustomActions from './AppActions/custom';

const ActionOutlet = getOutlet('actions');

ActionOutlet.update({
  ...AppActions,
  ...CustomActions,
});

console.log('App initialized');
