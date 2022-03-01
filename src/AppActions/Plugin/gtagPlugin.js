import PluginAction from '../PluginAction';

export default class gtagPlugin extends PluginAction {
  shouldExecute(...args) {
    return true;
  }

  executeSync(...args) {
    //if you do anything in this , plz return false , this is very important!!!!
    return true;
  }
}
