var window = require('@adobe/reactor-window');
var config = require('./config');
var hide = function() {
  var d = document.getElementsByClassName('trackingConsentContainer')[0];
  d.parentNode.removeChild(d);
};

window.trackingConsentGiven = function() {
  config.setValue('consentGiven', 'true');
  config.setValue('doNotShowConsentForm', 'true');
  hide();
};

window.trackingConsentDeclined = function() {
  config.setValue('doNotShowConsentForm', 'true');
  hide();
};

