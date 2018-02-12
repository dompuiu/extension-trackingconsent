window.extensionDescriptor = {"displayName":"Tracking Consent","name":"tracking-consent","version":"1.0.0","description":"Provides actions and conditions to send manage visitor tracking consent.","iconPath":"resources/icons/ec-privacy.svg","author":{"name":"Adobe"},"viewBasePath":"src/view/","configuration":{"viewPath":"configuration/configuration.html","schema":{"$schema":"http://json-schema.org/draft-04/schema#","type":"object","properties":{}}},"conditions":[{"displayName":"Consent given","name":"consent-given","libPath":"src/lib/conditions/consentGiven.js","schema":{"$schema":"http://json-schema.org/draft-04/schema#","type":"object","properties":{"oneOf":[{"type":"object","properties":{"type":{"type":"string","enum":["cookie"]},"name":{"type":"string","minLength":1},"duration":{"type":"string","minLength":1}},"additionalProperties":false,"required":["type","name","duration"]},{"type":"object","properties":{"type":{"type":"string","enum":["localStorage"]},"name":{"type":"string","minLength":1}},"additionalProperties":false,"required":["type","name"]}]}}}],"actions":[{"displayName":"Show consent form","name":"show-consent-form","libPath":"src/lib/actions/showConsentForm.js","schema":{"$schema":"http://json-schema.org/draft-04/schema#","type":"object","properties":{"code":{"type":"string","minLength":1}},"additionalProperties":false,"required":["code"]},"viewPath":"actions/showConsentForm.html"}]};