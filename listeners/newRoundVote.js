const voteBlocks = require("../messageBlocks/vote");
const database = require("../database");

const handle = async ({ body, app, token }) => {
  try {
    const round = database.getRound().index;
    const matches = database.getMatchesByRound({ round });
    const result = await app.client.chat.postMessage({
      token,
      channel: "ULVNA7Y4D",
      blocks: voteBlocks.blocks({ round, matches })
    });
  } catch (error) {
    console.error(error);
  }
};

exports.handle = handle;
