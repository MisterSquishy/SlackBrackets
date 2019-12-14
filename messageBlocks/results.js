exports.blocks = ({ round, results }) => {
  const retBlocks = results.map(result => [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": result.winner + " over " + result.loser
      }
    },
    {
      "type": "context",
      "elements": [
        {
          "type": "mrkdwn",
          "text": result.winningVotes + " - " + result.losingVotes
        }
      ]
    }
  ]).flat()
  
  retBlocks.unshift({
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": ":tada: Here are the results for round " + round + "!"
    }
  })
  
  return retBlocks;
}