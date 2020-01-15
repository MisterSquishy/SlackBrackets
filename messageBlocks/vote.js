const { flatten } = require("lodash");
const moment = require("moment-timezone");

const matchRow = ({ competitor1, competitor2 }) => {
  return {
    type: "section",
    fields: [
      {
        type: "mrkdwn",
        text: ":" + competitor1.value + ": \t\t\t :" + competitor2.value + ":\n" +
              "`" + competitor1.value + "` _vs_ `" + competitor2.value + "`"
      }
    ],
    accessory: {
      type: "static_select",
      action_id: "competitor_select",
      placeholder: {
        type: "plain_text",
        text: "Select an item",
        emoji: true
      },
      options: [
        {
          text: {
            type: "plain_text",
            text: ":" + competitor1.value + ":",
            emoji: true
          },
          value: competitor1.value
        },
        {
          text: {
            type: "plain_text",
            text: ":" + competitor2.value + ":",
            emoji: true
          },
          value: competitor2.value
        }
      ]
    }
  }
}

exports.blocks = ({ round, matches, voteDurationInHours = 2 }) => [
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": ":wave: Time to vote on round " + round +"!!"
    }
  },
  {
    "type": "divider"
  },
  ...flatten(matches.map(match => matchRow(match))),
  {
    "type": "divider"
  },
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": ":timer_clock: Voting ends in " + voteDurationInHours +" hours (" + moment().tz('America/New_York').add(voteDurationInHours, 'hours').format('LT') + ")"
    }
  },
]