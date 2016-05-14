// Tests for the calculator.
exports.config = {
  framework: 'jasmine2',

  specs: [
    "../test/spec/e2e/*.js"
  ],

  capabilities: {
    'browserName': 'chrome'
  },
};

if (process.env.SNAP_CI) {
  exports.config.chromeDriver = '/usr/local/bin/chromedriver';
}
