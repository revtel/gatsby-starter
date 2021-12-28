import PluginAction from '../PluginAction';

export default class onAdminFormSubmitPlugin extends PluginAction {
  shouldExecute(...args) {
    return true;
  }

  async executeAsync(...args) {
    console.log(123);
    return false;
  }
}
