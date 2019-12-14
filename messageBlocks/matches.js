const ROUND_NAMES = [ 'Northeast', 'Southeast', 'Northwest', 'Southwest' ]

exports.blocks = ({ round, matches }) => 
[
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": ":wave: It’s time for round 1!"
    }
  },
  {
    "type": "divider"
  },
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "Round " + ROUND_NAMES[round - 1]
    },
    "fields": matches.map(match => [
      {
        "type": "mrkdwn",
        "text": match.competitor1 + " vs. " + match.competitor2
      },
      {
        "type": "mrkdwn",
        "text": "`" + match.competitor1 + "` versus `" + match.competitor2 + "`"
      }
    ]).flat()
  },
  {
    "type": "divider"
  },
  {
    "type": "context",
    "elements": [
      {
        "type": "mrkdwn",
        "text": "Voting closes in 15 minutes"
      }
    ]
  }
]