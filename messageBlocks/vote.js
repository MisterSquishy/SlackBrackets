const { flatten } = require("lodash");
const moment = require("moment-timezone");

const matchRow = ({ competitor1, competitor2 }) => {
  return {
    type: "section",
    fields: [
      {
        type: "mrkdwn",
        text: ":" + competitor1.value + ": `" + competitor1.value + "`\n_vs_\n:" + competitor2.value + ": `" + competitor2.value + "`"
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
            text: ":" + competitor1.value + ": " + competitor1.value,
            emoji: true
          },
          value: competitor1.value
        },
        {
          text: {
            type: "plain_text",
            text: ":" + competitor2.value + ": " + competitor2.value,
            emoji: true
          },
          value: competitor2.value
        }
      ]
    }
  }
}

exports.blocks = ({ round, matches, voteDurationInHours = 2 }) => {
  let matchRows = [];
  
  matches.forEach(match => {
    matchRows.push(matchRow(match));
    matchRows.push({ "type": "divider" });
  });
  
  return [
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
    ...flatten(matchRows),
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": ":timer_clock: Voting ends in " + voteDurationInHours +" hours (" + moment().tz('America/New_York').add(voteDurationInHours, 'hours').format('LT') + ")"
      }
    },
  ];
}
