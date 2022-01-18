import PluginAction from '../PluginAction';

export default class Plugin extends PluginAction {
  shouldExecute(...args) {
    return false;
  }

  async executeAsync(...args) {
    return false;
  }
}
