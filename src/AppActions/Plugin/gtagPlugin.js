import PluginAction from '../PluginAction';

export default class gtagPlugin extends PluginAction {
  shouldExecute(...args) {
    return false;
  }

  executeSync(...args) {
    return false;
  }
}
