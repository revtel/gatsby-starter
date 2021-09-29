import './AppOutlets';
import './SdkInit';
import {getOutlet} from 'reconnect.js';
import * as AppActions from './AppActions';
import * as User from 'rev.sdk.js/Actions/User';
import * as Cart from 'rev.sdk.js/Actions/Cart';
import * as JStorage from 'rev.sdk.js/Actions/JStorage';
import * as Storage from 'rev.sdk.js/Actions/Storage';

const ActionOutlet = getOutlet('actions');

ActionOutlet.update({
  ...User,
  ...Cart,
  ...JStorage,
  ...Storage,
  ...AppActions,
});

console.log('App initialized');
