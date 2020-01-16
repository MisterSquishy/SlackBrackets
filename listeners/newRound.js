const voteBlocks = require("../messageBlocks/vote");
const database = require("../database");
const DM = require("../utils/DM");
const { chunk } = require("lodash");

const MAX_MATCHES_PER_MESSAGE = 16;

const handle = async ({ body, app, token }) => {
  try {
    database.incrementRound();
    const round = 1;//database.getRound();
    const matches = database.getMatchesByRound({ round });
    const users = database.getUsers();
    chunk(matches, MAX_MATCHES_PER_MESSAGE)
      .forEach(matchChunk => {
        users.forEach(async ({ userId }) => {
          await DM.send({ app, token, user: userId, blocks: voteBlocks.blocks({ round, matches: matchChunk }), text: "Time to vote!" });
        });
    });
    database.resetVotes();
  } catch (error) {
    console.error(error);
  }
};

exports.handle = handle;
