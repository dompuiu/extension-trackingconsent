'use strict';
var config = require('../helpers/config');

module.exports = function() {
  return config.getValue('consentGiven') === 'true';
};
