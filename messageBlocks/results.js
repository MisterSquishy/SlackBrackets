const { flatten } = require("lodash");

exports.blocks = ({ round, results }) => {
  const retBlocks = flatten(
    results.map(result => [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: ":" + result.winner.value + ": over :" + result.loser.value + ":"
        }
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: result.winningVotes + " - " + result.losingVotes
          }
        ]
      }
    ])
  );

  retBlocks.unshift({
    type: "section",
    text: {
      type: "mrkdwn",
      text: ":tada: Here are the results for round " + round + "!"
    }
  });

  return retBlocks;
};
