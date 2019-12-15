exports.blocks = () => [
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "What channel should I post in? (make sure to add me to that channel!)"
    },
    "accessory": {
      "action_id": "channel_select",
      "type": "channels_select",
      "placeholder": {
        "type": "plain_text",
        "text": "Select a channel"
      }
    }
  },
  {
    "type": "divider"
  },
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "*This doesn't work!!*"
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