import PluginAction from '../PluginAction';

export default class onAfterAdminFormSubmitPlugin extends PluginAction {
  shouldExecute(...args) {
    return false;
  }

  async executeAsync(...args) {
    return false;
  }
}
