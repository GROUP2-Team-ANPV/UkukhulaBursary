const msalConfig = {
    auth: {
        clientId: '9ef87551-04fa-4364-b492-dc1264c8c762', 
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