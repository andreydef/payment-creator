const axios = require("axios")
const querystring = require("qs")
const keys = require("../config/keys")

const redirectUri = 'auth/google'

function getGoogleAuthURL() {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
    const options = {
        redirect_uri: `${keys.SERVER_ROOT_URI}/${redirectUri}`,
        client_id: keys.googleClientID,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email"
        ].join(" ")
    }

    return `${rootUrl}?${querystring.stringify(options)}`
}

function getTokens({ code, clientId, clientSecret, redirectUri }) {
    const url = "https://oauth2.googleapis.com/token";
    const values = {
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
    };

    return axios
      .post(url, querystring.stringify(values), {
         headers: {
           "Content-Type": "application/x-www-form-urlencoded",
         },
      }).then((res) => res.data)
      .catch((error) => {
         console.error(`Failed to fetch auth tokens`);
         throw new Error(error.message);
      });
}

module.exports = {
    getGoogleAuthURL,
    getTokens
}