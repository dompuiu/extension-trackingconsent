(function() {
  window._satellite = window._satellite || {};
  window._satellite.container = {
  "rules": [
    {
      "name": "Example Rule",
      "events": [
        {
          "modulePath": "sandbox/pageTop.js",
          "settings": {}
        }
      ],
      "conditions": [
        {
          "modulePath": "tracking-consent/src/lib/conditions/consentGiven.js",
          "settings": {}
        }
      ],
      "actions": [
        {
          "modulePath": "tracking-consent/src/lib/actions/showConsentForm.js",
          "settings": {
            "code": "<style>.trackingConsentInnerContainer { width: 100%; padding: 1rem; position: absolute; bottom: 0; background-color: rgba(192, 192, 192, 0.3); text-align: center; }</style><div class=\"trackingConsentInnerContainer\">By using this site, you agree to the Privacy Policy and Terms of Service. <button onClick=\"trackingConsentGiven()\">Accept</button>&nbsp;<button onClick=\"trackingConsentDeclined()\">Decline</button></div>"
          }
        }
      ]
    }
  ],
  "dataElements": {},
  "extensions": {
    "tracking-consent": {
      "displayName": "Example Extension",
      "settings": {
        "type": "cookie",
        "name": "myname",
        "duration": 60
      },
      "hostedLibFilesBaseUrl": "/hostedLibFiles/tracking-consent/1.0.0/",
      "modules": {
        "tracking-consent/src/lib/helpers/config.js": {
          "script": function(module, exports, require, turbine) {
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

}

        },
        "tracking-consent/src/lib/conditions/consentGiven.js": {
          "script": function(module, exports, require, turbine) {
'use strict';
var config = require('../helpers/config');

module.exports = function() {
  return config.getValue('consentGiven') === 'true';
};

}
,
          "name": "consent-given",
          "displayName": "Consent given"
        },
        "tracking-consent/src/lib/helpers/setupGenericFunctions.js": {
          "script": function(module, exports, require, turbine) {
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


}

        },
        "tracking-consent/src/lib/actions/showConsentForm.js": {
          "script": function(module, exports, require, turbine) {
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

}
,
          "name": "show-consent-form",
          "displayName": "Show consent form"
        }
      }
    },
    "sandbox": {
      "displayName": "Extension Sandbox",
      "modules": {
        "sandbox/click.js": {
          "displayName": "Click",
          "name": "click",
          "script": function (module) {
            module.exports = function(settings, trigger) {
              document.addEventListener('click', function(event) {
                trigger({
                  nativeEvent: event
                });
              });
            };
          }
        },
        "sandbox/pageTop.js": {
          "displayName": "Page Top",
          "name": "page-top",
          "script": function (module) {
            module.exports = function(settings, trigger) {
              trigger();
            };
          }
        },
        "sandbox/localStorage.js": {
          "script": function (module) {
            module.exports = function(settings) {
              // When local storage is disabled on Safari, the mere act of referencing
              // window.localStorage throws an error. For this reason, referencing
              // window.localStorage without being inside a try-catch should be avoided.
              try {
                return window.localStorage.getItem(settings.name);
              } catch (e) {
                return null;
              }
            };
          }
        }
      }
    }
  },
  "property": {
    "name": "Sandbox property",
    "settings": {
      "domains": [
        "adobe.com",
        "example.com"
      ],
      "linkDelay": 100,
      "trackingCookieName": "sat_track",
      "undefinedVarsReturnEmpty": false
    }
  },
  "buildInfo": {
    "turbineVersion": "14.0.0",
    "turbineBuildDate": "2016-07-01T18:10:34Z",
    "buildDate": "2016-08-01T12:10:33Z",
    "environment": "development"
  }
}
})();