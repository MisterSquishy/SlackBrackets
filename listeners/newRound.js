const voteBlocks = require("../messageBlocks/vote");
const database = require("../database");
const DM = require("../utils/DM")

const handle = async ({ body, app, token }) => {
  try {
    database.incrementRound();
    const round = database.getRound();
    const matches = database.getMatchesByRound({ round });
    const users = database.getUsers();
    users.forEach(async ({ userId }) => {
      await DM.send({ app, token, user: userId, blocks: voteBlocks.blocks({ round, matches }), text: "Time to vote!" });
    });
    database.resetVotes();
  } catch (error) {
    console.error(error);
  }
};

exports.handle = handle;
