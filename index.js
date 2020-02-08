let Service;
let Characteristic;
let HomebridgeAPI;
const { exec } = require('child_process');
const { storage } = require('node-persist');

class ShellSwitch {
  constructor(log, config) {
    this.log = log;

    // Setup Configuration
    this.setupConfig(config);

    // Persistent Storage
    this.cacheDirectory = HomebridgeAPI.user.persistPath();
    storage.initSync({ dir: this.cacheDirectory, forgiveParseErrors: true });

    // Setup Services
    this.createSwitchService();
    this.createAccessoryInformationService();
  }

  setupConfig(config) {
    this.name = config.name;
    this.onCmd = config.onCmd;
    this.offCmd = config.offCmd;
  }

  createSwitchService() {
    this.switchService = new Service.Switch(this.name);

    this.switchService.getCharacteristic(Characteristic.On).on('set', this.toggleSwitch.bind(this));

    const cachedState = storage.getItemSync(this.name);
    if (cachedState === undefined || cachedState === false) {
      this.switchService.setCharacteristic(Characteristic.On, false);
    } else {
      this.switchService.setCharacteristic(Characteristic.On, true);
    }
  }

  createAccessoryInformationService() {
    this.accessoryInformationService = new Service.AccessoryInformation()
      .setCharacteristic(Characteristic.Name, this.name)
      .setCharacteristic(Characteristic.Manufacturer, 'Shell Command Switch')
      .setCharacteristic(Characteristic.Model, 'Shell Command Switch');
  }

  getServices() {
    return [this.accessoryInformationService, this.switchService];
  }

  toggleSwitch(on, callback) {
    this.log(`Setting switch to ${on}`);
    storage.setItemSync(this.name, on);

    if (on) {
      if (this.onCmd !== undefined) {
        this.log(`Executing ON command: '${this.onCmd}'`);
        exec(this.onCmd);
      }
    } else if (this.offCmd !== undefined) {
      this.log(`Executing OFF command: '${this.offCmd}'`);
      exec(this.offCmd);
    }

    callback();
  }
}

module.exports = (homebridge) => {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  HomebridgeAPI = homebridge;
  homebridge.registerAccessory('homebridge-shell-switch', 'ShellSwitch', ShellSwitch);
};
