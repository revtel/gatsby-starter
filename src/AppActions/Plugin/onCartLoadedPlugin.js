import PluginAction from '../PluginAction';

export default class onCartLoadedPlugin extends PluginAction {
  shouldExecute(...args) {
    return false;
  }

  executeSync(...args) {
    return null;
  }
}
