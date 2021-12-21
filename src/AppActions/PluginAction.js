// Base interface for all plugins to inherite from
class PluginAction {
  constructor(name, options = {}) {
    this.name = name;
    this.options = {...options};
    console.log(`Plugin[${name}] created`);
  }

  init() {
    console.log(`Plugin[${this.name}] initialized`);
  }

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
