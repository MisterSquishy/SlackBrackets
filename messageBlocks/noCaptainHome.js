exports.blocks = () => [
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "Looks like this game doesn't have a captain yet! You got what it takes?"
    }
  },
  {
    "type": "image",
    "title": {
      "type": "plain_text",
      "text": "be like this guy",
      "emoji": true
    },
    "image_url": "https://media.giphy.com/media/rVZEejvVWEbug/giphy.gif",
    "alt_text": "image1"
  },
  {
    "type": "actions",
    "elements": [
      {
        "type": "button",
        "action_id": "captain_opt_in",
        "text": {
            "type": "plain_text",
            "text": "I am the captain now",
            "emoji": true
        }
      }
    ]
  },
]
