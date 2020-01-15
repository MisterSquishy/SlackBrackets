const voteBlocks = require("../messageBlocks/vote");
const database = require("../database");

const handle = async ({ body, app, token }) => {
  try {
    database.incrementRound();
    const round = database.getRound();
    const matches = database.getMatchesByRound({ round });
    const users = database.getUsers();
    users.forEach(({ userId }) => app.client.chat.postMessage({
      token,
      channel: userId,
      blocks: voteBlocks.blocks({ round, matches })
    }));
    database.resetVotes();
  } catch (error) {
    console.error(error);
  }
};

exports.handle = handle;
