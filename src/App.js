import './AppOutlets';
import {getOutlet} from 'reconnect.js';
import * as AppActions from './AppActions';
import * as UserActions from './Actions/User';
import * as JStorageActions from './Actions/JStorage';

const ActionOutlet = getOutlet('actions');

ActionOutlet.update({
  ...UserActions,
  ...JStorageActions,
  ...AppActions,
});

console.log('App initialized');
