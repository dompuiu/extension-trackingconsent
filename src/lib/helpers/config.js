var extensionSettigs = turbine.getExtensionSettings();
var cookies = require('@adobe/reactor-cookie');
var prefix = 'trackingConsent.';
var cookieSettings = {};
var type = extensionSettigs.type;

if (type === 'cookie') {
  cookieSettings.expires = extensionSettigs.duration;
}

var drivers = {
  cookie: {
    getValue: function(key) {
      return cookies.get(prefix + key);
    },
    setValue: function(key, value) {
      return cookies.set(prefix + key, value, cookieSettings);
    }
  },
  localStorage: {
    getValue: function(key) {
      return localStorage.getItem(prefix + key)
    },

    setValue: function(key, value) {
      return localStorage.setItem(prefix + key, value)
    }
  }
};

module.exports = {
  getValue: function(key) {
    return drivers[type].getValue(key);
  },

  setValue: function(key, value) {
    return drivers[type].setValue(key, value);
  }
};
