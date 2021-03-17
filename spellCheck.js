const { apiKey } = require("./apiKey");
const superagent = require('superagent');

async function spellCheck(string) {
  try {
    // full url with query params since this is a GET request
    const url = `https://api.bing.microsoft.com/v7.0/spellcheck?mkt=en-us&mode=spell&text=${string}`

    // make request and destructure body / flaggedTokens
    const { body: { flaggedTokens } } = await superagent.get(url).set('Ocp-Apim-Subscription-Key', apiKey)

    const matchToken = flaggedTokens.find(({ token }) => token === string)

    const checkScore = matchToken.suggestions.find(({ score }) => score === 1)

    return checkScore.suggestion

  } catch {
    // default behavior
    return string
  }
  
}

// so that we can use spellCheck in other files
module.exports = {
  spellCheck
}