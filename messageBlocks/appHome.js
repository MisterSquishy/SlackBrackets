exports.blocks = () => [
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "This doesn't work!"
    }
  },
  {
    "type": "section",
    "fields": [
      {
        "type": "mrkdwn",
        "text": "Start the next round"
      },
      {
        "type": "mrkdwn",
        "text": "click over there :point_right:"
      }
    ],
    "accessory": {
      "type": "button",
      "text": {
        "type": "plain_text",
        "text": ":green_heart:",
        "emoji": true
      },
      "action_id": "start_round"
    }
  },
  {
    "type": "divider"
  },
  {
    "type": "section",
    "fields": [
      {
        "type": "mrkdwn",
        "text": "End the current round"
      },
      {
        "type": "mrkdwn",
        "text": "click over there :point_right:"
      }
    ],
    "accessory": {
      "type": "button",
      "text": {
        "type": "plain_text",
        "text": ":octagonal_sign:",
        "emoji": true
      },
      "action_id": "end_round"
    }
  },
  {
    "type": "divider"
  }
]