const msalConfig = {
    auth: {
        clientId: 'f1d12102-7801-491f-b544-e048608e9fa2', 
        authority: 'https://login.microsoftonline.com/common',
        navigateToLoginRequestUrl: true, 
    },
    cache: {
        cacheLocation: 'sessionStorage', 
        storeAuthStateInCookie: false, 
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case msal.LogLevel.Error:
                        console.error(message);
                        return;
                    case msal.LogLevel.Info:
                        console.info(message);
                        return;
                    case msal.LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case msal.LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            },
        },
    },
};


const loginRequest = {
  scopes: ["openid", "profile"],
};


if (typeof exports !== 'undefined') {
  module.exports = {
      msalConfig: msalConfig,
      loginRequest: loginRequest,
  };
}