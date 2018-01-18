'use strict';
var window = require('@adobe/reactor-window');
var config = require('../helpers/config');

module.exports = function(settings) {
  if (config.getValue('doNotShowConsentForm') === 'true') {
    return;
  }

  require('../helpers/setupGenericFunctions');

  window.addEventListener("load", function() {
    var code = settings.code;
    var d = document.createElement('div');
    d.className = 'trackingConsentContainer';
    d.innerHTML = code;

    document.body.appendChild(d);
  });
};
