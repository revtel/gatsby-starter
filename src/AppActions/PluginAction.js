// Base interface for all plugins to inherite from
class PluginAction {
  constructor(name, options = {}) {
    this.name = name;
    this.options = {...options};
  }

  init() {}

  shouldExecute(...args) {
    return false;
  }

  executeSync(...args) {
    return null;
  }

  async executeAsync(...args) {
    return null;
  }
}

export default PluginAction;
