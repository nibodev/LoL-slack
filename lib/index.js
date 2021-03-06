const freeToPlay = require('./freeToPlay')
const help = require('./help')
const latest = require('./latestGame')
const league = require('./league')
const masteryScore = require('./masteryScore')
const rankedMatches = require('./rankedMatches')
const status = require('./status')
const team = require('./team')
const topThreeChamps = require('./topThreeChamps')
const wins = require('./wins')

/**
 * All routes respond on the provided response_url in the
 * request body, just in case the request takes longer than
 * the maximum allowed wait time of 3000 ms in Slack.
 */
function *index () {
  const params = this.request.body
  const args = params.text.split(' ')
  const command = args[0]
  const summoner = args[1] ? args[1].toLowerCase() : null
  const region = args[2] || 'br'
  const platform = args[3] || 'br1'

  switch (command) {
    case 'freeToPlay':
      this.body = yield freeToPlay(params)
      break
    case 'latest':
      this.body = yield latest(summoner, region, params)
      break
    case 'league':
      this.body = yield league(summoner, region, params)
      break
    case 'masteryScore':
      this.body = yield masteryScore(summoner, region, platform, params)
      break
    case 'rankedMatches':
      this.body = yield rankedMatches(summoner, region, params)
      break
    case 'status':
      this.body = yield status(summoner, params)
      break
    case 'team':
      this.body = yield team(summoner, region, params)
      break
    case 'topThreeChamps':
      this.body = yield topThreeChamps(summoner, region, platform, params)
      break
    case 'wins':
      this.body = yield wins(summoner, region, params)
      break
    case 'help':
    default:
      this.body = help()
      break
  }
}

module.exports = index
